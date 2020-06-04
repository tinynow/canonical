<template>
<ul class="reset-list canon-swatch__combos">
    <li
        v-for="{ index, contrast } in combos"
        :key="index"
        class="flex canon-u-type--2 pt2"
    >
        <div
            class="pa2 flex  shadow-1"
            :style="{ backgroundColor: colorMatrix[index].value }"
        >
            <div
                class="canon-swatch --small"
                :style="{ backgroundColor: color }"
            />
        </div>
                    
        <dl class="pl2">
            <dt class="visually-hidden">
                Name:
            </dt>
            <dd class="db ffheading">
                {{ colorMatrix[index].name }}
            </dd>
            <dt class="visually-hidden">
                CSS Value:
            </dt>
            <dd class="db canon-u-type--sm">
                {{ colorMatrix[index].value }}
            </dd>
            <dt
                v-if="showContrasts"
                class="visually-hidden"
            >
                Contrast ratio:
            </dt>
            <dd
                v-if="showContrasts"
                class="canon-u-type--sm"
            >
                ~{{ contrast.toFixed(3) }}
            </dd>
        </dl>
    </li>
</ul>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapState } = createNamespacedHelpers('colorTool');

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
        ...mapState([
            'showContrasts',
        ]),
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