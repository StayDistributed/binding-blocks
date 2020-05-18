Binding is where data is initialized.

prop | type | description
---|---|---
`data`     | `any` | initial store values
`name`     | `string, number` | the position in the store's tree
`onChange` | (e: [StoreEvent](/#section-store-event)) => void | store values are changed
`onDidChange` | (e: [StoreEvent](/#section-store-event)) => void | store values editing is finished
`onSubmit` | (e: [StoreEvent](/#section-store-event)) => void | `submit` event has been triggered
`onReset`  | (e: [StoreEvent](/#section-store-event)) => void | `reset` event has been triggered

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