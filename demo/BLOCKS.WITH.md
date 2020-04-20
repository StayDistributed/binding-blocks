Is also available an alias for Binding, to improve readability:

```jsx static
<With name="location">
  <Value name="city" />
</With>

<With name="location">
  {store => {
    // do something with the `location` node of the state tree
  }}
</With>
```

```jsx
import { Binding, With, Value } from '../src';
import { blockBindingData } from './data/blocks';

<Binding data={blockBindingData}>
  <p>Name: <Value name="firstName" /></p>
  <With name="location">
    <p>City: <Value name="city" /></p>
    <p>Country: <Value name="country" /></p>
  </With>
</Binding>
```
