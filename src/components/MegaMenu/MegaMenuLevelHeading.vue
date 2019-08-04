<template>
<div class="cannon-c-mega-menu__heading flex items-stretch">
    <button
        :aria-label="`Back to level ${level - 1}`"
        class="canon-c-mega-menu__back-button"
        @click="$emit('click')"
    >
        <canon-icon icon-name="arrow-left" />
    </button>
    <div class="canon-c-mega-menu__heading-content flex items-center pl2">
        <slot>
            <span aria-hidden="true">{{ label }}</span>
        </slot>
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
        label: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style></style>
