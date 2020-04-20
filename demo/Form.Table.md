The more forms are complex, the more `binding-blocks` helps to keep high readability.

```jsx
import { Form, ForEach, Input, Button } from '../src';

/**
 * Design the state
 */
const data = {
  items: [{
    firstName: 'Michele',
    lastName: 'Salvini',
    userName: '@slv',
  }, {
    firstName: 'John',
    lastName: 'Doe',
    userName: '@johndoe',
  }]
};

/**
 * Define the rows'components in a separate file:
 */
const HeadRow = () => (
  <tr>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">username</th>
    <th scope="col">#</th>
  </tr>
);

const Row = () => (
  <tr>
    <td class="p-0"><Input class="d-block w-100 px-2" name="firstName" /></td>
    <td class="p-0"><Input class="d-block w-100 px-2" name="lastName" /></td>
    <td class="p-0"><Input class="d-block w-100 px-2" name="userName" /></td>
    <td class="p-0" scope="col">
      <Button class="btn btn-outline-danger btn-sm btn-block" onClick={onRemoveRow}>X</Button>
    </td>
  </tr>
);

/**
 * Also handlers can be defined in separate files,
 * all things needed to manipulate data will be passed inside
 */
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

function onSubmit(e, store) {
  e.preventDefault();
  alert(JSON.stringify(store, '', 2));
};

/**
 * Build form
 */
<Form data={data} onSubmit={onSubmit}>
  <table class="table table-borderless">
    <thead>
      <HeadRow />
    </thead>
    <tbody>
      <ForEach name="items">
        <Row />
      </ForEach>
    </tbody>
  </table>
  <div class="d-flex flex-row-reverse">
    <Button class="btn btn-sm btn-primary">Submit</Button>
    <Button class="btn btn-sm btn-secondary mr-2" type="reset">Reset</Button>
    <Button class="btn btn-sm btn-info mr-2" onClick={onAddRow}>Add new Row</Button>
  </div>
</Form>
```

Notice that there's NO wiring props between Form and children `<Row />`
