const custom = require('../node_modules/@vue/cli-service/webpack.config');

module.exports = {
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
    webpackFinal: (config) => {
        return { ...config, module: { ...config.module, rules: custom.module.rules } };
    },
};
