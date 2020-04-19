Supports any data types, with any levels

```js static
const data = {
  // string
  firstName: 'Michele',

  // number
  age: 36,

  // object
  location: {
    city: 'Milan',
    country: 'Italy'
  },

  // array of strings
  skills: [
    'react',
    'design-patterns'
  ],

  // array of numbers
  luckyNumbers: [
    23,
    84
  ],

  // array of objects
  favoriteCities: [{
    city: 'Milan',
    country: 'Italy'
  }, {
    city: 'San Francisco',
    country: 'US'
  }],

  // any other combination (up to N levels)
  favoriteLiveShows: [{
    name: 'Live Aid',
    year: 1985,
    location: {
      city: 'London',
      country: 'UK'
    }
  }, {
    name: 'Pinkpop Festival',
    year: 1993,
    location: {
      city: 'Landgraaf',
      country: 'NL'
    }
  }]
};
```

## No wiring props

Using only exported components we can bind them to every node of the data structure.

### Strings and Numbers

```jsx static
<Binding data={data}>
  <th>First Name:</th>
  <td><Value name="firstName" /></td>

  <th>Age:</th>
  <td><Value name="age" /></td>
</Binding>
```

```jsx
import { Binding, Value } from '../src';

const data = {
  firstName: 'Michele',
  age: 36,
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
  </tbody></table>
</Binding>
```

### Objects

```jsx static
<Binding data={data}>
  <th>Location:</th>
  <td>
    <Binding name="location">
      <div>City: <Value name="city" /></div>
      <div>Country: <Value name="country" /></div>
    </Binding>
  </td>
</Binding>
```

```jsx
import { Binding, Value } from '../src';

const data = {
  location: {
    city: 'Milan',
    country: 'Italy'
  },
};

<Binding data={data}>
  <table class="table"><tbody>
    <tr>
      <th>Location:</th>
      <td>
        <Binding name="location">
          <div>City: <Value name="city" /></div>
          <div>Country: <Value name="country" /></div>
        </Binding>
      </td>
    </tr>
  </tbody></table>
</Binding>
```

### Arrays

```jsx static
<Binding data={data}>
  <th>Skills:</th>
  <td>
    <ForEach name="skills">
      <li><Value /></li>
    </ForEach>
  </td>

  <th>Lucky numbers:</th>
  <td>
    <ForEach name="luckyNumbers">
      <div><Value /></div>
    </ForEach>
  </td>
</Binding>
```

```jsx
import { Binding, Value, ForEach } from '../src';

const data = {
  skills: [
    'react',
    'design-patterns'
  ],
  luckyNumbers: [
    23,
    84
  ],
};

<Binding data={data}>
  <table class="table"><tbody>
    <tr>
      <th>Skills:</th>
      <td>
        <ForEach name="skills">
          <li><Value /></li>
        </ForEach>
      </td>
    </tr>
    <tr>
      <th>Lucky numbers:</th>
      <td>
        <ForEach name="luckyNumbers">
          <div><Value /></div>
        </ForEach>
      </td>
    </tr>
  </tbody></table>
</Binding>
```

### Any other combination ?

```jsx static
<Binding data={data}>
  <th>Favorite cities:</th>
  <td>
    <ForEach name="favoriteCities">
      <div><Value name="city" /> - (<Value name="country" />)</div>
    </ForEach>
  </td>
  
  <th>Favorite live shows:</th>
  <td>
    <table>
      <ForEach name="favoriteLiveShows">
        <tr>
          <td><Value name="name" /></td>
          <td><Value name="year" /></td>
          <td>
            <Binding name="location">
              <div>City: <Value name="city" /></div>
              <div>Country: <Value name="country" /></div>
            </Binding>
          </td>
        </tr>
      </ForEach>
    </table>
  </td>
</Binding>
```

```jsx
import { Binding, Value, ForEach } from '../src';

const data = {
  // array of objects
  favoriteCities: [{
    city: 'Milan',
    country: 'Italy'
  }, {
    city: 'San Francisco',
    country: 'US'
  }],

  favoriteLiveShows: [{
    name: 'Live Aid',
    year: 1985,
    location: {
      city: 'London',
      country: 'UK'
    }
  }, {
    name: 'Pinkpop Festival',
    year: 1993,
    location: {
      city: 'Landgraaf',
      country: 'NL'
    }
  }]
};

<Binding data={data}>
  <table class="table"><tbody>
    <tr>
      <th>Favorite cities:</th>
      <td>
        <ForEach name="favoriteCities">
          <div><Value name="city" /> - (<Value name="country" />)</div>
        </ForEach>
      </td>
    </tr>
    <tr>
      <th>Favorite live shows:</th>
      <td>
        <table class="table"><tbody>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Location</th>
          </tr>
          <ForEach name="favoriteLiveShows">
            <tr>
              <td><Value name="name" /></td>
              <td><Value name="year" /></td>
              <td>
                <Binding name="location">
                  <div>City: <Value name="city" /></div>
                  <div>Country: <Value name="country" /></div>
                </Binding>
              </td>
            </tr>
          </ForEach>
        </tbody></table>
      </td>
    </tr>
  </tbody></table>
</Binding>
```

