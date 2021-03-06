// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
// подключаем path к конфигу вебпак

module.exports = {
    entry: {
        main: './src/pages/index/index.js',
        about: './src/pages/about/about-project.js',
        analytics: './src/pages/analytics/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pages/[name]/[name].[chunkhash].js'
    },
    module: {
        rules: [{ // тут описываются правила
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                exclude: /node_modules/, // исключает папку node_modules
                use: { loader: 'babel-loader' } // весь JS обрабатывается пакетом babel-loader
            },
            {
              test: /\.css$/i,
              use: [
                  (isDev ? 'style-loader' : 
                  {
                  loader: MiniCssExtractPlugin.loader,
                      options: {
                          publicPath: '../../',
                      }
                  }),
                  'css-loader', 
                  'postcss-loader'
              ] // добавили минификацию CSS
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            },
            {
                test: /\.(png|jpg|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ // 
            filename: 'pages/[name]/[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/pages/index/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/pages/about/about-project.html',
            filename: 'about-project.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/pages/analytics/analytics.html',
            filename: 'analytics.html'
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new WebpackMd5Hash()
    ]
};