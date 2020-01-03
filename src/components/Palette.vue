<template>
<div>
    <ul class="reset-list flex content-stretch">
        <li
            v-for="(value, name) in colors"
            :key="name"
            :color="value"
            class="canon-palette__key db pv3 flex-grow-1"
            :style="{ 'backgroundColor': value }"
        >
            <span class="visually-hidden">{{ name }}</span>
        </li>
    </ul>
    <canon-swatch
        v-for="(value, name) in colors"
        :id="name"
        :key="name"
        :color="value"
        :name="name"
    />
</div>
</template>

<script>
import colors from '../styles/00_settings/defaults.scss';
import CanonSwatch from './PaletteSwatch';

export default {
    name: 'CanonPalette',
    components: {
        CanonSwatch,
    },
    // props: {
    //     colors: {
    //         type: Object,
    //         required: true,
    //     },
    // },
    data() {
        return {
            colors: colors,
        }
    },
};
</script>

<style  scoped>
</style>
