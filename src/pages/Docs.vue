<template>
<div
    class="canon-layout"
    :class="classes"
>
    <h1>
        Typography and Layout
    </h1>
    <p>Canonical is a typography first framework. Layout and whitespace measurements are derived from typographical choices. In particular, the computed height of a line of default body text forms the base unit for a modular scale. For this and other reasons, it's best to think about spacing, layout as interrelated parts of the same system.</p>
    <p>To provide a balance between smart defaults and flexibility, developers can change the appearance, spacing, and behavior of text and layout through several features &mdash; <a href="#contexts">contexts</a>, <a href="#utilities">utilities</a>, and <a href="settings">settings</a>.</p>
    
    <h2>
        Contexts
        <canon-anchor-link id="contexts" />
    </h2>
    <p>Contexts are classes that when applied to a containing element take advantage of the cascade in CSS to apply harmonious styles to the elements within. They are a way to "set it and forget it" and not worry about twiddling. Contexts handle common layout and typography needs.</p>
    <p>For example the classes <code>canon-layout --auto-flow --tube --readable</code> determine the layout and type styles of this page.</p>
    <form class="canon-form">
        <canon-checkbox-list
            id="changeLayout"
            :options="options"
        >
            <span slot="legend">Toggle the layout contexts applied to this page</span>
            <p slot="hint">
                Be aware that the page will jump.
            </p>
        </canon-checkbox-list>
    </form>  



    <h2>
        Tuning typography settings
        <canon-anchor-link id="settings" />
    </h2>
    <p>The default font stack and typography CSS rules are preoptimized to use the highly performant system font stack. This is a great choice for many reasons, but doesn't provide a personality or indicate the character of your brand. It also looks slightly differently depending on the system it is viewed on. In order to provide some freedom of expression, but also preserve a typography system and utilities that produce a readable and harmonious text without extra CSS tweaking, Canonical provides typography configuration options.</p>
</div>
</template>

<script>
import CanonAnchorLink from '../components/AnchorLink';
// import CanonCodeSnippet from '../components/CodeSnippet';
import CanonCheckboxList from '../components/Checkbox/CheckboxList';
export default {
    name: 'DocsPage',
    components: {
        CanonAnchorLink,
        // CanonCodeSnippet,
        CanonCheckboxList,
    },
    data() {
        return {
            options: [
                {
                    value: '--auto-flow',
                    label: '--auto-flow',
                    checked: true,
                },
                {
                    value: '--tube',
                    label: '--tube',
                    checked: true,
                },
                {
                    value: '--readable',
                    label: '--readable',
                    checked: true,
                },

            ],
        }
    },
    computed: {
        classes() {
            return this.options.filter(opt => opt.checked).map(opt => opt.value);
        },
    },
    methods: {
        log(e) {
            console.log(e);
        },
    },
};
</script>
