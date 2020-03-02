import { configure } from '@storybook/vue';
import Vue from 'vue';
import { addDecorator } from '@storybook/vue';

const requireComponent = require.context('../src', true, /.vue$/);

requireComponent.keys().forEach(filename => {
    const componentConfig = requireComponent(filename);
    const componentName = `Canon${filename.split('/').pop().replace(/\.\w+$/, '')}`;
    Vue.component(componentName, componentConfig.default || componentConfig);
})

const decoratorVueTemplate = () => {
    return {
        template: `<div class="canon-preview__container pa3"><story/></div>`
    }
};
addDecorator(decoratorVueTemplate);
