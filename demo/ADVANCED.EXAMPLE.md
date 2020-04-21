Supports any data types, within any levels, the following is a mixed data-structure:

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

```jsx
import { Binding, Value, With, ForEach } from 'binding-blocks';
import Place from './components/Place';
import { data } from './data/advancedData';

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
        <With name="location">
          <Place />
        </With>
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
    <tr>
      <th>Lucky numbers:</th>
      <td>
        <ForEach name="luckyNumbers">
          <div><Value /></div>
        </ForEach>
      </td>
    </tr>

    <tr>
      <th>Favorite cities:</th>
      <td>
        <ForEach name="favoriteCities">
          <Place />
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
                <With name="location">
                  <Place />
                </With>
              </td>
            </tr>
          </ForEach>
        </tbody></table>
      </td>
    </tr>
  </tbody></table>
</Binding>
```

