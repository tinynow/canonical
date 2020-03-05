import { configure } from '@storybook/vue';
import Vue from 'vue';
import { addDecorator } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
const requireComponent = require.context('../src', true, /.vue$/);

requireComponent.keys().forEach(filename => {
    const componentConfig = requireComponent(filename);
    const componentName = `Canon${filename.split('/').pop().replace(/\.\w+$/, '')}`;
    Vue.component(componentName, componentConfig.default || componentConfig);
})

const decoratorVueTemplate = () => {
    return {
        template: `<div class="canon-preview__container canon-layout --tube pv3"><story/></div>`
    }
};
addDecorator(decoratorVueTemplate);
addDecorator(withInfo);
