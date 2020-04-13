import React from "react";
import ReactDom from "react-dom";
import { Binding, Input } from "../src";

ReactDom.render(
  <Binding data={{ name: "Mark" }}>
    <Input name="name" />
    <Input name="name" />
    <Input name="name" />
    <Input name="name" />
  </Binding>,
  document.body
);
