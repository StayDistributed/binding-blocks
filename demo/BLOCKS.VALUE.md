Value renders the value of the store's node in current position

- `<Value />` renders the store in current position, as is
- `<Value name="someprop" />` renders the value of `someprop` in the store tree

```jsx
import { Binding, With, Value } from '../src';

const data = {
  title: 'Example #1',
  person: {
    name: 'Michele',
    car: {
      color: 'grey'
    }
  }
};

<Binding data={data}>
  <h2><Value name="title" /></h2>
  <div>
    <With name="person">
      <p>
        Name: <Value name="name" /><br />
        <With name="car">
          Color with `name`: <Value name="color" /><br />
          <With name="color">
            Color without `name`: <Value /><br />
          </With>
        </With>
      </p>
    </With>
  </div>
</Binding>
```