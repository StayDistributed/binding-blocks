import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { Form, Value } from "../src";

describe("Form", () => {
  it("Value", () => {
    const initialValues = { firstName: "Mark" };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <Value name="firstName" />
        </Form>
      );
    });
    expect(form.toJSON().children[0]).toBe("Mark");

    act(() => {
      form.toJSON().props.debugstore.get("firstName").set("Doe");
    });
    expect(form.toJSON().children[0]).toBe("Doe");

    act(() => {
      form.toJSON().props.debugstore.get("firstName").set("Bob");
    });
    expect(form.toJSON().children[0]).toBe("Bob");

    act(() => {
      form.toJSON().props.debugstore.set("firstName", "John");
    });
    expect(form.toJSON().children[0]).toBe("John");

    act(() => {
      form.toJSON().props.debugstore.get("firstName").set("Doe");
    });
    expect(form.toJSON().children[0]).toBe("Doe");
  });
});
