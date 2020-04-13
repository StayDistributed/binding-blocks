import React, { FunctionComponent } from "react";
import { Value } from "../../src";

const Place: FunctionComponent<{}> = () => (
  <div className="d-flex mb-2">
    <div className="px-1 text-primary bg-light">
      <Value name="city" />
    </div>
    <div className="px-1 text-info bg-light">
      <Value name="country" />
    </div>
  </div>
);

export default Place;
