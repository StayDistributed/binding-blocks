import type Store from "./DataStore";

export default class StoreEvent {
  type: string;

  target: Store;
  parent: Store;
  root: Store;

  /**
   * Constructor
   */
  constructor(type: string, target: Store) {
    this.type = type;
    this.target = target;
    this.parent = target.parent;
    this.root = target.root;

    this.stopped = false;
  }

  /**
   * Event propagation
   */
  stopped: boolean;

  stopPropagation = (): void => {
    this.stopped = true;
  };

  isStopped = (): boolean => this.stopped;
}
