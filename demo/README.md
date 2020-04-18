[![NPM](https://img.shields.io/npm/v/binding-blocks.svg)](https://www.npmjs.org/package/binding-blocks)
[![Travis CI](https://travis-ci.com/staydistributed/binding-blocks.svg?branch=master)](https://travis-ci.com/staydistributed/binding-blocks)
[![Coveralls](https://coveralls.io/repos/github/StayDistributed/binding-blocks/badge.svg?branch=master)](https://coveralls.io/github/StayDistributed/binding-blocks?branch=master)
[![Codefactor](https://www.codefactor.io/repository/github/staydistributed/binding-blocks/badge)](https://www.codefactor.io/repository/github/staydistributed/binding-blocks)
[![Bettercodehub](https://bettercodehub.com/edge/badge/StayDistributed/binding-blocks?branch=master)](https://bettercodehub.com/)
[![Discord](https://img.shields.io/discord/699514717768515645)](https://discord.gg/q4vx7ej)

Create components with easy and declarative data binding

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

Manage state of small applications, bind your components to any JSON-like data structure.

```jsx
import { Binding, Value } from '../src';

const someData = {
  title: 'Binding Blocks',
  subtitle: 'easy and declarative data bindings'
};

<Binding data={someData}>
  <h1><Value name="title" /></h1>
  <h3><Value name="subtitle" /></h3>
</Binding>;
```

---

### Hello world

Suppose you have a data-structure like this

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

...and you want to build a component that renders city/country:

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

You can reuse that component, and values will be based on where it is inserted in the hierarchy:

```jsx static
import { Binding, ForEach } from 'binding-blocks';
import Place from './components/Place';
import data from './data/cities';

<Binding data={data}>

  <Binding name="currentLocation">
    <Place />
  </Binding>

  <ForEach name="last3VisitedCities">
    <Place />
  </ForEach>

</Binding>
```

#### This is the result:

```js
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

---

### Arrays, Objects, Strings, Numbers, Booleans ...

Supports any data types, with any levels

```js static
const data = {
  firstName: 'Michele',
  age: 36,
  location: {
    city: 'Milan',
    country: 'Italy'
  },
  skills: [
    'react',
    'design-patterns'
  ],
};
```

Declarative components:

```jsx static
<Binding data={data}>
  <th>First Name:</th>
  <td><Value name="firstName" /></td>

  <th>Age:</th>
  <td><Value name="age" /></td>

  <th>Location:</th>
  <td>
    <Binding name="location">
      <div>City: <Value name="city" /></div>
      <div>Country: <Value name="country" /></div>
    </Binding>
  </td>

  <th>Skills:</th>
  <td>
    <ForEach name="skills">
      <li><Value /></li>
    </ForEach>
  </td>
</Binding>
```
#### This is the result:

```js
import { Binding, Value, ForEach } from '../src';

const data = {
  firstName: 'Michele',
  age: 36,
  location: {
    city: 'Milan',
    country: 'Italy'
  },
  skills: [
    'react',
    'design-patterns'
  ],
};

<Binding data={data}>
  <table class="table"><tbody>
    <tr>
      <th>First Name:</th>
      <td><Value name="firstName" /></td>
    </tr>
    <tr>
      <th>Age:</th>
      <td><Value name="age" /></td>
    </tr>
    <tr>
      <th>Location:</th>
      <td>
        <Binding name="location">
          <div>City: <Value name="city" /></div>
          <div>Country: <Value name="country" /></div>
        </Binding>
      </td>
    </tr>
    <tr>
      <th>Skills:</th>
      <td>
        <ForEach name="skills">
          <li><Value /></li>
        </ForEach>
      </td>
    </tr>
  </tbody></table>
</Binding>
```

