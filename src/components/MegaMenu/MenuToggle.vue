<template>
    <button
        class="canon-c-mega-menu__toggle"
        :aria-expanded="ariaExpanded"
        :aria-controls="ariaControls"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'CanonMenuToggle',
    props: {
        ariaControls: {
            type: String,
            required: true,
        },
        ariaExpanded: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style></style>
