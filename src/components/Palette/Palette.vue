<template>
<div>
    <div 
        class="canon-palette__controls canon-layout --tube --readable  --spacious"
    >
        <h2>Requirements for {{ conformanceLevel }}</h2>
        <p>The following elements need minimum color contrast ratios against their background (or adjacent colors).</p>
        <ul v-if="a11yLevel === 'aa'">
            <li>Text that is 24px and larger, or 19px and larger if bold: <strong>3:1</strong>.</li>
            <li>Text that is smaller than 24px: <strong>4.5:1</strong>.</li>
            <li>Interactive UI components and essential graphical elements: <strong>3:1</strong>.</li>
        </ul>
        <ul v-if="a11yLevel === 'aaa'">
            <li>Text that is 24px and larger, or 19px and larger if bold: <strong>4.5:1</strong>.</li>
            <li>Text that is smaller than 24px: <strong>7:1</strong>.</li>
            <li>Interactive UI components and essential graphical elements: <strong>3:1</strong> </li>
        </ul>
    </div>
    <form novalidate>
        <canon-radio-button-list
            id="howAccessible"
            label="Accessiblity Level"
            :options="a11yLevelOptions"
            name="level"
            :value="a11yLevel"
            @change="e => a11yLevel = e"
        />
        <!-- <canon-checkbox
            id="showFailures"
            label="Show contrast levels"
            name="show-failures"
            :value="showFailures"
            @change="e => showFailures = e"
        /> -->
    </form>
    <div class="canon-c-color-matrix overflow-x-scroll">
        <table class="mw-100 w-100">
            <thead>
                <tr class="tc">
                    <th
                        scope="col"
                    >
                        Color
                    </th>
                    <th
                        v-for="(value, name) in colors"
                        :key="value"
                        class="canon-color-matrix__col-header"
                        :style="{borderBottomColor: value}"
                        scope="col"
                    >
                        <div
                            class="canon-color-matrix__col-header-text"
                        >
                            <span>{{ name }}</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <canon-swatch
                    v-for="(value, name) in colors"
                    :id="name"
                    :key="name"
                    :color="value"
                    :colors="colors"
                    :name="name"
                    :a11y-level="a11yLevel"
                />
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import colors from '../../styles/00_settings/defaults.scss';
import CanonSwatch from './PaletteSwatch';
import CanonRadioButtonList from '../Radios/RadioButtonList';
// import CanonCheckbox from '../'
const a11yLevelOptions = [
    {
        label: 'WCAG AAA',
        value: 'aaa',
    },
    {
        label: 'WCAG AA',
        value: 'aa',

    },
];
export default {
    name: 'CanonPalette',
    components: {
        CanonSwatch,
        CanonRadioButtonList,
    },
    data() {
        return {
            colors: colors,
            a11yLevelOptions: a11yLevelOptions,
            a11yLevel: 'aa',
            showFailures: true,
        }
    },
    computed: {
        conformanceLevel() {
            return this.a11yLevel.toUpperCase();
        },
    },
};
</script>
<style lang="scss">
//TODO: don't forget to normalize/abstract/organize styles
table {
    height: 100%;
}
th, td {
    position: relative;
    height: 100%;
    border: 1px solid var(--gray--1);
}
.canon-c-color-matrix table {
    border-collapse: separate;
}
.canon-color-matrix__col-header {
    height: $space*5;
    max-width: 4rem;
    text-align: left;
    border-bottom-style: solid;
    border-bottom-width: $space/2;
}
.canon-color-matrix__col-header-text {
    transform-origin: 50% 50%;
    transform: rotateZ(-90deg);
}
</style>