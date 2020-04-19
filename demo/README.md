[![NPM](https://img.shields.io/npm/v/binding-blocks.svg)](https://www.npmjs.org/package/binding-blocks)
[![Travis CI](https://travis-ci.com/staydistributed/binding-blocks.svg?branch=master)](https://travis-ci.com/staydistributed/binding-blocks)
[![Coveralls](https://coveralls.io/repos/github/StayDistributed/binding-blocks/badge.svg?branch=master)](https://coveralls.io/github/StayDistributed/binding-blocks?branch=master)
[![Codefactor](https://www.codefactor.io/repository/github/staydistributed/binding-blocks/badge)](https://www.codefactor.io/repository/github/staydistributed/binding-blocks)
[![Bettercodehub](https://bettercodehub.com/edge/badge/StayDistributed/binding-blocks?branch=master)](https://bettercodehub.com/)
[![Discord](https://img.shields.io/discord/699514717768515645)](https://discord.gg/q4vx7ej)

Create components with easy and declarative data binding.<br />
Manage state of small applications, bind your components to any JSON-like data structure.

### Install

```bash static
$ npm i binding-blocks
```

#### Usage

```jsx static
import { Binding, Value } from 'binding-blocks';

const someData = {
  title: 'Binding Blocks',
  subtitle: 'easy and declarative data bindings'
};

const Comp = () => {
  return (
    <Binding data={someData}>
      <h1><Value name="title" /></h1>
      <h2><Value name="subtitle" /></h2>
    </Binding>
  );
}
```

## Hello World

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
