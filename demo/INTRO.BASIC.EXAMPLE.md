In this basic example we'll manage a portion of the state of our App to represents our current location and the last 3 visited cities:

### Our state

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

### Our `<Place />` React component

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

We use `<Value name="" />` to render `city` and `country` values,<br />
One refers to `currentLocation` node and the other refers to `last3VisitedCities`.<br />

`<Place />` will render different values based on its location in the components' hierarchy.<br />
`binding-blocks` perfectly fit the [Thinking in React](https://reactjs.org/docs/thinking-in-react.html) directives.

We will use the utils `With` and `ForEach` to change the position in the state tree.

```jsx static
  // components rendered here are binded to `currentLocation`
  <With name="currentLocation">
  </With>

  // components rendered here are binded to every `last3VisitedCities`
  <ForEach name="last3VisitedCities">
  </ForEach>
```

### Put everything together
(...with the help of some bootstrap 4 utils)

Notice that there is __#NoWiringProps__ between components.<br />
Every component can be declared in separated files and included in the application without passing any props to it.

```jsx
import { Binding, With, ForEach } from 'binding-blocks';
import Place from './components/Place';
import data from './data/cities';

<Binding data={data}>
  <div class="row">

    <div class="col-md-6">
      <h5>Current Location</h5>
      <With name="currentLocation">
        <Place />
      </With>
    </div>

    <div class="col-md-6">
      <h5>Last visited cities</h5>
      <ForEach name="last3VisitedCities">
        <Place />
      </ForEach>
    </div>

  </div>
</Binding>
```
