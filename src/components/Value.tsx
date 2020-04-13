import React, { FunctionComponent } from "react";
import { DataStoreHandler } from "../types";
import useDataStore from "../hooks/useDataStore";

interface ValueProps {
  name?: string | number;
}

const Value: FunctionComponent<ValueProps> = (props) => {
  const handler: DataStoreHandler = useDataStore(props);

  if (!handler || !handler.store) {
    return null;
  }

  return <>{handler.store.toJSON()}</>;
};

export default Value;
