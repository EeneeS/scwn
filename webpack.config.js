const path = require('path');

module.exports = {
  entry: './src/main.js',  // Your entry file
  output: {
    filename: 'bundle.js',  // Name of the output file
    path: path.resolve(__dirname, 'dist'),
    clean: true,  // Clean the dist folder before each build
    library: 'Widget',  // The global variable name
    libraryTarget: 'umd',  // Suitable for use in various environments (like AMD, CommonJS, or as a global)
  },
  mode: 'development',  // or 'production'
};

