import React from "react";
import ReactDom from "react-dom";
import { Binding, Input, ForEach, Button, Log } from "../src";

const data = {
  name: "Mark",
  skills: ["js", "css"],
};

ReactDom.render(
  <Binding data={data}>
    <div>
      <Input name="name" />
      <Input name="name" />
    </div>
    <ul>
      <ForEach name="skills">
        <li>
          <Input />
          <Button
            onClick={(e, store) => {
              e.preventDefault();
              store.removeFromParent();
            }}
          >
            -
          </Button>
        </li>
      </ForEach>
      <li>
        <Button
          onClick={(e, store) => {
            e.preventDefault();
            store.get("skills").push("New skill");
          }}
        >
          Add skill
        </Button>
      </li>
    </ul>
    <Log />
  </Binding>,
  document.body
);
