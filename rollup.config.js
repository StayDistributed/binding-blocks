import React from "react";
import ReactDom from "react-dom";
import pkg from "./package.json";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "rollup-plugin-babel";
import replace from "@rollup/plugin-replace";
import html from "@rollup/plugin-html";
import serve from "rollup-plugin-serve";

const libPlugins = [
  resolve(),
  commonjs({
    include: "node_modules/**",
    namedExports: {
      react: Object.keys(React),
      "react-dom": Object.keys(ReactDom),
    },
  }),
  typescript(),
  babel({
    exclude: "node_modules/**", // only transpile our source code
  }),
  replace({
    "process.env.NODE_ENV": process.env.NODE_ENV,
  }),
];

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.browser,
        format: "umd",
        name: "RDB",
        globals: {
          react: "React",
        },
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: libPlugins,
    external: ["react"],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: "dist/types",
        emitDeclarationOnly: true,
        importsNotUsedAsValues: "preserve",
      }),
    ],
    external: ["react"],
  },
  {
    input: "demo/index.tsx",
    output: {
      dir: "output",
      format: "es",
    },
    plugins: [
      ...libPlugins,
      html(),
      serve({
        open: true,
        openPage: "/",
        contentBase: ["output"],
      }),
    ],
  },
];
