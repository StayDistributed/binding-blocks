/* eslint-disable @typescript-eslint/no-namespace */
import {
  ReactElement,
  Context,
  ReactNode,
  FormEvent,
  FormHTMLAttributes,
} from "react";
import DataStore, { DataValues } from "./classes/DataStore";
import type StoreEvent from "./classes/StoreEvent";

export type DataStoreContext = Context<DataStore>;

/**
 * Native input
 */
export type DataStoreElementProps<T> = Omit<T, "name"> & {
  name?: string | number;
};

/**
 * Native events
 */
type OnSubmit = (e: FormEvent<HTMLFormElement>, store: DataStore) => void;
type OnReset = (e: FormEvent<HTMLFormElement>, store: DataStore) => void;

/**
 * Custom events
 */
type OnChange = (e: StoreEvent, store: DataStore) => void;
type OnDidChange = (e: StoreEvent, store: DataStore) => void;

export interface DataStoreHandler {
  Provider: DataStoreContext["Provider"];
  isRoot: boolean;
  timestamp: number;
  store: DataStore;
  formProps: FormHTMLAttributes<HTMLFormElement> & {
    debugstore?: DataStore;
  };
}

export interface DataStoreProps {
  debug?: boolean;
  data?: DataValues;
  name?: string | number;
  children?:
    | ((store: DataStore, handler: DataStoreHandler) => ReactElement)
    | ReactNode;
  onSubmit?: OnSubmit;
  onReset?: OnReset;
  onChange?: OnChange;
  onDidChange?: OnDidChange;
}
