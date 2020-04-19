import React, { FormEvent, ReactElement } from "react";
import {
  act,
  create,
  ReactTestRenderer,
  ReactTestRendererJSON,
} from "react-test-renderer";
import { Form, ForEach } from "../src";

describe("Form", () => {
  it("Foreach string", () => {
    const initialValues = { firstName: "Mark", children: ["Sarah", "Bill"] };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <ForEach name="children">
            {(store): ReactElement => {
              const value = store.toJSON<string>();
              return (
                <input
                  value={value}
                  onChange={(e: FormEvent<HTMLInputElement>): void => {
                    store.set(e.currentTarget.value);
                  }}
                />
              );
            }}
          </ForEach>
        </Form>
      );
    });
    expect(
      form.toJSON().children.map((c: ReactTestRendererJSON) => c.props.value)
    ).toMatchObject(["Sarah", "Bill"]);
    expect(form.toJSON().children).toBeTruthy();
    expect(form.toJSON().props.debugstore.get("children")).toBeTruthy();
    expect(
      form.toJSON().props.debugstore.get("children").toJSON()
    ).toMatchObject(initialValues.children);
    act(() => {
      const input = form.toJSON().children[0];
      if (typeof input !== "string") {
        input.props.onChange({ currentTarget: { value: "Jack" } });
      }
    });
    expect(form.toJSON().props.debugstore.toJSON().children[0]).toBe("Jack");
  });

  it("Foreach object", () => {
    const initialValues = {
      firstName: "Mark",
      children: [{ firstName: "Sarah" }, { firstName: "Bill" }],
    };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <ForEach name="children">
            {(store): ReactElement => {
              return (
                <input
                  name={store.get("firstName").getPath(true)}
                  value={store.get("firstName").toJSON()}
                  onChange={(e: FormEvent<HTMLInputElement>): void => {
                    store.set("firstName", e.currentTarget.value);
                  }}
                />
              );
            }}
          </ForEach>
        </Form>
      );
    });
    const children = form.toJSON().children as ReactTestRendererJSON[];
    expect(children[0].props.name).toBe("children[0][firstName]");
    expect(children[0].props.value).toBe("Sarah");
    expect(children[1].props.name).toBe("children[1][firstName]");
    expect(children[1].props.value).toBe("Bill");
    expect(
      children.map((c: ReactTestRendererJSON) => c.props.value)
    ).toMatchObject(["Sarah", "Bill"]);
  });
});
