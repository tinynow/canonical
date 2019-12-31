<template>
<div>
    <p>A color palette is a combination of completely subjective whims, rigid objective requirements, and general principles that are usually but not always good ides.</p>
    <ul>
        <li>Whims - I like green.</li>
        <li>Requirements - backgrounds must contrast with text, ui component, states of ui components, and graphical elements that convey meaning.</li>
        <li>General principles - a palette is generally dark with white or off-white text or light with black or dark-gray text.</li>
    </ul>

    {{ colors }}
    <canon-swatch
        v-for="(value, name) in colors"
        :id="name"
        :key="name"
        :color="value"
        :label="name"
    />
</div>
</template>

<script>
import colors from '../styles/00_settings/defaults.scss';
import CanonSwatch from './Swatch';

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
