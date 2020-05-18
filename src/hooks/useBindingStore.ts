import {
  useEffect,
  useContext,
  createContext,
  useState,
  Provider,
} from "react";
import DataStore from "../classes/DataStore";
import { BindingProps } from "../types";

export const getStoreFromContext = (
  storeFromContext: DataStore,
  props: BindingProps
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
  props: BindingProps
): DataStore | null =>
  storeFromContext
    ? null
    : props.data ||
      props.data === 0 ||
      props.data === false ||
      props.data === ""
    ? DataStore.createStore(props.data)
    : DataStore.createStore({});

export const FormContext = createContext<DataStore>(null);

export function useBindingStore(
  props: BindingProps = {}
): {
  store: DataStore;
  storeFromContext: DataStore | null;
  Provider: Provider<DataStore>;
} {
  const [store, setStore] = useState(null);

  const storeFromContext = useContext(FormContext);

  const thisStore = getStoreFromContext(storeFromContext, props);

  useEffect(() => {
    const store: DataStore = thisStore
      ? thisStore
      : createStoreIfNotExists(storeFromContext, props);

    setStore(store);
  }, [thisStore]);

  return { store, storeFromContext, Provider: FormContext.Provider };
}
