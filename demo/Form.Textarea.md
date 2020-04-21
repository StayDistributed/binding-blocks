Renders an HTML `<textarea />` element as a React controlled component.<br />
We can use `name` prop to bind Input value to a position in state tree, or use `<With>` as seen before.

```jsx
import { Form, With, Textarea } from 'binding-blocks';

<Form data={{ location: 'Milan', country: 'Italy' }}>
  <Textarea name="location" />

  <With name="country">
    <Textarea />
  </With>

  <pre>
    <With>{JSON.stringify}</With>
  </pre>
</Form>
```