Binding is where data is initialized.
#### `<Binding data={...} />`

```jsx static
const someData = {
  firstName: 'Michele',
  age: 36,
  location: {
    city: 'San Francisco',
    country: 'US',
  }
};

/**
 * Pass data to Binding through props
 * to initialize the Store of `binding-blocks`
 */

// Store is available in other `binding blocks`
<Binding data={someData}>
  <Value name="firstName" />
  <If name="location">
    <p>We have a location!</p>
  </If>
</Binding>

// Store is also available as "render prop"
<Binding data={someData}>
  {store => {
    // do something with store (advanced use)
  }}
</Binding>
```

---

`Binding` is also used to change the position in the state tree:
#### `<Binding name="" />`

```jsx
import { Binding, Value } from 'binding-blocks';
import { blockBindingData } from './data/blocks';

<Binding data={blockBindingData}>

  <p>Name: <Value name="firstName" /></p>

  <Binding name="location">
    <p>City: <Value name="city" /></p>
    <p>Country: <Value name="country" /></p>
  </Binding>

</Binding>
```