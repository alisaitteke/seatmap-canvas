import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import {terser} from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import serve from 'rollup-plugin-serve'
import scss from 'rollup-plugin-scss'
import livereload from 'rollup-plugin-livereload'
import {cleandir} from "rollup-plugin-cleandir";

const packageJson = require("./package.json");

export default commandLineArgs => {
    let config = [
        {
            input: "src/lib/canvas.index.ts",
            output: [
                {
                    file: packageJson.main,
                    format: "iife",
                    sourcemap: true
                }
            ],
            plugins: [
                cleandir(),
                scss({
                    verbose: true
                }),
                peerDepsExternal(),
                resolve(),
                commonjs(),
                typescript({tsconfig: "./tsconfig.json"}),
                terser()
            ],
            external: [],
        },
        {
            input: "src/lib/canvas.index.ts",
            output: [
                {
                    file: packageJson.module,
                    format: "esm",
                    sourcemap: true
                },
            ],
            plugins: [
                cleandir(),
                scss({
                    verbose: true
                }),
                peerDepsExternal(),
                resolve(),
                commonjs(),
                typescript({tsconfig: "./tsconfig.json"}),
                terser()
            ],
            external: [],
        },
        {
            input: "src/lib/canvas.index.ts",
            output: [{file: "dist/types.d.ts", format: "es"}],
            plugins: [scss(), dts.default()],
        },
    ];
    if (!commandLineArgs.prod) {
        config[0].plugins.push(livereload())
        config[0].plugins.push(serve({
            openPage: '/index.html',
            contentBase: ['dist', 'examples', 'src'],
            port: 3002,
        }))
    }
    return config;
}