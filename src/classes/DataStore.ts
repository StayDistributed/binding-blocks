import { uuidv4 } from "../utils/uuid";
import StoreEvent from "./StoreEvent";

type PrimitiveTypes = string | number | boolean | null;

export type DataValues =
  | PrimitiveTypes
  | DataValues[]
  | { [key: string]: DataValues };

type MapCallbackFn<T> = (
  value: DataStore,
  index: number,
  array: DataStore[]
) => T;

type Mutator = (value: DataValues) => DataValues;

export enum HierarchyDirection {
  INCLUSIVE_UP,
  EXCLUSIVE_UP,
  INCLUSIVE_DOWN,
  EXCLUSIVE_DOWN,
}

enum EventType {
  ALL = "all",
  CHANGE = "change",
}

export interface Listener {
  eventName: string;
  callback: (e: StoreEvent) => void;
}

class DataStore {
  uuid: string;
  __timestamp: number;
  __initialTimestamp: number;

  root: DataStore;
  parent: DataStore;
  __initialValues: DataValues;

  constructor(values?: DataValues, root?: DataStore, parent?: DataStore) {
    this.root = root || this;
    this.parent = parent || this;

    this.uuid = uuidv4();
    this.__timestamp = parent ? parent.timestamp() : 0;

    this.initData(values);

    this.__initialTimestamp = this.__timestamp;
    this.__initialValues = values;
  }

  static createStore(values?: DataValues): DataStore {
    return new DataStore(values);
  }

  public touched = (): boolean => this.__timestamp > 0;

  public timestamp = (): number => this.__timestamp;

  protected touch = (timestamp?: number): DataStore => {
    this.__timestamp = timestamp >= 0 ? timestamp : new Date().getTime();

    if (this.parent !== this) {
      this.parent.touch(this.__timestamp);
    }

    return this;
  };

  /**
   * Hierarchy
   */
  protected getRoot(): DataStore {
    return this.root;
  }

  protected isRoot(): boolean {
    return this === this.root;
  }

  /**
   * Get the path relative to parent `store`
   * returns null if doesn't exist
   */
  protected getThisPath(): number | string {
    let thisPath = null;

    if (this === this.parent) {
      return null;
    }

    if (this.parent.storeArray) {
      thisPath = this.parent.storeArray.indexOf(this);
    }
    if (this.parent.storeMap) {
      this.parent.storeMap.forEach((value, key) => {
        if (value === this) thisPath = key;
      });
    }

    return thisPath;
  }

  getPath(): (number | string)[];

  getPath(encoded: boolean): string;

  getPath(encoded?: boolean): string | (number | string)[] {
    const path = this !== this.parent ? this.parent.getPath() : [];

    const thisPath = this.getThisPath();

    if (thisPath !== null) {
      path.push(thisPath);
    }

    if (encoded) {
      return path.map((p, k) => (k ? `[${p}]` : p)).join("") as string;
    }
    return path;
  }

  /**
   * Data
   */
  protected storePrimitive: PrimitiveTypes;

  protected storeArray: Array<DataStore>;

  protected storeMap: Map<string, DataStore>;

  /**
   * [0, false, ""] are valid primitive values
   */
  protected isPrimitive(): boolean {
    return (
      !!this.storePrimitive ||
      this.storePrimitive === 0 ||
      this.storePrimitive === false ||
      this.storePrimitive === ""
    );
  }

  protected initData(values: DataValues): void {
    delete this.storeMap;
    delete this.storeArray;
    delete this.storePrimitive;

    if (
      typeof values === "string" ||
      typeof values === "number" ||
      typeof values === "boolean"
    ) {
      this.storePrimitive = values as PrimitiveTypes;
    } else if (values instanceof Array) {
      this.storeArray = [];
      values.forEach((item) => {
        this.storeArray.push(this.createChildStore(item));
      });
    } else if (Object.prototype.toString.call(values) === "[object Object]") {
      this.storeMap = new Map();
      for (const k of Object.keys(values)) {
        this.storeMap.set(k, this.createChildStore(values[k]));
      }
    }
  }

  protected createChildStore(value: DataValues): DataStore {
    return new DataStore(value, this.getRoot(), this);
  }

  /**
   * Data manipulation
   */
  public get(name: string): DataStore;

  public get(index: number): DataStore;

  public get(key: number | string): DataStore;

  public get(key: number | string): DataStore {
    if (this.storeArray) {
      return this.storeArray[key as number];
    }
    if (this.storeMap) {
      return this.storeMap.get(key as string);
    }
    return null;
  }

  public set(value: DataValues): DataStore;

  public set(name: string, value: DataValues): DataStore;

  public set(index: number, value: DataValues): DataStore;

  public set(key: number | string, value: DataValues): DataStore;

  public set(key: string | number | DataValues, value?: DataValues): DataStore {
    if (value === undefined) {
      this.initData(key);
      this.touch();
      this.emit(EventType.CHANGE);
    } else {
      let existing: DataStore;

      if (this.storeArray) {
        existing = this.storeArray[key as number];

        const store = this.createChildStore(value);
        this.storeArray[key as number] = store;
        store.touch();
        this.emit(EventType.CHANGE);
      }
      if (this.storeMap) {
        existing = this.storeMap.get(key as string);

        const store = this.createChildStore(value);
        this.storeMap.set(key as string, store);
        store.touch();
        this.emit(EventType.CHANGE);
      }

      if (existing) {
        existing.release();
      }
    }
    return this;
  }

  public unset(key: string): DataStore {
    if (this.storeMap) {
      const target = this.get(key);
      this.storeMap.delete(key);
      if (target) {
        target.touch().emit(EventType.CHANGE);
      }
    }

    return this;
  }

  public reset(): DataStore {
    const children = this.getChildren();

    /**
     * reset timestamp to its initial value
     * notice that it can be !== 0 if store has been replaced in App's lifecycle.
     */
    this.__timestamp = this.__initialTimestamp;
    this.initData(this.__initialValues);

    this.emit(EventType.CHANGE);
    children.forEach((store) => store.release());

    return this;
  }

  public toJSON<T = DataValues>(): T;

  public toJSON(): DataValues {
    if (this.storeArray) {
      return this.storeArray.map((value) => {
        return value instanceof DataStore
          ? value.toJSON()
          : (value as DataValues);
      });
    }
    if (this.storeMap) {
      return Array.from(this.storeMap).reduce<{
        [key: string]: DataValues;
      }>((obj, [key, value]) => {
        obj[key] =
          value instanceof DataStore ? value.toJSON() : (value as DataValues);
        return obj;
      }, {});
    }
    if (this.isPrimitive()) {
      return this.storePrimitive;
    }
  }

  toObject = this.toJSON;

  /**
   * toValue returns the value if the store is primitive
   * with a fallback on JSON stringify for arrays and objects
   */
  public toValue = (): PrimitiveTypes =>
    this.isPrimitive() ? this.storePrimitive : JSON.stringify(this);

  /**
   * You can map directly an Array, by calling `map()` on it
   * or you can map an attribute value if exists, calling:
   * `people.map('children', function(child) { });`
   * is the same as:
   * `people.get('children').map(function(child) { })`
   */
  public map<T = any>(callbackFn: MapCallbackFn<T>): T[];

  public map<T = any>(name: string, callbackFn: MapCallbackFn<T>): T[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public map<T = any>(...args: any[]): T[] {
    const callbackFn: MapCallbackFn<T> = args[args.length - 1];
    const name: string = args[0] !== callbackFn ? args[0] : null;

    if (this.storeArray) {
      return this.storeArray.map(callbackFn);
    }
    if (this.storeMap && name && this.storeMap.has(name)) {
      return (this.storeMap.get(name) as DataStore).map(callbackFn);
    }
  }

  /**
   * Array specific methods
   */
  public pop(): void {
    if (this.storeArray) {
      const existing = this.storeArray.pop();

      if (existing) {
        this.touch().emit(EventType.CHANGE);
        existing.release();
      }
    }
  }

  public push(value: DataValues): DataStore {
    if (this.storeArray) {
      this.storeArray.push(this.createChildStore(value));
      this.touch().emit(EventType.CHANGE);
    }

    return this;
  }

  public remove(index: number): DataStore {
    if (this.storeArray) {
      const deleted = this.storeArray.splice(index, 1);

      if (deleted.length) {
        this.touch().emit(EventType.CHANGE);
        this.storeArray.forEach((store) => {
          store.emit(EventType.CHANGE, HierarchyDirection.EXCLUSIVE_DOWN);
        });
        deleted.forEach((store) => store.release());
      }
    }

    return this;
  }

  public removeFromParent(): void {
    if (this !== this.parent) {
      if (this.parent.storeArray) {
        const index = this.parent.storeArray.indexOf(this);
        this.parent.remove(index);
      }
    }
  }

  /**
   * Event listeners
   */
  protected listeners: Listener[] = [];

  public on(
    eventName: Listener["eventName"],
    callback: Listener["callback"]
  ): DataStore {
    this.listeners.push({
      eventName,
      callback,
    });
    return this;
  }

  public off(
    eventName: Listener["eventName"],
    callback?: Listener["callback"]
  ): DataStore {
    this.listeners = this.listeners.filter(
      (listener) =>
        eventName !== listener.eventName ||
        (callback && callback !== listener.callback)
    );
    return this;
  }

  /**
   * Create a new event to dispatch
   */
  public emit(
    eventName: Listener["eventName"],
    direction?: HierarchyDirection
  ): DataStore {
    const listeners = this.getListeners(direction);

    const e = new StoreEvent(eventName, this);
    this.dispatch(e, listeners);

    return this;
  }

  /**
   * Notify released instances and their children
   * (shortcut)
   */
  protected release(): DataStore {
    this.touch();
    this.emit(EventType.CHANGE, HierarchyDirection.INCLUSIVE_DOWN);

    return this;
  }

  /**
   * Dispatch an event to the listeners
   */
  protected dispatch(e: StoreEvent, listeners: Listener[]): void {
    listeners.forEach((listener: Listener): void => {
      if (e.isStopped()) return;

      if (listener.eventName === e.type) {
        listener.callback(e);
      }
    });
  }

  public getListeners(direction?: HierarchyDirection): Listener[] {
    let listeners: Listener[];

    const dir: HierarchyDirection =
      direction || HierarchyDirection.INCLUSIVE_UP;

    if (dir === HierarchyDirection.INCLUSIVE_UP) {
      listeners = this.getParentListeners(true);
    } else if (dir === HierarchyDirection.INCLUSIVE_DOWN) {
      listeners = this.getChildListeners(true);
    } else if (dir === HierarchyDirection.EXCLUSIVE_UP) {
      listeners = this.getParentListeners();
    } else if (dir === HierarchyDirection.EXCLUSIVE_DOWN) {
      listeners = this.getChildListeners();
    }

    return listeners;
  }

  public getParentListeners(include?: boolean): Listener[] {
    const thisListeners: Listener[] = include ? this.listeners : [];

    if (this !== this.parent) {
      return [...thisListeners, ...this.parent.getParentListeners(true)];
    }

    return thisListeners;
  }

  public getChildListeners(include?: boolean): Listener[] {
    const thisListeners: Listener[] = include ? this.listeners : [];

    if (this.storeArray) {
      return this.storeArray.reduce(
        (listeners, store) => [...listeners, ...store.getChildListeners(true)],
        thisListeners
      );
    }
    if (this.storeMap) {
      return Array.from(this.storeMap.values()).reduce(
        (listeners, store) => [...listeners, ...store.getChildListeners(true)],
        thisListeners
      );
    }

    return thisListeners;
  }

  public getChildren(include?: boolean): DataStore[] {
    const thisChildren: DataStore[] = include ? [this] : [];

    if (this.storeArray) {
      return this.storeArray.reduce(
        (children, store) => [...children, ...store.getChildren(true)],
        thisChildren
      );
    }
    if (this.storeMap) {
      return Array.from(this.storeMap.values()).reduce(
        (children, store) => [...children, ...store.getChildren(true)],
        thisChildren
      );
    }

    return thisChildren;
  }

  /**
   * Mutators,
   * you can register a mutator to change a value,
   * for example:
   *
   * `const addOne = v => v + 1`
   *
   * will increment by 1 a value, by calling:
   *
   * `clock.mutate('counter', addOne)` or
   * `people.mutate('age', addOne)` or
   * `team.mutate('score', addOne)` or whatever...
   */
  public mutate(mutator: Mutator): DataStore;

  public mutate(key: string | number, mutator: Mutator): DataStore;

  public mutate(key: string | number | Mutator, mutator?: Mutator): DataStore {
    if (mutator) {
      if (typeof key === "string" || typeof key === "number") {
        const v = this.get(key);
        this.set(key, mutator(v ? v.toObject() : 0));
      }
    } else if (this.isPrimitive()) {
      mutator = key as Mutator;
      const v = this.storePrimitive;
      this.set(mutator(v) as PrimitiveTypes);
    }

    return this;
  }
}

export default DataStore;
