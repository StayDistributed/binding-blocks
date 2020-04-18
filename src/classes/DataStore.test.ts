import DataStore, { HierarchyDirection } from "./DataStore";

describe("DataStore", () => {
  it("init", () => {
    const initialValues = { skills: ["js", "css"] };
    const store = DataStore.createStore(initialValues);
    expect(store.toJSON()).toMatchObject(initialValues);
  });

  it("accepted data types", () => {
    const store = DataStore.createStore({
      a: {
        b: "John",
      },
      c: "Mark",
      d: 34,
      e: (Symbol("Sym") as unknown) as string,
    });

    expect(store.get("a").get("b").toJSON()).toBe("John");
    expect(store.get("c").toJSON()).toBe("Mark");
    expect(store.get("d").toJSON()).toBe(34);
    expect(store.get("e").toObject()).not.toBeDefined();
  });

  it("get", () => {
    const initialValues = { skills: ["js", "css"], name: "Mark" };
    const store = DataStore.createStore(initialValues);
    expect(store.get("name").toJSON()).toBe("Mark");
    expect(store.get("skills").toObject()).toMatchObject(["js", "css"]);
    expect(store.set("age", 34).get("age").toJSON()).toBe(34);
    expect(
      store
        .set("age", 34)
        .mutate("age", (v: number) => v + 2)
        .get("age")
        .toJSON()
    ).toBe(36);
  });

  it("set", () => {
    const initialValues = { skills: ["js", "css"], name: "Mark" };
    const store = DataStore.createStore(initialValues);
    expect(store.get("name").toJSON()).toBe("Mark");
    expect(store.get("skills").toObject()).toMatchObject(["js", "css"]);

    store.get("skills").set(0, "ruby");
    expect(store.get("skills").toObject()).toMatchObject(["ruby", "css"]);

    store.get("skills").pop();
    expect(store.get("skills").toObject()).toMatchObject(["ruby"]);

    store.get("skills").set("none");
    expect(store.get("name").toJSON()).toBe("Mark");
    expect(store.get("skills").toJSON()).toBe("none");
    expect(store.get("skills").toJSON()).toBe("none");

    store.set("skills", "full");
    expect(store.get("skills").toJSON()).toBe("full");

    store.set({ firstName: "Mark" });
    expect(store.get("skills")).toBeFalsy();
    expect(store.get("name")).toBeFalsy();
    expect(store.get("firstName").toJSON()).toBe("Mark");

    expect(store.get("firstName").get("something")).toBe(null);
  });

  it("unset", () => {
    const initialValues = { firstName: "Mark", lastName: "Doe" };
    const store = DataStore.createStore(initialValues);
    expect(store.get("firstName").toJSON()).toBe("Mark");
    store.unset("firstName");
    expect(store.get("firstName")).toBeFalsy();
  });

  it("map", () => {
    const initialValues = { skills: ["js", "css", "nodejs"] };
    const store = DataStore.createStore(initialValues);
    store.get("skills").map((s, k) => {
      expect(s.toJSON()).toBe(initialValues.skills[k]);
    });
    store.map("skills", (s, k) => {
      expect(s.toJSON()).toBe(initialValues.skills[k]);
    });
  });

  it("remove", () => {
    const initialValues = { skills: ["js", "css", "nodejs"] };
    const store = DataStore.createStore(initialValues);
    store.get("skills").get(1).removeFromParent();
    expect(store.get("skills").toJSON()).toMatchObject(["js", "nodejs"]);
    store.get("skills").remove(0);
    expect(store.get("skills").toJSON()).toMatchObject(["nodejs"]);
  });

  it("unshift, push", () => {
    const initialValues = { skills: ["js", "css"] };
    const store = DataStore.createStore(initialValues);
    expect(store.get("skills").toObject()).toMatchObject(["js", "css"]);

    store.get("skills").push("nodejs");
    expect(store.get("skills").toObject()).toMatchObject([
      "js",
      "css",
      "nodejs",
    ]);
  });

  it("getPath", () => {
    const store = DataStore.createStore({
      a: {
        b: [
          {
            name: "John",
          },
        ],
      },
    });
    expect(store.get("a").get("b").get(0).getPath(true)).toBe("a[b][0]");

    store.get("a").get("b").push({ name: "Mark" });

    expect(store.get("a").get("b").get(1).get("name").getPath(true)).toBe(
      "a[b][1][name]"
    );
  });

  it("on", () => {
    const store = DataStore.createStore({
      name: "John",
    });
    expect(store.get("name").toJSON()).toBe("John");
    const onChange = jest.fn();
    expect(onChange.mock.calls.length).toBe(0);
    store.on("change", (e) => {
      onChange(e.target.toJSON());
    });
    store.set("name", "David");
    expect(onChange.mock.calls[0][0]).toMatchObject({ name: "David" });
    expect(onChange.mock.calls.length).toBe(1);
    store.set("name", "Mark");
    expect(onChange.mock.calls[1][0]).toMatchObject({ name: "Mark" });
    /**
     * calling on primitive store and not on Map
     */
    store.get("name").set("David");
    expect(onChange.mock.calls[2][0]).toBe("David");
  });

  it("listeners", () => {
    const store = DataStore.createStore({
      name: "John",
    });

    const onChange1 = jest.fn();
    const onChange2 = jest.fn();
    store.on("change", onChange1);
    store.get("name").on("change", onChange2);

    expect(store.getListeners(HierarchyDirection.INCLUSIVE_UP).length).toBe(1);
    expect(store.getListeners(HierarchyDirection.INCLUSIVE_DOWN).length).toBe(
      2
    );
    expect(store.getListeners(HierarchyDirection.EXCLUSIVE_UP).length).toBe(0);
    expect(store.getListeners(HierarchyDirection.EXCLUSIVE_DOWN).length).toBe(
      1
    );

    expect(
      store.get("name").getListeners(HierarchyDirection.INCLUSIVE_UP).length
    ).toBe(2);
    expect(
      store.get("name").getListeners(HierarchyDirection.INCLUSIVE_DOWN).length
    ).toBe(1);
    expect(
      store.get("name").getListeners(HierarchyDirection.EXCLUSIVE_UP).length
    ).toBe(1);
    expect(
      store.get("name").getListeners(HierarchyDirection.EXCLUSIVE_DOWN).length
    ).toBe(0);
  });

  it("StoreEvent stopPropagation", () => {
    const store = DataStore.createStore({
      level1: {
        level2: {
          name: "Mark",
        },
      },
    });
    const onL1Change = jest.fn();
    const onL2Change = jest.fn();

    store.get("level1").on("change", onL1Change);
    store.get("level1").get("level2").on("change", onL2Change);

    store.get("level1").get("level2").set("name", "David");
    expect(onL1Change.mock.calls.length).toBe(1);
    expect(onL2Change.mock.calls.length).toBe(1);

    store.get("level1").get("level2").set("name", "Paul");
    expect(onL1Change.mock.calls.length).toBe(2);
    expect(onL2Change.mock.calls.length).toBe(2);

    store
      .get("level1")
      .get("level2")
      .on("change", (e) => e.stopPropagation());

    store.get("level1").get("level2").set("name", "Paul");
    expect(onL1Change.mock.calls.length).toBe(2);
    expect(onL2Change.mock.calls.length).toBe(3);

    store.get("level1").get("level2").set("name", "John");
    expect(onL1Change.mock.calls.length).toBe(2);
    expect(onL2Change.mock.calls.length).toBe(4);

    store.get("level1").set("level2", null);
    expect(onL1Change.mock.calls.length).toBe(3);
    expect(onL2Change.mock.calls.length).toBe(5);
  });

  it("release", () => {
    const store = DataStore.createStore({
      name: "John",
      skills: ["js", "css"],
    });
    const onRootChange = jest.fn();
    const onReleasedChange = jest.fn();
    store.on("change", onRootChange);
    store.get("skills").on("change", onReleasedChange);

    store.set("skills", ["ruby"]);
    expect(onReleasedChange.mock.calls.length).toBe(1);
    expect(onRootChange.mock.calls.length).toBe(1);

    store.set("skills", ["html"]);
    expect(onReleasedChange.mock.calls.length).toBe(1);
    expect(onRootChange.mock.calls.length).toBe(2);

    store.set("skills", "none");
    expect(onReleasedChange.mock.calls.length).toBe(1);
    expect(onRootChange.mock.calls.length).toBe(3);
  });
});
