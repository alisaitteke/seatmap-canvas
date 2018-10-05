var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: path.resolve(__dirname, '../src', "lib", "index.ts"),
    output: {
        filename: 'seatmap.canvas.js',
        publicPath: "/build/",
        path: path.resolve(__dirname, '../build')
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
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    watch: true,
    watchOptions: {
        ignored: ['src/**/*.js', 'node_modules', 'dist', 'examples']
    },
    devServer: {
        contentBase: path.join(__dirname, '../examples'),
        compress: true,
        port: 1967
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "seatmap.canvas.css",
            chunkFilename: "[id].css"
        })
    ],

};