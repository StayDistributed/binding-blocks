import React, { FunctionComponent, ReactElement } from "react";
import Binding from "../Binding";
import type DataStore from "../../classes/DataStore";

const Log: FunctionComponent<{}> = (): ReactElement => {
  return (
    <Binding>
      {(store: DataStore): ReactElement => (
        <pre>{JSON.stringify(store.toJSON(), null, 2)}</pre>
      )}
    </Binding>
  );
};

export default Log;
