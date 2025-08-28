// rollup.config.mjs (version CommonJS)
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { terser } from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.js",
    output: [
      { file: "dist/index.js", format: "cjs" },
      { file: "dist/index.esm.js", format: "esm" },
      { file: "dist/index.min.js", format: "cjs" }
    ],
    external: ["react", "react-dom"],
    plugins: [
      resolve({ extensions: [".js", ".jsx"] }),
      babel({ babelHelpers: "bundled" }),
      postcss(),
      terser()
    ]
  },
  {
    input: "src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: ["react", "react-dom"]
  }
];