const custom = require('@vue/cli-service/webpack.config');

module.exports = {
    stories: ['../src/**/*.stories.(js|mdx)'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-viewport/register', '@storybook/addon-docs'],
    webpackFinal: (config) => {
        config.module.rules.push({
            test: /\.vue$/,
            loader: 'vue-docgen-loader',
            enforce: 'post'
        });
        return { ...config, module: { ...config.module, rules: custom.module.rules } };
    },
};