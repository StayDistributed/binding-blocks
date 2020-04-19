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
          name: "Hello World",
          content: "demo/HelloWorld.md",
        },
      ],
    },
    {
      name: "Supported data types",
      content: "demo/SupportedDataTypes.md",
      sections: [
        {
          name: "Strings and Numbers",
          content: "demo/DataTypes.1.md",
        },
        {
          name: "Objects",
          content: "demo/DataTypes.2.md",
        },
        {
          name: "Arrays",
          content: "demo/DataTypes.3.md",
        },
        {
          name: "Mixed",
          content: "demo/DataTypes.4.md",
        },
      ],
    },
    {
      name: "Store",
      content: "demo/Store.md",
      exampleMode: "expand",
    },
    {
      name: "Form",
      content: "demo/Form.md",
      sections: [
        {
          name: "Tables",
          content: "demo/Form.Table.md",
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
