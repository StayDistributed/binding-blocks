import { useEffect, useMemo } from "react";
import { BindingProps, BindingListeners, DataStoreHandler } from "../types";
import { useBindingStore } from "./useBindingStore";
import { useBindingEventListener } from "./useBindingEventListener";
import useListeners from "./useListeners";

type Props = BindingProps & BindingListeners;

export function useDataStore(props: Props): DataStoreHandler {
  const { store, storeFromContext, Provider } = useBindingStore(props);
  const listeners = useListeners(props);
  const [timestamp, setEventListener] = useBindingEventListener(listeners);

  useEffect(() => {
    if (!store) {
      setEventListener(storeFromContext);
      return;
    }

    setEventListener(store);
  }, [store]);

  const handler = useMemo(() => {
    return {
      /**
       * Context values
       */
      Provider,
      isRoot: !storeFromContext,

      /**
       * Lib store
       */
      timestamp,
      store,
    };
  }, [store, timestamp]);

  if (!store) {
    return null;
  }

  return handler;
}

export default useDataStore;
