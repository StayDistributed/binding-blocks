import React, {
  FunctionComponent,
  ReactNode,
  FormHTMLAttributes,
  FormEvent,
} from "react";
import Binding from "../Binding";
import type DataStore from "../../classes/DataStore";
import { DataStoreHandler, BindingProps, BindingListener } from "../../types";

type NativeFormProps = FormHTMLAttributes<HTMLFormElement>;

type FormProps = NativeFormProps &
  BindingProps & {
    debug?: boolean;
    onSubmit?: BindingListener;
    onReset?: BindingListener;
    onChange?: BindingListener;
    onDidChange?: BindingListener;
  };

const Form: FunctionComponent<FormProps> = (props) => {
  const children = (store: DataStore, handler: DataStoreHandler): ReactNode =>
    typeof props.children === "function"
      ? (props.children as Function)(store, handler)
      : props.children;

  const { debug, onChange, onDidChange, onReset, onSubmit, ...rest } = props;

  return (
    <Binding {...props}>
      {(store, handler): ReactNode => {
        const formProps: NativeFormProps = {};

        if (props.onSubmit) {
          formProps.onSubmit = (e: FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            store.emit("submit");
          };
        }

        formProps.onReset = (e: FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          store.reset();
        };

        if (props.debug) {
          formProps["data-debug-store"] = store;
        }

        return (
          <form {...rest} {...formProps}>
            {children(store, handler)}
          </form>
        );
      }}
    </Binding>
  );
};

export default Form;
