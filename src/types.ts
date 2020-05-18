/* eslint-disable @typescript-eslint/no-namespace */
import { ReactElement, Context, ReactNode } from "react";
import DataStore, { DataValues } from "./classes/DataStore";
import type StoreEvent from "./classes/StoreEvent";

export type DataStoreContext = Context<DataStore>;

/**
 * Native input
 */
export type DataStoreElementProps<T> = Omit<T, "name"> & {
  name?: string | number;
};

export interface DataStoreHandler {
  Provider: DataStoreContext["Provider"];
  isRoot: boolean;
  timestamp: number;
  store: DataStore;
}

export type BindingListener = (e: StoreEvent) => void;

export type BindingChildren =
  | ((store: DataStore, handler: DataStoreHandler) => ReactElement)
  | ReactNode;

export interface BindingProps {
  data?: DataValues;
  name?: string | number;
  children?: BindingChildren;
  onChange?: BindingListener;
}

export interface BindingListeners {
  onChange?: BindingListener;
  onDidChange?: BindingListener;
  onReset?: BindingListener;
  onSubmit?: BindingListener;
}
