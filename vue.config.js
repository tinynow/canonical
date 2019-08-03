const path = require('path');

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => {
            return addStyleResource(config.module.rule('scss').oneOf(type));
        });
    },
    css: {
        sourceMap: true,
    },
    pluginOptions: {},
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, './src/styles/configuration.scss'),
            ],
        });
}
