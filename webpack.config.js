const path = require('path')
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'content.js')],
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
  },
  plugins: [
    new Dotenv({ systemvars: true })
  ],
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  }
}
