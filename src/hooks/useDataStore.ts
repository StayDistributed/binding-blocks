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

export const FormContext = createContext(null);

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
      const onChange = (): void => {
        setTimestamp(eventEmitter.timestamp());
        if (props.onChange) {
          props.onChange(store);
        }
      };
      eventEmitter.on("change", onChange);

      return (): void => {
        eventEmitter.off("change", onChange);
      };
    }
  }, [eventEmitter, store]);

  const thisStore = storeFromContext
    ? props.name || props.name === 0
      ? storeFromContext.get(props.name)
        ? storeFromContext.get(props.name)
        : null
      : storeFromContext
    : null;

  useEffect(() => {
    const store: DataStore = thisStore
      ? thisStore
      : !storeFromContext
      ? props.data || props.data === 0
        ? DataStore.createStore(props.data)
        : DataStore.createStore({})
      : null;

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
