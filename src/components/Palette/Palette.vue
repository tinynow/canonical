<template>
<div>
    <div class="canon-palette__settings-container">
        <canon-button
            class="canon-palett__settings-toggle"
            aria-controls="palette-settings"
            :aria-expanded="showSettings.toString()"
            @click="showSettings = !showSettings"
        >
            <canon-icon
                icon-name="settings"
                alt="Settings"
            />
        </canon-button>
        <canon-revealer>
            <div
                v-show="showSettings"
                id="palette-settings"
                class="canon-palette__settings canon-layout --tube --readable"
            >
                <canon-radio-button-list
                    id="howAccessible"
                    label="Accessiblity Level"
                    :options="a11yLevelOptions"
                    name="level"
                    :value="a11yLevel"
                    @change="e => a11yLevel = e"
                />
                <canon-checkbox
                    id="showText"
                    label="Show text labels"
                    :value="showText"
                />
            </div>
        </canon-revealer>    
        {{ showText ? 'true' : 'false' }}
    </div>
    <div 
        class="canon-palette__controls canon-layout --tube --readable"
    />
    <div class="canon-c-color-matrix overflow-x-scroll">
        <table class="mw-100 w-100">
            <thead>
                <tr class="tc">
                    <th
                        scope="col"
                        class="reset-border"
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
                    v-for="item in colorMatrix"
                    :id="item.name"
                    :key="item.name"
                    :color="item.value"
                    :rgb-color="item.rgb"
                    :contrasts="item.contrasts"
                    :colors="colorMatrix"
                    :name="item.name"
                    :a11y-level="a11yLevel"
                />
            </tbody>
        </table>
        <div class="canon-layout --tube --spacious --readable">
            <h2>Requirements for {{ conformanceLevel }}</h2>
            <p>The following elements need minimum color contrast ratios against their background (or adjacent colors).</p>
            <ul v-show="a11yLevel === 'aa'">
                <li><canon-icon icon-name="large-bold-text" />Text that is 24px and larger, or 19px and larger if bold: <strong>3:1</strong>.</li>
                <li>Text that is smaller than 24px: <strong>4.5:1</strong>.</li>
                <li>Interactive UI components and essential graphical elements: <strong>3:1</strong>.</li>
            </ul>
            <ul v-show="a11yLevel === 'aaa'">
                <li>Text that is 24px and larger, or 19px and larger if bold: <strong>4.5:1</strong>.</li>
                <li>Text that is smaller than 24px: <strong>7:1</strong>.</li>
                <li>Interactive UI components and essential graphical elements: <strong>3:1</strong> </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import colors from '../../styles/00_settings/defaults.scss';
import convertToRgb from './../../utils/color/convertToRgb';
import getWcagContrast from './../../utils/color/getWcagContrast';

import CanonSwatch from './PaletteSwatch';
import CanonRadioButtonList from '../Radios/RadioButtonList';
import CanonIcon from '../Icon/Icon';
import CanonCheckbox from '../Checkbox/Checkbox';
import CanonButton from '../Button/Button';
//import CanonCheckbox from '../'
const a11yLevelOptions = [
    {
        label: '<b>WCAG AAA</b>',
        value: 'aaa',
        html: '<b>WCAG AAA</b>',
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
        CanonIcon,
        CanonButton,
        CanonCheckbox,
    },
    data() {
        return {
            colors: colors,
            colorMatrix: [],
            a11yLevelOptions: a11yLevelOptions,
            a11yLevel: 'aa',
            showFailures: true,
            showText: true,
            showSettings: false,
        };
    },
    computed: {
        conformanceLevel() {
            return this.a11yLevel.toUpperCase();
        },
    },
    mounted() {
        this.colorMatrix = this.setColorMatrix();
    },
    methods: {
        setColorMatrix() {
            const computeSwatchData = ([ name, value ]) => ({
                name,
                value,
                rgb: convertToRgb(value),
            });
            const computeSwatchContrasts = swatch => {
                swatch.contrasts = [];
                swatches.forEach(otherSwatch => {
                    const contrast = getWcagContrast(swatch.rgb, otherSwatch.rgb);
                    swatch.contrasts.push(contrast);
                });
                return swatch;
            };
            const swatches = Object.entries(this.colors).map(computeSwatchData);
            return swatches.map(computeSwatchContrasts);
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
    border-collapse: separate
}
.canon-color-matrix__col-header {
    border: none;
    &[scope="col"] {
        height: $space*5;
        text-align: left;
        border-bottom-style: solid;
        border-bottom-width: $space/2;
        box-shadow: inset 0 -3px 1px -3px #777;
    }
}
.canon-color-matrix__col-header-text {
    transform-origin: 50% 50%;
    transform: rotateZ(-90deg);
}
</style>