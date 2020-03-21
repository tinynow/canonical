<template>
<button
    class="canon-button"
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
};
</script>
<style lang="scss">
@import './button.scss';
</style>