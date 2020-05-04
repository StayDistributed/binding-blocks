import React, {
  useState,
  ReactElement,
  FunctionComponent,
  TextareaHTMLAttributes,
} from "react";
import Binding, { BindingProps } from "../Binding";
import type DataStore from "../../classes/DataStore";

type TextareaProps = BindingProps<TextareaHTMLAttributes<HTMLTextAreaElement>>;

const Textarea: FunctionComponent<TextareaProps> = ({ name, ...props }) => {
  const [touched, setTouched] = useState(false);

  return (
    <Binding name={name}>
      {(store: DataStore): ReactElement => (
        <textarea
          name={store.getPath(true)}
          value={store.toJSON<string>() || ""}
          onChange={(e): void => {
            store.set(e.target.value);
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

export default Textarea;
