### Basic form

```jsx static
<Binding data={{email: 'info@example.com', password: 'secret'}}>
  <Input name="email" type="email" />
  <Input name="password" type="password" />
  <Log />
</Binding>
```

```jsx
import { Binding, Input, Value, Log } from '../src';

const data = {
  email: 'info@example.com',
  password: 'secret'
};

<Binding data={data}>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label>Email</label>
      <Input name="email" type="email" class="form-control" />
    </div>
    <div class="form-group col-md-4">
      <label>Password</label>
      <Input name="password" type="password" class="form-control" />
    </div>
    <div class="form-group col-md-4">
      <label>Values:</label>
      <Log />
    </div>
  </div>
</Binding>
```

### Write lists faster

```jsx static
const data = {
  name: 'Mark',
  skills: ['js', 'css']
};

<Binding data={data}>
  <label>Name</label>
  <Input name="name" class="form-control" />

  <label>Skills</label>
  <ForEach name="skills">
    <Input />
    <Button onClick={(e, store) => store.removeFromParent()} />
  </ForEach>

  <Button onClick={(e, store) => store.get("skills").push("New skill")}>
    Add skill
  </Button>
</Binding>
```

```jsx
import { Binding, ForEach, Input, Button, Log } from '../src';

const data = {
  name: 'Mark',
  skills: ['js', 'css']
};

<Binding data={data}>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label>Name</label>
      <Input name="name" class="form-control" />
    </div>
    <div class="form-group col-md-4">
      <label>Skills</label>
      <ul>
        <ForEach name="skills">
          <li>
            <Input />
            <Button
              onClick={(e, store) => {
                e.preventDefault();
                store.removeFromParent();
              }}
            >
              -
            </Button>
          </li>
        </ForEach>
        <li>
          <Button
            onClick={(e, store) => {
              e.preventDefault();
              store.get("skills").push("New skill");
            }}
          >
            Add skill
          </Button>
        </li>
      </ul>
    </div>
    <div class="form-group col-md-4">
      <label>Values:</label>
      <Log />
    </div>
  </div>
</Binding>
```