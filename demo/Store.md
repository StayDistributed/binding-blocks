A *Store* holds the whole state tree of your application. The only way to change the state inside it is by using *Store* APIs:

```jsx
import { Binding } from '../src';

const data = {
  person: {
    firstName: 'Michele'
  }
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

### `get()`

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
      <table class="table table-borderless table-responsive"><tbody>
        <tr>
          <th>Parent Store</th>
          <th>Child Store</th>
          <th>Grand Child Store</th>
        </tr>
        <tr>
          <td><pre>{JSON.stringify(parentStore, '', 2)}</pre></td>
          <td><pre>{JSON.stringify(childStore, '', 2)}</pre></td>
          <td><pre>{JSON.stringify(grandChildStore, '', 2)}</pre></td>
        </tr>
      </tbody></table>
    );
  }}
</Binding>
```

### `set()`

Set a value on an existing Store

```jsx
import { Binding, Value, Log } from '../src';

const data = {
  count: 999
};

function randomValue() {
  return Math.floor(Math.random() * 1000);
};

<Binding data={data}>
  {store => (
    <div class="row">
      <div class="col-md-6">
        <div class="btn btn-primary" onClick={() => store.set('count', randomValue())}>Change #1</div>
        <br />
        <div class="btn btn-warning" onClick={() => store.get('count').set(randomValue())}>Change #2</div>
      </div>
      <div class="col-md-6">
        The count is: <Value name="count" />
        <hr />
        Using the `Log` util:<br />
        <Log />
      </div>
    </div>
  )}
</Binding>
```

### `unset() / reset()`

- Unset a value at a specific object key
- Reset Store with initial values

```jsx
import { Binding, Value, Log } from '../src';

const data = {
  firstName: 'Michele',
  age: 36
};

<Binding data={data}>
  {store => (
    <div class="row">
      <div class="col-md-6">
        <div class="btn btn-primary" onClick={() => store.unset('firstName')}>Unset FirstName</div>
        <br /><br />
        <div class="btn btn-warning" onClick={() => store.unset('age')}>Unset Age</div>
        <br /><br />
        <div class="btn btn-danger" onClick={() => store.reset()}>Reset</div>
      </div>
      <div class="col-md-6">
        <Log />
      </div>
    </div>
  )}
</Binding>
```

### `map()`

Directly map an array, the following are the same:

- `people.map('children', function(childStore) { });`
- `people.get('children').map(function(childStore) { })`

_Is suggested the use of `<ForEach />` DOM element, instead of using low-level map()_

### `pop()` - `push()` - `remove(index)`
(*array specific methods*)

- Add a new item in the array
- Remove the last item from array
- Remove the item at `index` from array

```jsx
import { Binding, ForEach } from '../src';

const data = {
  children: [{
    name: 'Mary'
  }, {
    name: 'Luke'
  }, {
    name: 'Paul'
  }]
};

<Binding data={data}>
  {store => (
    <div class="row">
      <div class="col-md-6">
        <ol>
          {store.map('children', (childStore, k) => {
            return (
              <li key={k}>{childStore.get('name').toJSON()}</li>
            )
          })}
        </ol>
      </div>
      <div class="col-md-6">
        <div class="btn btn-primary" onClick={() => store.get('children').push({ name: 'Jenny' })}>{`push() -> add "Jenny"`}</div>
        <br /><br />
        <div class="btn btn-danger" onClick={() => store.get('children').pop()}>{`pop() -> remove last`}</div>
      </div>
    </div>
  )}
</Binding>
```