// rollup.config.js (version CommonJS)
const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const postcss = require("rollup-plugin-postcss");
const { terser } = require("@rollup/plugin-terser");
const dts = require("rollup-plugin-dts").default;

module.exports = [
    {
        input: "src/index.js",
        output: [
            { file: "dist/index.js", format: "cjs" },
            { file: "dist/index.esm.js", format: "esm" },
            { file: "dist/index.min.js", format: "cjs" },
        ],
        external: ["react", "react-dom"],
        plugins: [
            resolve({ extensions: [".js", ".jsx"] }),
            babel({ babelHelpers: "bundled" }),
            postcss(),
            terser(),
        ],
    },
    {
        input: "src/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()],
        external: ["react", "react-dom"],
    },
];
