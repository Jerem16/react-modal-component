import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";

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
        {
            file: "dist/index.min.js",
            format: "cjs",
            plugins: [terser()],
        },
    ],
    external: ["react", "react-dom"],
    plugins: [
        resolve({
            extensions: [".js", ".jsx"], // <---- Ajoute ça pour que Rollup reconnaisse les fichiers .jsx
        }),
        babel({ babelHelpers: "bundled" }),
        postcss(),
        terser(),
    ],
};
