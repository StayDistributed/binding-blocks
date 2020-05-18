import React, {
  ReactElement,
  FunctionComponent,
  SelectHTMLAttributes,
} from "react";
import Binding from "../Binding";
import type DataStore from "../../classes/DataStore";
import { BindingProps } from "../../types";

type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

type SelectProps = NativeSelectProps & BindingProps;

const Select: FunctionComponent<SelectProps> = ({ name, ...props }) => {
  return (
    <Binding name={name}>
      {(store: DataStore): ReactElement => (
        <select
          name={store.getPath(true)}
          value={store.toJSON<string>()}
          onChange={(e): void => {
            store.set(e.target.value);
            store.emit("didchange");
          }}
          {...props}
        />
      )}
    </Binding>
  );
};

export default Select;
