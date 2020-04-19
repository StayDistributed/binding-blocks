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
