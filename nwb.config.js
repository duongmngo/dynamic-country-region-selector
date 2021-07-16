module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "DynamicCountryRegionSelector",
      externals: {
        react: "React",
      },
    },
  },
  webpack: {
    publicPath: "https://unpkg.com/dynamic-country-region-selector@1.0.4/umd/",
    rules: {
      "sass-css": {
        modules: true,
        localIdentName: "[name]__[local]__[hash:base64:5]",
      },
    },
  },
};
