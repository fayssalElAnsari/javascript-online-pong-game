const path = require('path');

module.exports = {
  entry: ['./src/scripts/Ball.js', './src/sripts/Game.js', './src/scripts/Mobile.js', './src/scripts/pong.js' ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',

    },
};



