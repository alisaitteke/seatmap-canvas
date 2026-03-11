import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import serve from 'rollup-plugin-serve'
import scss from 'rollup-plugin-scss'
import livereload from 'rollup-plugin-livereload'
import {cleandir} from "rollup-plugin-cleandir";
import path from 'path'

const license = require('rollup-plugin-license');
const packageJson = require("./package.json");

export default commandLineArgs => {
    const isProduction = process.env.PRODUCTION;
    
    let config = [
        {
            input: "src/lib/canvas.index.browser.ts",
            output: [
                {
                    file: packageJson.main,
                    format: "iife",
                    sourcemap: true,
                    name: 'SeatmapCanvas'
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
                typescript({tsconfig: "./tsconfig.rollup.json"}),
                ...(isProduction ? [
                    terser(),
                    license({
                        sourcemap: true,
                        cwd: process.cwd(),
                        banner: {
                            commentStyle: 'regular',
                            content: {
                                file: path.join(__dirname, 'LICENSE'),
                                encoding: 'utf-8',
                            },
                            data() {
                                return {
                                    foo: 'foo',
                                };
                            },
                        },
                        thirdParty: {
                            includePrivate: true,
                            multipleVersions: true,
                            output: {
                                file: path.join(__dirname, 'dist', 'dependencies.txt'),
                                encoding: 'utf-8',
                            },
                        },
                    })
                ] : []),
            ],
            external: [],
        },
        {
            input: "src/lib/canvas.index.ts",
            output: [
                {
                    file: packageJson.module,
                    format: "esm",
                    sourcemap: true,
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
                typescript({tsconfig: "./tsconfig.rollup.json"}),
                ...(isProduction ? [terser()] : [])
            ],
            external: [],
        },
        {
            input: "src/lib/canvas.index.ts",
            output: [{
                file: "dist/types.d.ts",
                format: "es"
            }],
            external: [/\.scss$/],
            plugins: [scss(), dts.default()],
        },
    ];
    if (!isProduction) {
        config[0].plugins.push(livereload())
        config[0].plugins.push(serve({
            openPage: '/index.html',
            contentBase: ['examples', 'dist', 'src', 'assets'],
            port: 3002,
        }))
    }
    return config;
}
