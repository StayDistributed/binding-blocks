// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

const parserOptions = {};

module.exports = {
  title: "Binding Blocks",
  ribbon: {
    url: pkg.homepage,
    text: "Fork me on GitHub",
  },
  template: {
    head: {
      links: [
        {
          rel: "stylesheet",
          href:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto",
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Roboto", sans-serif',
    },
  },

  sections: [
    {
      name: "Introduction",
      content: "demo/INTRODUCTION.md",
      sections: [
        {
          name: "Basic Example",
          content: "demo/INTRO.BASIC.EXAMPLE.md",
          exampleMode: "expand",
        },
      ],
    },
    {
      name: "Blocks",
      content: "demo/BLOCKS.md",
      sections: [
        {
          name: "<Binding />",
          content: "demo/BLOCKS.BINDING.md",
          exampleMode: "expand",
        },
        {
          name: "<With />",
          content: "demo/BLOCKS.WITH.md",
          exampleMode: "expand",
        },
        {
          name: "<Value />",
          content: "demo/BLOCKS.VALUE.md",
          exampleMode: "expand",
        },
        {
          name: "<If />",
          content: "demo/BLOCKS.IF.md",
          exampleMode: "expand",
        },
        {
          name: "<ForEach />",
          content: "demo/BLOCKS.FOREACH.md",
          exampleMode: "expand",
        },
      ],
    },
    {
      name: "Store",
      content: "demo/Store.md",
      exampleMode: "expand",
    },
    {
      name: "Advanced Example",
      content: "demo/ADVANCED.EXAMPLE.md",
      exampleMode: "expand",
    },
    {
      name: "Forms",
      content: "demo/Form.md",
      exampleMode: "expand",
      sections: [
        {
          name: "Basic",
          content: "demo/Form.Basic.md",
          exampleMode: "expand",
        },
        {
          name: "Table",
          content: "demo/Form.Table.md",
          exampleMode: "expand",
        },
      ],
    },
  ],

  /**
   * configs
   */
  styleguideDir: "docs",
  webpackConfig: {
    resolve: {
      // Add ".ts" and ".tsx" as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        // All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
        { test: /\.tsx?$/, loader: "ts-loader" },
      ],
    },
  },
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
    [parserOptions]
  ).parse,
};
