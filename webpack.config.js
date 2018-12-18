'use strict'

const webpack = require('webpack')

module.exports = (env, options) => {
  const {mode = 'production'} = options

  return {
    entry: [
      'whatwg-fetch',
      './components/App.jsx'
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
          test: /\.(js|jsx)$/
        }
      ]
    },
    devtool: mode === 'development' ? 'source-map' : false,
    devServer: {
      port: 9010,
      proxy: {
        "/.netlify": {
          target: "http://localhost:9000",
          pathRewrite: { "^/.netlify/functions": "" }
        }
      }
    },
    plugins: mode === 'production' ? [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ] : []
  }
}
