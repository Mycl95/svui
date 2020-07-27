const path = require("path");
const sveltePreprocess = require("svelte-preprocess");

module.exports = ({ config, mode }) => {
  const svelteLoader = config.module.rules.find(
    (r) => r.loader && r.loader.includes("svelte-loader")
  );
  svelteLoader.options = {
    ...svelteLoader.options,
    emitCss: true,
    hotReload: false,
    preprocess: sveltePreprocess({
      postcss: true,
    }),
  };

  config.module.rules.push(
    {
      test: /\.ts$/,
      use: "ts-loader",
    },
    {
      test: /\.css$/,
      loaders: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
          },
        },
      ],
    }
  );

  config.resolve.extensions.push(".ts");

  return config;
};
