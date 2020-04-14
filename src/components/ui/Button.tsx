import React, {
  ReactElement,
  FunctionComponent,
  ButtonHTMLAttributes,
  MouseEvent,
} from "react";
import Binding, { BindingProps } from "../Binding";
import type DataStore from "../../classes/DataStore";

interface ButtonProps
  extends BindingProps<
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">
  > {
  onClick: (e: MouseEvent<HTMLButtonElement>, store: DataStore) => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  name,
  onClick,
  ...props
}) => {
  return (
    <Binding name={name}>
      {(store: DataStore): ReactElement => (
        <button
          name={store.getPath(true)}
          onClick={(e): void => {
            if (onClick) {
              onClick(e, store);
            }
          }}
          {...props}
        />
      )}
    </Binding>
  );
};

export default Button;
