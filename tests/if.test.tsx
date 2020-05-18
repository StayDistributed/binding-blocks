import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { Form, If } from "../src";

describe("Form", () => {
  it("If", () => {
    const initialValues = { firstName: "Mark" };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <If name="firstName">foo</If>
          <If name="lastName">bar</If>
        </Form>
      );
    });
    expect(form.toJSON().children[0]).toBe("foo");
    expect(form.toJSON().children[1]).toBeFalsy();
    act(() => {
      form.toJSON().props["data-debug-store"].set("lastName", "Doe");
    });
    expect(form.toJSON().children[0]).toBe("foo");
    expect(form.toJSON().children[1]).toBe("bar");
    act(() => {
      form.toJSON().props["data-debug-store"].unset("firstName");
    });
    expect(form.toJSON().children[0]).toBe("bar");
    expect(form.toJSON().children[1]).toBeFalsy();
  });

  it("If render prop", () => {
    const initialValues = { firstName: "Mark" };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <If name="firstName">{() => "foo"}</If>
          <If name="lastName">{() => "bar"}</If>
        </Form>
      );
    });
    expect(form.toJSON().children[0]).toBe("foo");
    expect(form.toJSON().children[1]).toBeFalsy();
    act(() => {
      form.toJSON().props["data-debug-store"].set("lastName", "Doe");
    });
    expect(form.toJSON().children[0]).toBe("foo");
    expect(form.toJSON().children[1]).toBe("bar");
    act(() => {
      form.toJSON().props["data-debug-store"].unset("firstName");
    });
    expect(form.toJSON().children[0]).toBe("bar");
    expect(form.toJSON().children[1]).toBeFalsy();
  });

  it("If not", () => {
    const initialValues = { firstName: "Mark" };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <If not name="firstName">
            foo
          </If>
          <If not name="lastName">
            bar
          </If>
        </Form>
      );
    });
    expect(form.toJSON().children[0]).toBe("bar");
    expect(form.toJSON().children[1]).toBeFalsy();
    act(() => {
      form.toJSON().props["data-debug-store"].set("lastName", "Doe");
    });
    expect(form.toJSON().children).toBeFalsy();
    act(() => {
      form.toJSON().props["data-debug-store"].unset("firstName");
    });
    expect(form.toJSON().children[0]).toBe("foo");
    expect(form.toJSON().children[1]).toBeFalsy();
  });
});
