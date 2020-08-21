<template>
<component
    :is="containerElement"
    class="canon-prose"
>
    <slot />
</component>
</template>

<script>
export default {
    name: 'CanonProse',
    props: {
        containerElement: {
            type: String,
            default: 'div',
            validator(val) {
                return ['main', 'div', 'article', 'section'].includes(val);
            },
        },
    },
};
</script>

<style lang="scss">
.canon-prose {
}
</style>
