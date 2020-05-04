import React, { FormEvent, ReactElement } from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { Form } from "../src";

describe("Form", () => {
  it("Form", () => {
    let form: ReactTestRenderer;
    act(() => {
      form = create(<Form></Form>);
    });
    expect(form.toJSON()).toBeTruthy();
    expect(form.toJSON().type).toBe("form");
    expect(form.toJSON().children).toBeNull();
  });

  it("Form debug mode", () => {
    let form: ReactTestRenderer;
    act(() => {
      form = create(<Form></Form>);
    });
    expect(form.toJSON().props.debugstore).toBeFalsy();
    act(() => {
      form = create(<Form debug></Form>);
    });
    expect(form.toJSON().props.debugstore).toBeTruthy();
  });

  it("Form with children", () => {
    const content = "random content";

    let form: ReactTestRenderer;
    act(() => {
      form = create(<Form>{content}</Form>);
    });
    expect(form.toJSON().children);
    expect(form.toJSON().children[0]).toBe(content);
  });

  it("Form with children render prop", () => {
    const content = "random content";

    let form: ReactTestRenderer;
    act(() => {
      form = create(<Form>{(): string => content}</Form>);
    });
    expect(form.toJSON().children);
    expect(form.toJSON().children[0]).toBe(content);
  });

  it("Form with initialValues", () => {
    const initialValues = { firstName: "Michele" };
    let form: ReactTestRenderer;
    act(() => {
      form = create(<Form debug data={initialValues}></Form>);
    });
    expect(form.toJSON());
    expect(form.toJSON().children).toBeNull();
    expect(form.toJSON().props.debugstore.get("firstName")).toBeTruthy();
    expect(form.toJSON().props.debugstore.toJSON()).toMatchObject(
      initialValues
    );
  });

  it("Form with onSubmit", () => {
    let form: ReactTestRenderer;
    let tmpVar = 0;
    act(() => {
      form = create(<Form onSubmit={(): number => tmpVar++}></Form>);
    });
    expect(form.toJSON());
    expect(form.toJSON().children === null);
    expect(form.toJSON().props.onSubmit).toBeTruthy();
    expect(tmpVar).toBe(0);
    form.toJSON().props.onSubmit();
    expect(tmpVar).toBe(1);
  });

  it("Form with onChange", () => {
    let form: ReactTestRenderer;
    const onChange = jest.fn();

    act(() => {
      form = create(
        <Form debug data={{ count: 10 }} onChange={onChange}></Form>
      );
    });
    expect(onChange.mock.calls.length).toBe(0);

    act(() => {
      form.toJSON().props.debugstore.set("count", 20);
    });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].type).toBe("change");
    expect(onChange.mock.calls[0][1]).toBe(form.toJSON().props.debugstore);
  });

  it("Form with onReset", () => {
    let form: ReactTestRenderer;
    const onReset = jest.fn();

    act(() => {
      form = create(<Form debug data={{ count: 10 }} onReset={onReset}></Form>);
    });
    expect(onReset.mock.calls.length).toBe(0);

    act(() => {
      form.toJSON().props.debugstore.set("count", 20);
    });
    expect(onReset.mock.calls.length).toBe(0);
    expect(form.toJSON().props.debugstore.get("count").toJSON()).toBe(20);

    act(() => {
      form.toJSON().props.debugstore.reset();
    });
    expect(onReset.mock.calls.length).toBe(0);
    expect(form.toJSON().props.debugstore.get("count").toJSON()).toBe(10);
  });

  it("Form with render prop, update store value", () => {
    let form: ReactTestRenderer;
    let setCounter: (c: number) => void;
    act(() => {
      form = create(
        <Form debug data={{ counter: 1 }}>
          {(store): ReactElement => {
            setCounter = (c): void => {
              store.set("counter", c);
            };
            return null;
          }}
        </Form>
      );
    });
    expect(form.toJSON());
    expect(form.toJSON().children).toBeNull();
    expect(form.toJSON().props.debugstore.toJSON().counter).toBe(1);
    act(() => {
      setCounter(2);
    });
    expect(form.toJSON().props.debugstore.toJSON().counter).toBe(2);
    act(() => {
      setCounter(100);
    });
    expect(form.toJSON().props.debugstore.toJSON().counter).toBe(100);
    act(() => {
      setCounter(0);
    });
    expect(form.toJSON().props.debugstore.toJSON().counter).toBe(0);
    act(() => {
      setCounter(-2);
    });
    expect(form.toJSON().props.debugstore.toJSON().counter).toBe(-2);
  });

  it("Form nested", () => {
    interface Location {
      city: string;
      country: string;
    }
    const initialValues = { location: { city: "Milan", country: "Italy" } };
    let form: ReactTestRenderer;
    act(() => {
      form = create(
        <Form debug data={initialValues}>
          <Form name="location">
            {(store): ReactElement => {
              const values = store.toJSON<Location>();
              return (
                <input
                  name="city"
                  value={values.city}
                  onChange={(e: FormEvent<HTMLInputElement>): void => {
                    store.set("city", e.currentTarget.value);
                  }}
                />
              );
            }}
          </Form>
        </Form>
      );
    });
    expect(form.toJSON().children).toBeTruthy();
    expect(form.toJSON().children[0].type).toBe("form");
    expect(form.toJSON().props.debugstore.get("location")).toBeTruthy();
    expect(
      form.toJSON().props.debugstore.get("location").toJSON()
    ).toMatchObject(initialValues.location);
    act(() => {
      const input = form.toJSON().children[0].children[0];
      if (typeof input !== "string") {
        input.props.onChange({ currentTarget: { value: "Rome" } });
      }
    });
    expect(form.toJSON().props.debugstore.toJSON().location.city).toBe("Rome");
  });
});
