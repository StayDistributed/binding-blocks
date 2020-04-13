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
      name: "Binding Blocks",
      content: "demo/README.md",
    },
    {
      name: "Form",
      content: "demo/Form.md",
    },
  ],
  pagePerSection: true,

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
