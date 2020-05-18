Using `<Form>`, the root component will be wrapped in an HTML `<form>` element, and forms'features will be enabled.

prop | type | description
---|---|---
`data`     | `any` | Initial store values
`onChange` | (e: [StoreEvent](/#section-store-event)) => void | store values are changed
`onDidChange` | (e: [StoreEvent](/#section-store-event)) => void | store values editing is finished
`onSubmit` | (e: [StoreEvent](/#section-store-event)) => void | form has been submitted
`onReset`  | (e: [StoreEvent](/#section-store-event)) => void | form values has been reset to initial store values
`debug`    | `boolean` | Expose store in prop "data-debug-store" for testing

```jsx static
<Form
  debug
  data={...}
  onChange={(e: StoreEvent) => {}}
  onDidChange={(e: StoreEvent) => {}}
  onSubmit={(e: StoreEvent) => {}}
  onReset={(e: StoreEvent) => {}}>
</Form>

<Form data={...}>
  {store => {
    // do something with store
  }}
</Form>
```