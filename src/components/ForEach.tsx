import React, { ReactElement, FunctionComponent } from "react";
import { DataStoreProps } from "../types";
import Binding from "./Binding";
import type DataStore from "../classes/DataStore";

const ForEach: FunctionComponent<DataStoreProps> = (props): ReactElement => {
  return (
    <Binding {...props}>
      {(store: DataStore): ReactElement[] =>
        store.map((store: DataStore, k: number) => {
          return (
            <Binding name={k} key={store.uuid}>
              {props.children}
            </Binding>
          );
        })
      }
    </Binding>
  );
};

export default ForEach;
