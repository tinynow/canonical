import { configure } from '@storybook/vue';
import Vue from 'vue';
import { addDecorator } from '@storybook/vue';

const requireComponent = require.context('../src', true, /.vue$/);

requireComponent.keys().forEach(filename => {
    const componentConfig = requireComponent(filename);
    const componentName = `Canon${filename.split('/').pop()}`;
    Vue.component(componentName, componentConfig.default);
})

const decoratorVueTemplate = () => {
    return {
        template: `<div class="canon-preview__container pa3"><story/></div>`
    }
};
addDecorator(decoratorVueTemplate);

// automatically import all files ending in *.stories.js
const requireStories = require.context('../src', true, /.stories.js$/);
function loadStories() {
    console.log(requireStories.keys())
    requireStories.keys().forEach(filename => requireStories(filename));
}
configure(loadStories, module);

