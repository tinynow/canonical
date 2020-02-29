const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need
        config.module.rules.push({
            test: /\.scss$/,
            use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });


        // Return the altered config
        return config;
    },
};


// module.exports = {
//     chainWebpack: config => {
//         const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
//         types.forEach(type => {
//             return addStyleResource(config.module.rule('scss').oneOf(type));
//         });
//     },
//     css: {
//         sourceMap: true,
//         loaderOptions: {
//             scss: {
//                 prependData: `@import "@/styles/configuration.scss";`,
//             },
//         },
//     },
//     pluginOptions: {},
// };

// function addStyleResource(rule) {
//     rule.use('style-resource')
//         .loader('style-resources-loader')
//         .options({
//             patterns: [
//                 path.resolve(__dirname, './src/styles/global.scss'),
//             ],
//         });
// }
