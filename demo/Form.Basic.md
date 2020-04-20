

```jsx
import { Form, Input, Button, Log } from '../src';

const data = {
  email: 'info@example.com',
  password: 'secret',
  remember: false
};

const handleClick = (e, store) => {
  e.preventDefault();
  alert(JSON.stringify(store, '', 2));
};

<Form data={data} onSubmit={handleClick}>
  <div class="form-row">
    <div class="form-group col-md-6 pr-4">

      <label>Email</label>
      <Input name="email" type="email" class="form-control" />

      <label>Password</label>
      <Input name="password" type="password" class="form-control" />

      <label><Input name="remember" type="checkbox" /> Remember me</label>

      <br /><br />

      <div class="d-flex flex-row-reverse">
        <Button class="btn btn-sm btn-primary">Submit</Button>
        <Button class="btn btn-sm btn-danger mx-2" type="reset">Reset</Button>
      </div>

    </div>

    <div class="form-group col-md-6">
      <label>current store values:</label>
      <Log />
    </div>
  </div>
</Form>
```
