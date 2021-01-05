<template>
<button
    class="canon-button"
    :class="`--button-size-${size}`"
    v-bind="$attrs"
    v-on="$listeners"
>
    <slot />
</button>
</template>

<script>
export default {
    name: 'CanonButton',
    inheritAttrs: false,
    props: {
        size: {
            type: String,
            default: 'md',
        },
    },
};
</script>
<style lang="scss">
@import './button.scss';
</style>