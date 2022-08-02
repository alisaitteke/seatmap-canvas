const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const context = path.resolve(__dirname, '../src');

const PACKAGE = require(path.resolve(__dirname, '../package.json'));
const version = PACKAGE.version;

module.exports = {
    mode: "production",
    context: context,
    entry: {
        "seatmap.canvas": path.resolve(context, 'lib', 'canvas.index.ts')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: `[name].${version}.js`,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `[name].${version}.css`,
            chunkFilename: "[id].css"
        })
    ],
};