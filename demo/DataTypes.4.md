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

