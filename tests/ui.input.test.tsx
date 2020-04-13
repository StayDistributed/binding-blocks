import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { Binding as Form, Input } from "../src";

describe("Input", () => {
  it("render", () => {
    const initialValues = { firstName: "Mark" };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <Input name="firstName"></Input>
        </Form>
      );
    });
    expect(form.toJSON().children[0].props.name).toBe("firstName");
    expect(form.toJSON().children[0].props.value).toBe("Mark");
    expect(form.toJSON().children[1]).toBeFalsy();

    act(() => {
      form.toJSON().children[0].props.onChange({ target: { value: "John" } });
    });

    expect(form.toJSON().children[0].props.value).toBe("John");
  });
});
