```jsx static
<Binding data={data}>
  <th>Location:</th>
  <td>
    <Binding name="location">
      <div>City: <Value name="city" /></div>
      <div>Country: <Value name="country" /></div>
    </Binding>
  </td>
</Binding>
```

```jsx
import { Binding, Value } from '../src';

const data = {
  location: {
    city: 'Milan',
    country: 'Italy'
  },
};

<Binding data={data}>
  <table class="table"><tbody>
    <tr>
      <th>Location:</th>
      <td>
        <Binding name="location">
          <div>City: <Value name="city" /></div>
          <div>Country: <Value name="country" /></div>
        </Binding>
      </td>
    </tr>
  </tbody></table>
</Binding>
```
