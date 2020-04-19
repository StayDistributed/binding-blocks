```jsx static
<Binding data={data}>
  <th>First Name:</th>
  <td><Value name="firstName" /></td>

  <th>Age:</th>
  <td><Value name="age" /></td>
</Binding>
```

```jsx
import { Binding, Value } from '../src';

const data = {
  firstName: 'Michele',
  age: 36,
};

<Binding data={data}>
  <table class="table"><tbody>
    <tr>
      <th>First Name:</th>
      <td><Value name="firstName" /></td>
    </tr>
    <tr>
      <th>Age:</th>
      <td><Value name="age" /></td>
    </tr>
  </tbody></table>
</Binding>
```
