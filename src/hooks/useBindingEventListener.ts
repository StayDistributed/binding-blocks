import { useState, useEffect, Dispatch } from "react";
import DataStore, { Listener } from "../classes/DataStore";

export function useBindingEventListener(
  listeners?: Listener[]
): [number, Dispatch<DataStore>] {
  const [timestamp, setTimestamp] = useState(0);
  const [eventListener, setEventListener] = useState(null);

  useEffect(() => {
    if (eventListener) {
      /**
       * Basic change listener
       */
      const onChange = (): void => setTimestamp(eventListener.timestamp());
      eventListener.on("change", onChange);

      /**
       * All the other listeners
       */
      if (listeners) {
        listeners.forEach((listener) => {
          eventListener.on(listener.eventName, listener.callback);
        });
      }

      return (): void => {
        eventListener.off("change", onChange);

        if (listeners) {
          listeners.forEach((listener) => {
            eventListener.off(listener.eventName, listener.callback);
          });
        }
      };
    }
  }, [setTimestamp, eventListener, listeners]);

  return [timestamp, setEventListener];
}
