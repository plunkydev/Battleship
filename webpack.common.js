const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        fallback: {
            path: false,
            fs: false,
            os: false,
            util: false,
            https: false,
            http: false,
            crypto: false,
            stream: false,
            zlib: false,
            vm: false,
            buffer: false,
            url: false,
            assert: false,
            constants: false,
            child_process: false,
            worker_threads: false,
            module: false,
            querystring: false,
            'uglify-js': false,
            '@swc/core': false,
            esbuild: false,
            inspector: false
        }
    }
}