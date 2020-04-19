A *Store* holds the whole state tree of your application. The only way to change the state inside it is by using *Store* APIs:

```jsx
import { Binding } from '../src';

const data = {
  firstName: 'Michele'
};

<Binding data={data}>
  {store => {
    return (
      <pre>
        {JSON.stringify(store)}
      </pre>
    );
  }}
</Binding>
```

## `get()`

Get a child Store

```jsx
import { Binding } from '../src';

const data = {
  person: {
    firstName: 'Michele'
  }
};

<Binding data={data}>
  {store => {
    const parentStore = store;
    const childStore = store.get('person');
    const grandChildStore = store.get('person').get('firstName');

    return (
      <table class="table"><tbody>
        <tr>
          <th>Parent Store</th>
          <td><pre>{JSON.stringify(parentStore, '', 2)}</pre></td>
        </tr>
        <tr>
          <th>Child Store</th>
          <td><pre>{JSON.stringify(childStore, '', 2)}</pre></td>
        </tr>
        <tr>
          <th>Grand Child Store</th>
          <td><pre>{JSON.stringify(grandChildStore, '', 2)}</pre></td>
        </tr>
      </tbody></table>
    );
  }}
</Binding>
```

## `set()`

Set a value on an existing Store

```jsx
import { Binding, Value, Log } from '../src';

const data = {
  peopleCount: 999
};

function getRandomValue() {
  return Math.floor(Math.random() * 1000);
};

<Binding data={data}>
  {store => (
    <div class="row">
      <div class="col-md-4">
        <div class="btn btn-primary" onClick={() => store.set('peopleCount', getRandomValue())}>Change Value</div>
      </div>
      <div class="col-md-4">
        Using `Value`:
        <hr />
        The people's count is: <Value name="peopleCount" />
      </div>
      <div class="col-md-4">
        Using the `Log` util:
        <hr />
        <Log />
      </div>
    </div>
  )}
</Binding>
```