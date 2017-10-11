const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
// 读取同一目录下的 base config
const config = require('./webpack.base.config');
const PUBLIC_PATH = "/dist/"
config.output.publicPath = PUBLIC_PATH;

// 添加 webpack-dev-server 相关的配置项
config.devServer = {
  contentBase: './',
  hot: true,
  publicPath: PUBLIC_PATH
};

// 有关 Webpack 的 API 本地代理，另请参考 https://webpack.github.io/docs/webpack-dev-server.html#proxy
config.module.rules.push(
    {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      'less-loader'
    ],
    exclude: /node_modules/
    }
);
config.module.rules.push(
    {
    test: /\.css$/,
    use: [
        {
            loader: "style-loader",
        },
        {
            loader: 'css-loader', options: { importLoaders: 1}
        }
    ],
    exclude: /node_modules/
    }
);
// 真实场景中，React、jQuery 等优先走全站的 CDN，所以要放在 externals 中
// config.externals = {
//   react: 'React',
//   'react-dom': 'ReactDOM'
// };
// 添加 Sourcemap 支持
config.plugins.push(
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: ['vendor.js'] // vendor 通常不需要 sourcemap
    })
)
// Hot module replacement

Object.keys(config.entry).forEach((key) => {

  // 这里有一个私有的约定，如果 entry 是一个数组，则证明它需要被 hot module replace
  if (Array.isArray(config.entry[key])) {
    config.entry[key].unshift(
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server'
    );
  }
});

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);
config.plugins.push(
    new HtmlwebpackPlugin({
      filename: 'index.html',
      chunks: [ 'index'],
      chunksSortMode : function(){return 1},//"auto",
      template: "app.html",
      minify:  false ,
      dlljs: ""
    })
  )
module.exports = config;