```jsx static
<Binding data={data}>
  <th>Skills:</th>
  <td>
    <ForEach name="skills">
      <li><Value /></li>
    </ForEach>
  </td>

  <th>Lucky numbers:</th>
  <td>
    <ForEach name="luckyNumbers">
      <div><Value /></div>
    </ForEach>
  </td>
</Binding>
```

```jsx
import { Binding, Value, ForEach } from '../src';

const data = {
  skills: [
    'react',
    'design-patterns'
  ],
  luckyNumbers: [
    23,
    84
  ],
};

<Binding data={data}>
  <table class="table"><tbody>
    <tr>
      <th>Skills:</th>
      <td>
        <ForEach name="skills">
          <li><Value /></li>
        </ForEach>
      </td>
    </tr>
    <tr>
      <th>Lucky numbers:</th>
      <td>
        <ForEach name="luckyNumbers">
          <div><Value /></div>
        </ForEach>
      </td>
    </tr>
  </tbody></table>
</Binding>
```
