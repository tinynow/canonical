<template>
<svg
    viewBox="0 0 24 24"
    :fill="iconFill"
    :stroke-width="strokeWidth"
    :stroke-linecap="sharp ? 'miter' : 'round'"
    :stroke-linejoin="sharp ? 'butt' : 'round'"
    :aria-hidden="!announceName"
    :aria-labelledby="announceName ? iconName : null"
>
    <title
        :id="iconName"
        lang="en"
    >{{ iconName }} icon</title>
    <g :stroke="iconStroke">
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
            default: 'box',
        },
        iconStroke: {
            type: String,
            default: 'currentColor',
        },
        iconFill: {
            type: String,
            default: 'none',
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
    },
    computed: {
        icon() {
            return () => import(`./Icons/${this.iconName}`);
        },
        strokeWidth() {
            return this.fat ? '4' : '2';
        },
    },
};
</script>

<style></style>
