import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { Form, Log } from "../src";

describe("Log", () => {
  it("Log", () => {
    const initialValues = { firstName: "Mark" };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <Log></Log>
        </Form>
      );
    });
    expect(form.toJSON().children[0].type).toBe("pre");
    expect(form.toJSON().children[0].children[0]).toBe(
      JSON.stringify(initialValues, null, 2)
    );
  });
});
