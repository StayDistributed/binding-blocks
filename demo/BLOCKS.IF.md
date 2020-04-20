`If` renders its children only if the relative value is set

- `<If name="someprop" />` renders children if `someprop` is set
- `<If not name="someprop" />` renders children if `someprop` is NOT set

Notice that `<If />` doesn't change the position in the store tree (you still need `With` to change position)

```jsx
import { Binding, Value, With, If } from '../src';

const data = {
  title: 'Example #1',
  subtitle: 'This is a subtitle', // toggle this line to refresh the example
  person: {
    name: 'Michele',
  }
};

<Binding data={data}>
  <If name="title">
    <h3><Value name="title" /></h3>
  </If>

  <If name="subtitle">
    <h4><Value name="subtitle" /></h4>
  </If>
  <If not name="subtitle">
    <div>Subtitle missing</div>
  </If>

  <If name="person">
    <With name="person">
      <div><Value name="name" /></div>
    </With>
  </If>
</Binding>
```