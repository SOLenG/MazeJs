const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            'babylonjs': path.join(__dirname, 'node_modules/babylonjs/dist/preview release/babylon.js'),
        }
    }
};
