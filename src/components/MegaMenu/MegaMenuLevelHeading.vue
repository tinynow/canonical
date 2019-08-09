<template>
<div class="canon-c-mega-menu__heading flex items-stretch">
    <button
        :aria-label="level === 1 ? 'Close Menu' : `Back to level ${level - 1}`"
        class="canon-c-mega-menu__back-button"
        @click="$emit('click')"
    >
        <canon-icon :icon-name="level === 1 ? 'x' : 'arrow-left'" />
    </button>
    <div class="canon-c-mega-menu__heading-content flex items-center pl2 pv1">
        <slot />
    </div>
</div>
</template>

<script>
import CanonIcon from '../Icon/Icon';
export default {
    name: 'CanonMegaMenuLevelHeading',
    components: {
        CanonIcon,
    },
    props: {
        level: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style></style>
