var path = require("path");
var webpack = require("webpack");
module.exports = {
    context : path.resolve("src"),
    entry : {
        app: "js/components/app.js"
    },
    resolve: {
        root: path.resolve(__dirname + "/src"),
        extensions: ["", ".js", ".jsx", ".json", ".scss"]
    },
    output : {
        path: path.resolve(__dirname + "/build"),
        publicPath : "/build",
        filename: "js/[name].js"
    },
    module: {
        loaders: [{
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    watch : true
};