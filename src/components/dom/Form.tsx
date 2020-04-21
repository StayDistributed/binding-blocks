import React, { FunctionComponent, ReactNode, FormHTMLAttributes } from "react";
import Binding, { BindingProps } from "../Binding";
import type DataStore from "../../classes/DataStore";
import { DataStoreHandler } from "../../types";

type FormProps = BindingProps<FormHTMLAttributes<HTMLFormElement>>;

const Form: FunctionComponent<FormProps> = (props) => {
  const children = (store: DataStore, handler: DataStoreHandler): ReactNode =>
    typeof props.children === "function"
      ? (props.children as Function)(store, handler)
      : props.children;

  const {
    debug,
    data,
    name,
    onChange,
    onSubmit,
    onReset,
    ...formProps
  } = props;

  return (
    <Binding {...props}>
      {(store, handler): ReactNode => (
        <form {...handler.formProps} {...formProps}>
          {children(store, handler)}
        </form>
      )}
    </Binding>
  );
};

export default Form;
