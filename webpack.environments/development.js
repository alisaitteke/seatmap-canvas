const path = require('path');

module.exports = {
    mode: "production",
    devtool: "inline-source-map",
    context: __dirname,
    entry: {
        "main": path.resolve(__dirname, '../src', "lib", "canvas.index.ts")
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'seatmap.canvas.js',
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "ts-loader"},
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    watch: true,
    watchOptions: {
        ignored: ['src/**/*.js', 'node_modules', 'dist', 'examples']
    },
    devServer: {
        liveReload: true,
        client: {
            reconnect: true,
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
            }
        },
        static: {
            directory: path.join(__dirname, '../examples')
        },
        open: true,
        compress: true,
        port: 1967
    },
};