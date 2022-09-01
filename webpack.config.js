module.exports = {
    entry: {
        bundle: "./src/app.ts"
    },
    output: {
        path: `${__dirname}/public/dist`,
        filename: "[name].js"
    },
    mode: "development",
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    }
}
