Renders an HTML `<button>` element, with a special `onClick` prop.<br />

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
  <Button onClick={(e: MouseEvent<HTMLButtonElement>, store: DataStore) => {}}>Submit</Button>

  {/* Inside <Form> Button supports type="reset"
      to reset all the changes and trigger Form.onReset */}
  <Button type="reset">Reset</Button>

</Form>
```
