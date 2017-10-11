const webpack = require('webpack');
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname,"../");

// 读取同一目录下的 base config
var config = require('./webpack.base.config');

config.module.rules.push(
  // {
  //   test: /\.less$/,
  //   use: ExtractTextPlugin.extract(
  //     {
  //       use: [
  //         'css-loader',
  //         'less-loader'
  //       ],
  //       fallback: 'style-loader'
  //     }
  //   ),
  //   exclude: /node_modules/
  // }
);
//-----------  css start
config.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: "css-loader"
    })
  }
);
config.plugins.push(
  new ExtractTextPlugin({
    filename: "css/[name]-[contenthash].css"
  })
)
//---------------css end
config.plugins.push(
   new webpack.DllReferencePlugin({
            context: ROOT_PATH,
            manifest: require(ROOT_PATH + "/src/lib/manifest.json"),
            // name: "vendors",
            // scope: "xyz",
            // sourceType: "var"
  }),
  // 官方文档推荐使用下面的插件确保 NODE_ENV
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }),

  // 启动 minify
  new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false
      }
  })
);

config.externals =  {
    // d3: 'd3'
}
config.devtool = 'eval';
const PUBLIC_PATH = "/dist/";
config.output.publicPath = PUBLIC_PATH;

config.plugins.push(
  new HtmlwebpackPlugin({
    filename: 'index.html',
    chunks: [ 'index'],
    chunksSortMode : function(){return 1},//"auto",
    template: "app.html",
    minify:  false ,
    dlljs: PUBLIC_PATH + "js/dll.js"
  })
)
module.exports = config;