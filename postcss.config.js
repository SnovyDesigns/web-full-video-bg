module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-combine-duplicated-selectors'),
    require('css-mqpacker')
  ]
};
