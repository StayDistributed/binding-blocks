import React, {
  useState,
  ReactElement,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";
import Binding, { BindingProps } from "../Binding";
import type DataStore from "../../classes/DataStore";

type InputProps = BindingProps<InputHTMLAttributes<HTMLInputElement>>;

const Input: FunctionComponent<InputProps> = ({ name, ...props }) => {
  const [touched, setTouched] = useState(false);

  return (
    <Binding name={name}>
      {(store: DataStore): ReactElement => (
        <input
          name={store.getPath(true)}
          value={store.toJSON<string>() || ""}
          checked={props.type === "checkbox" && !!store.toJSON()}
          onChange={(e): void => {
            store.set(
              props.type === "checkbox" ? !!e.target.checked : e.target.value
            );
            setTouched(true);
          }}
          onFocus={(): void => {
            setTouched(false);
          }}
          onBlur={(): void => {
            if (touched) {
              store.emit("didchange");
            }
          }}
          {...props}
        />
      )}
    </Binding>
  );
};

export default Input;
