import webpack from 'webpack'
import path from 'path'

/**
 * 是否是开发环境
 * @returns boolean
 */
function getIsDev() {
  const NODE_ENV = process.env.NODE_ENV
  let isDev = true
  if (NODE_ENV) isDev = NODE_ENV === 'development'
  return isDev
}
export const isDev = getIsDev()

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-cheap-module-source-map' : false,
  entry: {},
  output: {
    clean: true,
    path: path.resolve('./dist'),
    library: {
      type: 'umd',
    },
    globalObject: 'this',
  },
  externals: {},
  resolve: {
    alias: {
      '@': path.resolve('./src/'),
    },
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: true,
            },
          },
        ],
      },
    ],
  },
}

export default config
