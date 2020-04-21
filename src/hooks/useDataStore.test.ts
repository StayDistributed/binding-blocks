import { createStoreIfNotExists, getStoreFromContext } from "./useDataStore";
import DataStore from "../classes/DataStore";

describe("useDataStore", () => {
  it("createStoreIfNotExists", () => {
    let store;

    expect(
      createStoreIfNotExists(DataStore.createStore({ age: 8 }), {
        name: "location",
      })
    ).toBeFalsy();

    expect(
      createStoreIfNotExists(DataStore.createStore([]), {
        name: 0,
      })
    ).toBeFalsy();

    store = createStoreIfNotExists(undefined, {});
    expect(store.toJSON()).toMatchObject({});
    expect(store.root.toJSON()).toMatchObject({});

    [0, 100, false, true, "", "some string"].forEach((v) => {
      store = createStoreIfNotExists(undefined, {
        data: v,
      });
      expect(store).toBeTruthy();
      expect(store.toJSON()).toBe(v);
      expect(store.root.toJSON()).toBe(v);

      store = createStoreIfNotExists(DataStore.createStore({}), {
        data: v,
      });
      expect(store).toBe(null);

      store = createStoreIfNotExists(DataStore.createStore({ existing: v }), {
        name: "missing",
      });
      expect(store).toBeFalsy();
    });
  });

  it("getStoreFromContext", () => {
    let store;

    store = getStoreFromContext(undefined, {});
    expect(store).toBeFalsy();

    store = getStoreFromContext(undefined, { data: "test" });
    expect(store).toBeFalsy();

    [0, 100, false, true, "", "some string"].forEach((v) => {
      store = getStoreFromContext(DataStore.createStore(v), {});
      expect(store).toBeTruthy();
      expect(store.toJSON()).toBe(v);
      expect(store.root.toJSON()).toBe(v);

      store = getStoreFromContext(DataStore.createStore({ aKey: v }), {});
      expect(store).toBeTruthy();
      expect(store.toJSON()).toMatchObject({ aKey: v });
      expect(store.root.toJSON()).toMatchObject({ aKey: v });
    });

    store = getStoreFromContext(DataStore.createStore({ age: 8 }), {
      name: "age",
    });
    expect(store).toBeTruthy();
    expect(store.toJSON()).toBe(8);
    expect(store.root.toJSON()).toMatchObject({ age: 8 });

    store = getStoreFromContext(DataStore.createStore(["test"]), {
      name: 0,
    });
    expect(store).toBeTruthy();
    expect(store.toJSON()).toBe("test");
    expect(store.root.toJSON()).toMatchObject(["test"]);

    store = getStoreFromContext(DataStore.createStore(["test"]), {
      name: 1,
    });
    expect(store).toBeFalsy();

    store = getStoreFromContext(DataStore.createStore(["test1", "test2"]), {
      name: 0,
    });
    expect(store).toBeTruthy();
    expect(store.toJSON()).toBe("test1");
    expect(store.root.toJSON()).toMatchObject(["test1", "test2"]);
  });
});
