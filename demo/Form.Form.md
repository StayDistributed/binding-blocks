Using `<Form>`, the root component will be wrapped in an HTML `<form>` element, and forms'features will be enabled.

prop | type | description
---|---|---
`data`     | `any` | initial store values
`onChange` | (e: StoreEvent, store: [Store](/#section-store)) => void | store values are changed
`onSubmit` | (e: FormEvent, store: [Store](/#section-store)) => void | form has been submitted
`onReset`  | (e: FormEvent, store: [Store](/#section-store)) => void | form values has been reset to initial store values
`debug`    | `boolean` | expose store in prop "debugstore" for testing

```jsx static
<Form
  debug
  data={...}
  onChange={(store: Store) => {}}
  onSubmit={(e: FormEvent<HTMLFormElement>, store: Store) => {}}
  onReset={(e: FormEvent<HTMLFormElement>, store: Store) => {}}>
</Form>

<Form data={...}>
  {store => {
    // do something with store
  }}
</Form>
```