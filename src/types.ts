/* eslint-disable @typescript-eslint/no-namespace */
import {
  ReactElement,
  Context,
  ReactNode,
  FormEvent,
  FormHTMLAttributes,
} from "react";
import DataStore, { DataValues } from "./classes/DataStore";

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
type OnSubmit = (e: FormEvent<HTMLFormElement>) => void;
type OnReset = (e: FormEvent<HTMLFormElement>) => void;

/**
 * Custom events
 */
type OnChange = (store: DataStore) => void;
type OnDidChange = (store: DataStore) => void;

export interface DataStoreHandler {
  Provider: DataStoreContext["Provider"];
  isRoot: boolean;
  timestamp: number;
  store: DataStore;
  formProps: FormHTMLAttributes<HTMLFormElement> & {
    debugstore?: DataStore;
  };
}

type HTMLTagName = keyof JSX.IntrinsicElements;

export interface DataStoreProps {
  debug?: boolean;
  data?: DataValues;
  name?: string | number;
  as?: HTMLTagName;
  children?: ((store: DataStore) => ReactElement) | ReactNode;
  onSubmit?: OnSubmit;
  onReset?: OnReset;
  onChange?: OnChange;
  onDidChange?: OnDidChange;
}
