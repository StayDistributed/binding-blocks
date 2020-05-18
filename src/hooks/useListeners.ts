import { useMemo } from "react";
import { Listener } from "../classes/DataStore";
import { BindingListeners } from "../types";

const useListeners = ({
  onChange,
  onDidChange,
  onSubmit,
  onReset,
}: BindingListeners): Listener[] => {
  const listeners = useMemo(() => {
    const out: Listener[] = [];

    if (onChange) {
      out.push({
        eventName: "change",
        callback: onChange,
      });
    }
    if (onDidChange) {
      out.push({
        eventName: "didchange",
        callback: onDidChange,
      });
    }
    if (onSubmit) {
      out.push({
        eventName: "submit",
        callback: onSubmit,
      });
    }
    if (onReset) {
      out.push({
        eventName: "reset",
        callback: onReset,
      });
    }

    return out;
  }, [onChange, onDidChange, onSubmit, onReset]);

  return listeners;
};

export default useListeners;
