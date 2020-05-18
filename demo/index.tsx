import React from "react";
import ReactDom from "react-dom";
import { Form, Input, ForEach, Button, Log } from "../src";

const data = {
  skills: ["js", "css"],
};

ReactDom.render(
  <Form data={data} onChange={console.log}>
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
  </Form>,
  document.body
);
