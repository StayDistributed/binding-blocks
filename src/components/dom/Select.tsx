import React, {
  ReactElement,
  FunctionComponent,
  SelectHTMLAttributes,
} from "react";
import Binding, { BindingProps } from "../Binding";
import type DataStore from "../../classes/DataStore";

type SelectProps = BindingProps<SelectHTMLAttributes<HTMLSelectElement>>;

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
