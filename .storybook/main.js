const custom = require('@vue/cli-service/webpack.config');
const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.(js|mdx)'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-viewport/register', 
        {
            name: '@storybook/addon-docs',
            options: {
                vueDocgenOptions: {
                    alias: {
                        '@': path.resolve(__dirname, '../'),
                    },
                },
            },
        },    
    ],
    webpackFinal: (config) => {
        config = {...config, module: { ...config.module, rules: custom.module.rules } };
        return config;
    },
};