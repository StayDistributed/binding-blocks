import React, {
  ReactElement,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";
import Binding, { BindingProps } from "../Binding";
import type DataStore from "../../classes/DataStore";

type InputProps = BindingProps<InputHTMLAttributes<HTMLInputElement>>;

const Input: FunctionComponent<InputProps> = ({ name, ...props }) => {
  return (
    <Binding name={name}>
      {(store: DataStore): ReactElement => (
        <input
          name={store.getPath(true)}
          value={store.toJSON<string>() || ""}
          onChange={(e): void => {
            store.set(e.target.value);
          }}
          {...props}
        />
      )}
    </Binding>
  );
};

export default Input;
