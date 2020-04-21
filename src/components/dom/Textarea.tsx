import React, {
  ReactElement,
  FunctionComponent,
  TextareaHTMLAttributes,
} from "react";
import Binding, { BindingProps } from "../Binding";
import type DataStore from "../../classes/DataStore";

type TextareaProps = BindingProps<TextareaHTMLAttributes<HTMLTextAreaElement>>;

const Textarea: FunctionComponent<TextareaProps> = ({ name, ...props }) => {
  return (
    <Binding name={name}>
      {(store: DataStore): ReactElement => (
        <textarea
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

export default Textarea;
