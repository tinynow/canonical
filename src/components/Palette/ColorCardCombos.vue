<template>
<ul class="reset-list canon-swatch__combos">
    <li
        v-for="{ index } in combos"
        :key="index"
        class="flex canon-u-type--2 pt2"
    >
        <div
            class="pa1 flex items-center shadow-1"
            :style="{ backgroundColor: color }"
        >
            <div
                class="canon-swatch --small"
                :style="{ backgroundColor: colorMatrix[index].value }"
            />
        </div>
                    
        <div class="pl2">
            <span class="db ffheading">{{ colorMatrix[index].name }}</span>
            <span class="db canon-u-type--sm">{{ colorMatrix[index].value }}</span>
        </div>
    </li>
</ul>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('colorTool');

export default {
    name: 'CanonColorCardCombos',
    props: {
        combos: {
            type: Array,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters([
            'colorMatrix',
        ]),
    },
}
</script>

<style lang="scss">
.canon-swatch__combos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(12rem, 1fr) );
}
</style>