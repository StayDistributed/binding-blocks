`<Select>` renders a React controlled select.<br />
We can use `name` prop to bind Select value to a position in state tree, or use `<With>` as seen before.

```jsx
import { Form, With, Select } from 'binding-blocks';

<Form data={{ location: 'Milan', country: 'Italy' }}>
  <Select name="location">
    <option>London</option>
    <option>Milan</option>
    <option>Paris</option>
  </Select>

  <With name="country">
    <Select>
      <option>United Kingdom</option>
      <option>Italy</option>
      <option>France</option>
    </Select>
  </With>

  <pre>
    <With>{JSON.stringify}</With>
  </pre>
</Form>
```
