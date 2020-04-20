`binding-blocks` is designed for building Forms.<br />
The speed of implementation and readability of forms is core features of the lib.

Using `<Form>`, the root component will be wrapped in an HTML `<form>` element, and all forms'features will be enabled.
```jsx static
<Form data={...}>
</Form>

<Form data={...}>
  {store => {
    // do something with store
  }}
</Form>
```

`<Input>` renders a React controlled input.<br />
We can use `name` prop to bind Input value to a position in state tree, or use `<With>` as seen before.
```jsx static
<Input name="someprop" />

<With name="someprop">
  <Input />
</With>
```

`<Button>` renders an HTML `<button>` element, with a special `onClick` prop.<br />
```jsx static
<Button onClick={(e: MouseEvent<HTMLButtonElement>, store: DataStore) => {}}></Button>
```

- `e` is a MouseEvent, (with preventDefault, target, etc...)
- `store` is the _binding-blocks_ Store

```jsx static
<Form
  onSubmit={(e: FormEvent<HTMLFormElement>, store: DataStore) => {}}
  onReset={(e: FormEvent<HTMLFormElement>, store: DataStore) => {}}
>

  {/* Inside <Form> Button's click will trigger Form.onSubmit */}
  <Button>Submit</Button>

  {/* Inside <Form> Button supports type="reset"
      to reset all the changes and trigger Form.onReset */}
  <Button type="reset">Reset</Button>

</Form>
```
