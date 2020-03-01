const custom = require('@vue/cli-service/webpack.config');

module.exports = {
    stories: ['../src/**/*.stories.js'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
    webpackFinal: (config) => {
        return { ...config, module: { ...config.module, rules: custom.module.rules } };
    },
};
