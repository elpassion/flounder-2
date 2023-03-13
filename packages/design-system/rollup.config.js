import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./rollup-package.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    }
  ],
  plugins: [
    peerDepsExternal({
      includeDependencies: true
    }),
    resolve(),
    json(),
    typescript({
      exclude: ["**/stories/**", "./setupTests.ts"],
      clean: true,
    }),
    commonjs(),
    terser()
  ]
};
