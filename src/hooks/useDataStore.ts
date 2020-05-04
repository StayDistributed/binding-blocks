import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
  FormEvent,
} from "react";
import { DataStoreProps, DataStoreHandler } from "../types";
import DataStore from "../classes/DataStore";
import type StoreEvent from "../classes/StoreEvent";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = (): void => {};

export const FormContext = createContext(null);

export const getStoreFromContext = (
  storeFromContext: DataStore,
  props: DataStoreProps
): DataStore | null =>
  storeFromContext
    ? props.name || props.name === 0
      ? storeFromContext.get(props.name)
        ? storeFromContext.get(props.name)
        : null
      : storeFromContext
    : null;

export const createStoreIfNotExists = (
  storeFromContext: DataStore,
  props: DataStoreProps
): DataStore | null =>
  storeFromContext
    ? null
    : props.data ||
      props.data === 0 ||
      props.data === false ||
      props.data === ""
    ? DataStore.createStore(props.data)
    : DataStore.createStore({});

export function useDataStore(props: DataStoreProps = {}): DataStoreHandler {
  const [timestamp, setTimestamp] = useState(0);
  const [store, setStore] = useState(null);
  const [eventEmitter, setEventEmitter] = useState(null);
  const storeFromContext = useContext(FormContext);

  /**
   * connect component to the right store instance
   */
  useEffect(() => {
    if (eventEmitter) {
      const onChange = (e: StoreEvent): void => {
        setTimestamp(eventEmitter.timestamp());
        if (props.onChange) {
          props.onChange(e, store);
        }
      };
      eventEmitter.on("change", onChange);

      const onDidChange = props.onDidChange
        ? (e: StoreEvent): void => {
            props.onDidChange(e, store);
          }
        : noOp;
      eventEmitter.on("didchange", onDidChange);

      return (): void => {
        eventEmitter.off("change", onChange);
        eventEmitter.off("didchange", onDidChange);
      };
    }
  }, [eventEmitter, store]);

  const thisStore = getStoreFromContext(storeFromContext, props);

  useEffect(() => {
    const store: DataStore = thisStore
      ? thisStore
      : createStoreIfNotExists(storeFromContext, props);

    setStore(store);

    if (!store) {
      setEventEmitter(storeFromContext);
      return;
    }

    setEventEmitter(store);
  }, [thisStore]);

  const handler = useMemo(() => {
    const formProps: DataStoreHandler["formProps"] = {};

    if (props.onSubmit) {
      formProps.onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        props.onSubmit(e, store);
      };
    }

    formProps.onReset = (e: FormEvent<HTMLFormElement>): void => {
      if (!e.isDefaultPrevented()) {
        store.reset();
      }

      if (props.onReset) {
        props.onReset(e, store);
      }
    };

    if (props.debug) {
      formProps.debugstore = store;
    }

    return {
      /**
       * Context values
       */
      Provider: FormContext.Provider,
      isRoot: !storeFromContext,

      /**
       * Lib store
       */
      timestamp,
      store,

      /**
       * <form>
       */
      formProps,
    };
  }, [store, timestamp]);

  if (!store) {
    return null;
  }

  return handler;
}

export default useDataStore;
