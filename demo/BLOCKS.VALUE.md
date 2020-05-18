Value renders the value of the store's node in current position

prop | type | description
---|---|---
`name` | `string, number` | The position in the store's tree

```jsx
import { Binding, With, Value } from 'binding-blocks';

const data = {
  title: 'Example #1',
  person: {
    name: 'Michele',
  }
};

<Binding data={data}>
  <Value name="title" />
  <br />

  <With name="person">
    <Value name="name" />
  </With>
  <br />

  <With name="person">
    <With name="name">
      <Value />
    </With>
  </With>
</Binding>
```