import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { Form, Button } from "../src";

describe("Button", () => {
  it("onClick", () => {
    const initialValues = { firstName: "Mark" };
    let form: ReactTestRenderer;
    const onClick = jest.fn();
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <Button name="firstName" onClick={onClick}>
            foo
          </Button>
        </Form>
      );
    });
    expect(form.toJSON().children[0].children[0]).toBe("foo");
    expect(form.toJSON().children[1]).toBeFalsy();
    const e = "EVENT";
    form.toJSON().children[0].props.onClick(e);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBe(e);
    expect(onClick.mock.calls[0][1].toJSON()).toBe("Mark");
  });
});
