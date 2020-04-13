```js
import { Binding, Input, Value, Log } from '../src';

const defaultValues = {
  email: 'info@example.com',
  password: 'secret'
};

<Binding data={defaultValues}>
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