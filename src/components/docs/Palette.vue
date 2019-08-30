<template>
<div class="canon-c-palette">
    <div
        v-for="color in colors"
        :key="color.hex"
    >
        <component :is="`h${level}`">
            {{ color.name }}
        </component>
        <span>{{ color.var }}</span>
        <span>{{ color.hsl }}</span>
        <span>{{ color.hex }}</span>

        <slot name="content" />
    </div>
</div>
</template>

<script>
import hslColors from '../../styles/colors.json';

export default {
    name: 'CanonPalette',
    props: {
        level: {
            type: Number,
            default: 2,
            validator(val) {
                if (val > 6) {
                    console.log;
                    return false;
                } else {
                    return true;
                }
            },
        },
    },
    data() {
        return {
            colors: hslColors,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>