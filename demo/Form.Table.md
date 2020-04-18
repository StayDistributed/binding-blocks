Write

```jsx static
const data = {
  items: [{
    firstName: 'Michele',
    lastName: 'Salvini',
    userName: '@slv',
  }]
};

<Binding data={data}>
  <ForEach name="items">
    <tr>
      <td><Input name="firstName" /></td>
      <td><Input name="lastName" /></td>
      <td><Input name="userName" /></td>
      <td><Button onClick={onRemoveRow}>X</Button></td>
    </tr>
  </Foreach>
  <Button onClick={onAddRow}>Add new</Button>
</Binding>
```

```jsx
import { Binding, ForEach, Input, Button } from '../src';

const data = {
  items: [{
    firstName: 'Michele',
    lastName: 'Salvini',
    userName: '@slv',
  }]
};

function onRemoveRow(e, store) {
  e.preventDefault();
  store.removeFromParent();
};

function onAddRow(e, store) {
  e.preventDefault();
  store.get('items').push({
    firstName: 'First Name',
    lastName: 'Last Name',
    userName: '@username',
  });
};

<Binding data={data}>
  <table class="table table-borderless">
    <thead>
      <tr>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">username</th>
        <th scope="col">#</th>
      </tr>
    </thead>
    <tbody>
      <ForEach name="items">
        <tr>
          <td class="p-0"><Input class="d-block w-100 px-2" name="firstName" /></td>
          <td class="p-0"><Input class="d-block w-100 px-2" name="lastName" /></td>
          <td class="p-0"><Input class="d-block w-100 px-2" name="userName" /></td>
          <td class="p-0" scope="col">
            <Button class="btn btn-danger btn-sm btn-block" onClick={onRemoveRow}>X</Button>
          </td>
        </tr>
      </ForEach>
    </tbody>
  </table>
  <Button class="btn btn-primary btn-sm" onClick={onAddRow}>Add new</Button>
</Binding>
```
