import React, { FunctionComponent } from "react";
import { DataStoreHandler, BindingProps } from "../types";
import useDataStore from "../hooks/useDataStore";

const Binding: FunctionComponent<BindingProps> = (props) => {
  const handler: DataStoreHandler = useDataStore(props);

  if (!handler || !handler.store) {
    return null;
  }

  const children =
    typeof props.children === "function"
      ? (props.children as Function)(handler.store, handler)
      : props.children;

  return handler.isRoot || props.name || props.name === 0 ? (
    <handler.Provider value={handler.store}>{children}</handler.Provider>
  ) : (
    children
  );
};

export default Binding;
