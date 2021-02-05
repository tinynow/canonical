<template>
<svg
    :viewBox="viewBox"
    :fill="iconFill"
    :stroke-width="strokeWidth"
    :stroke-linecap="sharp ? 'miter' : 'round'"
    :stroke-linejoin="sharp ? 'butt' : 'round'"
    :aria-hidden="!announceName"
    :aria-labelledby="announceName ? iconName : null"
    :style="cssVars"
    focusable="false"
>
    <title
        :id="iconName"
        lang="en"
    >{{ iconName }} icon</title>
    <g :stroke="iconStroke">
        <slot v-bind="viewBox" />
        <component :is="icon" />
    </g>
</svg>
</template>

<script>
export default {
    name: 'CanonIcon',
    props: {
        iconName: {
            type: String,
            default: 'icon',
        },
        iconStroke: {
            type: String,
            default: 'currentColor',
        },
        iconFill: {
            type: String,
            default: 'none',
        },
        iconSize : {
            type: String,
            default: '24px',
        },
        announceName: {
            type: Boolean,
            default: false,
        },
        fat: {
            type: Boolean,
            default: false,
        },
        sharp: {
            type: Boolean,
            default: false,
        },
        viewBox: {
            type: String,
            default: '0 0 24 24',
        },
    },
    computed: {
        icon() {
            return () => import(`./Icons/${this.iconName}`);
        },
        cssVars() {
            return {
                '--width': this.iconSize,
                '--height': this.iconSize,
            };
        },
        strokeWidth() {
            return  this.fat ? '4' : '2';
        },
    },
};
</script>

<style>
svg {
    width: var(--width);
    height: var(--height);
}
</style>
