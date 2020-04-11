module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "country-region",
      externals: {
        react: "React"
      }
    }
  },
  webpack: {
    rules: {
      "sass-css": {
        modules: true,
        localIdentName: "[name]__[local]__[hash:base64:5]"
      }
    }
  }
};
