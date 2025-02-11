import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

export default {
    input: "src/index.js",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
        },
    ],
    external: ["react", "react-dom"],
    plugins: [
        resolve(),
        babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
    ],
};
