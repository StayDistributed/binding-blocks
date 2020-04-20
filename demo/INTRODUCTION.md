[![NPM](https://img.shields.io/npm/v/binding-blocks.svg)](https://www.npmjs.org/package/binding-blocks)
[![Travis CI](https://travis-ci.com/staydistributed/binding-blocks.svg?branch=master)](https://travis-ci.com/staydistributed/binding-blocks)
[![Coveralls](https://coveralls.io/repos/github/StayDistributed/binding-blocks/badge.svg?branch=master)](https://coveralls.io/github/StayDistributed/binding-blocks?branch=master)
[![Codefactor](https://www.codefactor.io/repository/github/staydistributed/binding-blocks/badge)](https://www.codefactor.io/repository/github/staydistributed/binding-blocks)
[![Bettercodehub](https://bettercodehub.com/edge/badge/StayDistributed/binding-blocks?branch=master)](https://bettercodehub.com/)
[![Discord](https://img.shields.io/discord/699514717768515645)](https://discord.gg/q4vx7ej)

Create React components with easy and declarative data binding.<br />
Manage sub-state of applications, bind your components to any JSON-like data structure.

If you need a smart `state` in a sub section of your application, and you don't want to update the whole Redux-store or any other global store you have, you can create a *local store* and handle changes and displaying with a set of binding blocks.

- Perfect for Forms (see examples)

### Install

```bash static
$ npm i binding-blocks
```

### Usage

```jsx static
import { Binding, Value } from 'binding-blocks';

const someData = {
  title: 'Binding Blocks',
  subtitle: 'Manage sub-states of your application'
};


<YourBigReduxApplication>

  <Binding data={someData}>
    <h1><Value name="title" /></h1>
    <h2><Value name="subtitle" /></h2>
  </Binding>

</YourBigReduxApplication>
```
