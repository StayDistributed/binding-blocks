Suppose our application data is like the following:

```js static
const data = {
  currentLocation: {
    city: "New York",
    country: "New York",
  },
  last3VisitedCities: [
    { city: "Paris", country: "France" },
    { city: "Berlin", country: "Germany" },
    { city: "San Francisco", country: "California" },
  ],
};
```
We want to build a reusable component that renders city/country:

```jsx static
import { Value } from 'binding-blocks';

const Place = () => (
  <div className="d-flex mb-2">
    <div className="px-1 text-primary bg-light">
      <Value name="city" />
    </div>
    <div className="px-1 text-info bg-light">
      <Value name="country" />
    </div>
  </div>
);
```

We need to bind `city` and `country` values to different point in the data-structure,<br />
Once inside `currentLocation` node and 3 times inside `last3VisitedCities`.<br />

We can use the `name` attribute to change the scope the values are binded with.

```jsx static
  <Binding name="currentLocation">
  // components rendered here are binded to `currentLocation`
  </Binding>
```

```jsx static
  <ForEach name="last3VisitedCities">
  // components rendered here are binded to every `last3VisitedCities`
  </ForEach>
```

### Put everything together
(...with the help of some bootstrap 4 utils)

```jsx static
import { Binding, ForEach } from '../src';
import Place from './components/Place';
import data from './data/cities';

<Binding data={data}>
  <div class="d-md-flex">
    <div class="mr-3 p-3 border">
      <h5>Current Location</h5>
      <Binding name="currentLocation">
        <Place />
      </Binding>
    </div>
    <div class="mr-3 p-3 border">
      <h5>Last visited cities</h5>
      <ForEach name="last3VisitedCities">
        <Place />
      </ForEach>
    </div>
  </div>
</Binding>
```

## No wiring props

Notice that there is no wiring props between components.<br />
Every component can be declared in separated files and included in the application without passing any props to it.

```js noeditor
import { Binding, ForEach } from '../src';
import Place from './components/Place';
import data from './data/cities';

<Binding data={data}>
  <div class="d-md-flex">
    <div class="mr-3 p-3 border">
      <h5>Current Location</h5>
      <Binding name="currentLocation">
        <Place />
      </Binding>
    </div>
    <div class="mr-3 p-3 border">
      <h5>Last visited cities</h5>
      <ForEach name="last3VisitedCities">
        <Place />
      </ForEach>
    </div>
  </div>
</Binding>
```