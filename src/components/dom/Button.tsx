import React, {
  ReactElement,
  FunctionComponent,
  ButtonHTMLAttributes,
  MouseEvent,
} from "react";
import Binding from "../Binding";
import type DataStore from "../../classes/DataStore";
import { BindingProps } from "../../types";

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
>;

type ButtonProps = NativeButtonProps &
  BindingProps & {
    onClick?: (e: MouseEvent<HTMLButtonElement>, store: DataStore) => void;
  };

const Button: FunctionComponent<ButtonProps> = ({
  name,
  onClick,
  ...props
}) => {
  return (
    <Binding name={name}>
      {(store: DataStore): ReactElement => (
        <button
          {...props}
          name={store.getPath(true)}
          onClick={(e): void => {
            if (onClick) {
              onClick(e, store);
            }
          }}
        />
      )}
    </Binding>
  );
};

export default Button;
