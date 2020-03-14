<template>
<div :style="cssVars">
    <div 
        class="canon-palette__controls canon-layout --tube --readable  --spacious"
    >
        <p>There are many jobs that need  colors in web development.</p>
        <ul>
            <li>Design of "green field"</li>
            <li>Accessibility </li>
            <li>Developer remediating legacy</li>
            <li>Design system team</li>
            <li>Desperate bleeding heart in a sea of uncaring corporate sharks</li>
        </ul>
        <h2>
            To what standard will you hold?
        </h2>
        <canon-radio-button-list
            id="howAccessible"
            label="Accessiblity Level"
            :options="a11yLevelOptions"
            name="level"
            :value="a11yLevel"
            @change="e => a11yLevel = e"
        />
        <h3>Requirements for {{ conformanceLevel }}</h3>
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
        <h2>
            Choose base dark and light colors - usually very close to pure black and pure white.
        </h2>
    </div>
    <!-- <ul class="reset-list flex content-stretch">
        <li
            v-for="(value, name) in colors"
            :key="name"
            :color="value"
            class="canon-palette__key pv3 flex-grow-1"
            :style="{ 'backgroundColor': value }"
        >
            <span class="visually-hidden">{{ name }}</span>
        </li>
    </ul> -->
    <table class="mt5 mw-100 w-100">
        <thead>
            <tr class="tc">
                <th
                    scope="col"
                    class="pv3 ph2"
                >
                    Color
                </th>
                <th
                    v-for="color in colors"
                    :key="color"
                    :style="{backgroundColor: color}"
                />
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
</template>

<script>
import colors from '../../styles/00_settings/defaults.scss';
import CanonSwatch from './PaletteSwatch';
import CanonRadioButtonList from '../Radios/RadioButtonList';

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
            a11yLevel: 'aaa',
        }
    },
    computed: {
        cssVars() {
            return {
                '--text--dark': 'var(--textColor)',
                '--text--light': 'var(--textColor--inverse)',
                '--bg--dark': 'var(--bgColor--inverse)',
                '--bg--light': 'var(--bgColor)',
            }
        },
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
    height: 100%;
    border: 1px solid var(--gray--1);
}
</style>