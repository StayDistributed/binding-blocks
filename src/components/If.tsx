import React, { FunctionComponent } from "react";
import { DataStoreHandler } from "../types";
import useDataStore from "../hooks/useDataStore";

interface IfProps {
  name?: string | number;
  not?: boolean;
}

const If: FunctionComponent<IfProps> = (props) => {
  const handler: DataStoreHandler = useDataStore(props);

  const hidden = handler && handler.store ? !props.not : props.not;

  if (!hidden) {
    return null;
  }

  return <>{props.children}</>;
};

export default If;
