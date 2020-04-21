Renders an HTML `<input />` element as a React controlled component.<br />
We can use `name` prop to bind Input value to a position in state tree, or use `<With>` as seen before.

prop | type | description
---|---|---
`name`     | `string / number` | set the position in the state tree

```jsx
import { Form, With, Input } from 'binding-blocks';

<Form data={{ city: 'Milan', country: 'Italy', visited: true }}>
  <Input name="city" />

  <With name="country">
    <Input />
  </With>

  <label>
    <Input name="visited" type="checkbox" />
    visited
  </label>

  <pre>
    <With>{JSON.stringify}</With>
  </pre>
</Form>
```
