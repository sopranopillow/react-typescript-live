const { webpackConfig, webpackMerge } = require('just-scripts');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = webpackMerge({
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new MonacoWebpackPlugin({
            languages:['typescript']
        })
    ]
},webpackConfig);


module.exports = webpackConfig;