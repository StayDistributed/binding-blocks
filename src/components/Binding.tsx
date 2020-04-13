import React, { FunctionComponent } from "react";
import { DataStoreHandler, DataStoreProps } from "../types";
import useDataStore from "../hooks/useDataStore";

export type BindingProps<T> = Omit<T, "name"> & DataStoreProps;

const Binding: FunctionComponent<DataStoreProps> = (props) => {
  const handler: DataStoreHandler = useDataStore(props);

  if (!handler || !handler.store) {
    return null;
  }

  const children =
    typeof props.children === "function"
      ? (props.children as Function)(handler.store)
      : props.children;

  const body = handler.isRoot ? (
    <form {...handler.formProps}>{children}</form>
  ) : props.as ? (
    <props.as>{children}</props.as>
  ) : (
    children
  );

  return handler.isRoot || props.name || props.name === 0 ? (
    <handler.Provider value={handler.store}>{body}</handler.Provider>
  ) : (
    body
  );
};

export default Binding;
