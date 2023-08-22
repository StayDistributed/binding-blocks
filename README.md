# Binding Blocks

React 2-way data binding to easily manage complex forms and data structures.

[![npm package][npm-badge]][npm]
[![Travis][build-badge]][build]
[![Coveralls][coveralls-badge]][coveralls]
[![CodeFactor][codefactor-badge]][codefactor]
[![Discord][discord-badge]][discord]

[npm-badge]: https://img.shields.io/npm/v/binding-blocks.svg
[npm]: https://www.npmjs.org/package/binding-blocks
[build-badge]: https://travis-ci.com/staydistributed/binding-blocks.svg?branch=master
[build]: https://app.travis-ci.com/staydistributed/binding-blocks
[coveralls-badge]: https://coveralls.io/repos/github/StayDistributed/binding-blocks/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/StayDistributed/binding-blocks?branch=master
[codefactor-badge]: https://www.codefactor.io/repository/github/staydistributed/binding-blocks/badge
[codefactor]: https://www.codefactor.io/repository/github/staydistributed/binding-blocks
[discord-badge]: https://img.shields.io/discord/699514717768515645
[discord]: https://discord.gg/q4vx7ej

---

## Install

```bash
$ npm i binding-blocks
```

## Usage

```jsx
import { Binding, Value } from 'binding-blocks';

const someData = {
  title: 'Hello',
  subtitle: 'World!'
};

const HelloWorld = () => {
  return (
    <Binding data={someData}>
      <h1><Value name="title" /></h1>
      <h3><Value name="subtitle" /></h3>
    </Binding>
  );
}
```

## Docs

**To start data binding with React, visit [https://staydistributed.github.io/binding-blocks/](https://staydistributed.github.io/binding-blocks/)**
