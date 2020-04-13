import { uuidv4 } from "../utils/uuid";

type PrimitiveTypes = string | number | boolean | null;
type MapCallbackFn<T> = (
  value: DataStore,
  index: number,
  array: DataStore[]
) => T;

type PlainValueType =
  | PrimitiveTypes
  | PlainValueType[]
  | { [key: string]: PlainValueType };

export type DataValues = PlainValueType;

enum EventType {
  CHANGE = "change",
  DIDCHANGE = "didchange",
}

interface Listener {
  eventName: string;
  callback: (e: DataStoreEvent) => void;
}

class DataStoreEvent {
  type: string;

  stopped: boolean;

  target: DataStore;

  parent: DataStore;

  root: DataStore;

  constructor(type: string, target: DataStore) {
    this.type = type;
    this.target = target;
    this.parent = target.parent;
    this.root = target.root;

    this.stopped = false;
  }

  stopPropagation = (): void => {
    this.stopped = true;
  };

  isStopped = (): boolean => this.stopped;
}

type Mutator<T = PlainValueType> = (value: PlainValueType) => PlainValueType;

class DataStore {
  root: DataStore;

  parent: DataStore;

  uuid: string;

  initialValues: DataValues;

  constructor(values?: DataValues, root?: DataStore, parent?: DataStore) {
    this.root = root || this;
    this.parent = parent || this;
    this.uuid = uuidv4();
    this.initialValues = values;

    this.setTimestamp();
    this.initData(values);
  }

  static createStore(values?: DataValues): DataStore {
    return new DataStore(values);
  }

  /**
   * Hierarchy
   */
  protected getRoot(): DataStore {
    return this.root || this;
  }

  protected isRoot(): boolean {
    return this === this.root;
  }

  getPath(): (number | string)[];

  getPath(encoded: boolean): string;

  getPath(encoded?: boolean): string | (number | string)[] {
    let thisPath = null;

    if (this !== this.parent) {
      if (this.parent.storeArray) {
        thisPath = this.parent.storeArray.indexOf(this);
      }
      if (this.parent.storeMap) {
        this.parent.storeMap.forEach((value, key) => {
          if (value === this) thisPath = key;
        });
      }
    }

    const path = this !== this.parent ? this.parent.getPath() : [];
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

  __timestamp: number;

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

  protected createChildStore(value: PlainValueType): DataStore {
    return new DataStore(value, this.getRoot(), this);
  }

  public timestamp(): number {
    if (!this.isRoot()) {
      return this.getRoot().timestamp();
    }

    return this.__timestamp;
  }

  protected setTimestamp(timestamp?: number): DataStore {
    if (!this.isRoot()) {
      this.getRoot().setTimestamp(timestamp);
      return this;
    }

    this.__timestamp = timestamp || new Date().getTime();
    return this;
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

  public set(value: PlainValueType): DataStore;

  public set(name: string, value: PlainValueType): DataStore;

  public set(index: number, value: PlainValueType): DataStore;

  public set(key: number | string, value: PlainValueType): DataStore;

  public set(
    key: string | number | PlainValueType,
    value?: PlainValueType
  ): DataStore {
    if (value === undefined) {
      this.initData(key);
      this.setTimestamp().emit(EventType.CHANGE);
    } else {
      let existing: DataStore;

      if (this.storeArray) {
        existing = this.storeArray[key as number];

        const store = this.createChildStore(value);
        this.storeArray[key as number] = store;
        this.setTimestamp().emit(EventType.CHANGE);
      }
      if (this.storeMap) {
        existing = this.storeMap.get(key as string);

        const store = this.createChildStore(value);
        this.storeMap.set(key as string, store);
        this.setTimestamp().emit(EventType.CHANGE);
      }

      if (existing) {
        existing.release();
      }
    }
    return this;
  }

  public reset(): DataStore {
    const listeners = this.getChildListeners();

    this.initData(this.initialValues);

    const e = new DataStoreEvent(EventType.CHANGE, this);
    this.dispatch(e, listeners);
    return this;
  }

  public unset(key: string): DataStore {
    if (this.storeMap) {
      const target = this.get(key);
      this.storeMap.delete(key);
      if (target) {
        target.setTimestamp().emit(EventType.CHANGE);
      }
    }

    return this;
  }

  public toObject<T = PlainValueType>(): T;

  public toObject(): PlainValueType {
    if (this.storeArray) {
      return this.storeArray.map((value) => {
        return value instanceof DataStore
          ? value.toObject()
          : (value as PlainValueType);
      });
    }
    if (this.storeMap) {
      return Array.from(this.storeMap).reduce<{
        [key: string]: PlainValueType;
      }>((obj, [key, value]) => {
        obj[key] =
          value instanceof DataStore
            ? value.toObject()
            : (value as PlainValueType);
        return obj;
      }, {});
    }
    if (this.storePrimitive || this.storePrimitive === 0) {
      return this.storePrimitive;
    }
  }

  toJSON = this.toObject;

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
        this.setTimestamp().emit(EventType.CHANGE);
        existing.release();
      }
    }
  }

  public push(value: PlainValueType): void {
    if (this.storeArray) {
      this.storeArray.push(this.createChildStore(value));
      this.setTimestamp().emit(EventType.CHANGE);
    }
  }

  public remove(index: number): void {
    if (this.storeArray) {
      const deleted = this.storeArray.splice(index, 1);

      if (deleted.length) {
        this.storeArray.forEach((store) => {
          store.setTimestamp().emit(EventType.CHANGE);
        });
        deleted.forEach((store) => store.release());
      }
    }
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

  public emit(eventName: Listener["eventName"]): DataStore {
    const listeners = this.getParentListeners(true);

    const e = new DataStoreEvent(eventName, this);
    this.dispatch(e, listeners);

    return this;
  }

  protected release(): DataStore {
    const listeners = this.getChildListeners(true);

    const e = new DataStoreEvent(EventType.CHANGE, this);
    this.dispatch(e, listeners);
    return this;
  }

  protected dispatch(e: DataStoreEvent, listeners: Listener[]): void {
    listeners.forEach(function (listener: Listener): void {
      if (e.isStopped()) return this;

      if (listener.eventName === e.type) {
        listener.callback(e);
      }
    });
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
        (listeners, store) => [
          ...listeners,
          ...store.listeners,
          ...store.getChildListeners(),
        ],
        thisListeners
      );
    }
    if (this.storeMap) {
      return Array.from(this.storeMap.values()).reduce(
        (listeners, store) => [
          ...listeners,
          ...store.listeners,
          ...store.getChildListeners(),
        ],
        thisListeners
      );
    }

    return thisListeners;
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
  public mutate<T>(mutator: Mutator<T>): DataStore;

  public mutate<T>(key: string | number, mutator: Mutator<T>): DataStore;

  public mutate<T>(
    key: string | number | Mutator<T>,
    mutator?: Mutator<T>
  ): DataStore {
    if (mutator) {
      if (typeof key === "string" || typeof key === "number") {
        const v = this.get(key);
        this.set(key, mutator(v ? v.toObject() : 0));
      }
    } else if (this.storePrimitive || this.storePrimitive === 0) {
      mutator = key as Mutator;
      const v = this.storePrimitive;
      this.set(mutator(v) as PrimitiveTypes);
    }

    return this;
  }
}

export default DataStore;
