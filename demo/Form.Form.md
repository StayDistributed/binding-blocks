Using `<Form>`, the root component will be wrapped in an HTML `<form>` element, and forms'features will be enabled.

prop | type | description
---|---|---
`data`     | `any` | initial store values
`onChange` | `(store: DataStore) => void` | store values are changed
`onSubmit` | `(e: FormEvent, store: DataStore) => void` | form has been submitted
`onReset`  | `(e: FormEvent, store: DataStore) => void` | form values has been reset to initial store values
`debug`    | `boolean` | expose store in prop "debugstore" for testing

```jsx static
<Form
  debug
  data={...}
  onChange={(store: DataStore) => {}}
  onSubmit={(e: FormEvent<HTMLFormElement>, store: DataStore) => {}}
  onReset={(e: FormEvent<HTMLFormElement>, store: DataStore) => {}}>
</Form>

<Form data={...}>
  {store => {
    // do something with store
  }}
</Form>
```