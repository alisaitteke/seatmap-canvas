var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const bourbon = require("bourbon").includePaths;

module.exports = {
    mode: "production",
    entry: {
        "main": path.resolve(__dirname, '../src', "lib", "canvas.index.ts")
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'seatmap.canvas.js',
    },

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: "ts-loader"},
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader", options: {
                        sourceMap: false
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: false,
                        includePaths: bourbon
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "seatmap.canvas.css",
            chunkFilename: "[id].css"
        })
    ],
    watch: false
};