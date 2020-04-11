<template>
<div>
    <form class="canon-palette__settings-container">
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
            <form
                v-show="showSettings"
                id="palette-settings"
                class="canon-palette__settings canon-layout --tube --readable --auto-flow-compact"
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
                    v-model="showText"
                    label="Show text labels"
                />
                <canon-checkbox
                    v-model="showFailures"
                    label="Show non-passing combinations"
                />
                <canon-checkbox
                    v-model="showContrastRatio"
                    label="Show contrast ratios"
                />
            </form>
        </canon-revealer>
    </form>
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
                    :show-text="showText"
                    :show-failures="showFailures"
                    :show-contrast-ratio="showContrastRatio"
                    :a11y-level="a11yLevel"
                />
            </tbody>
        </table>
        <div class="canon-layout --tube --spacious --readable">
            <h2>Requirements for {{ conformanceLevel }}</h2>
            <p>The following elements need minimum color contrast ratios against their background (or adjacent colors).</p>
            <ul v-show="a11yLevel === 'aa'">
                <li>
                    <canon-icon
                        icon-name="large-bold-text"
                        class="pr1"
                    />Text that is 24px and larger, or 19px and larger if bold: <strong>3:1</strong>.
                </li>
                <li>
                    <canon-icon
                        icon-name="smile"
                        class="pr1"
                    />Text that is smaller than 24px: <strong>4.5:1</strong>.
                </li>
                <li>
                    <canon-icon
                        icon-name="interactive"
                        class="pr1"
                    />Interactive UI components and essential graphical elements: <strong>3:1</strong>.
                </li>
            </ul>
            <ul v-show="a11yLevel === 'aaa'">
                <li>
                    <canon-icon
                        icon-name="large-bold-text"
                        class="pr1"
                    />Text that is 24px and larger, or 19px and larger if bold: <strong>4.5:1</strong>.
                </li>
                <li>
                    <canon-icon
                        icon-name="smile"
                        class="pr1"
                    />Text that is smaller than 24px: <strong>7:1</strong>.
                </li>
                <li>
                    <canon-icon
                        icon-name="interactive"
                        class="pr1"
                    />Interactive UI components and essential graphical elements: <strong>3:1</strong>
                </li>
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
import CanonForm from '../Form/Form';
//import CanonCheckbox from '../'
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
            showContrastRatio: true,
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