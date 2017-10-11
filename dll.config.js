const webpack = require('webpack');
var path = require("path");
const vendors = [
    // "./src/testDll",
    'react',
    'react-dom',
    'react-router',
    'redux', 'react-redux', 'redux-thunk',
    "isomorphic-fetch",
    "react-addons-linked-state-mixin",
    "react-addons-css-transition-group",
    "react-bootstrap"
    // ...其它库
];

module.exports = {
    output: {
        path: path.join(__dirname,"src/lib"),
        filename: 'dll.js',
        // libraryTarget: "var",
        library: '[name]',
    },
    entry: {
        "vendors": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]',
            path: path.join(__dirname,'src/lib/manifest.json')
        }),
    ],
};