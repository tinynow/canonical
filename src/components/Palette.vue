<template>
<div :style="cssVars">
    <div 
        class="canon-palette__controls canon-layout --tube --readable --centered --spacious"
    >
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
        <h2>
            Choose base dark and light colors - usually very close to pure black and pure white.
        </h2>
        <input type="color">
    </div>
    <ul class="reset-list flex content-stretch">
        <li
            v-for="(value, name) in colors"
            :key="name"
            :color="value"
            class="canon-palette__key pv3 flex-grow-1"
            :style="{ 'backgroundColor': value }"
        >
            <span class="visually-hidden">{{ name }}</span>
        </li>
    </ul>
    <table class="mw-100">
        <thead>
            <tr>
                <th scope="col">
                    Color
                </th>
                <th scope="col">
                    Use with light
                </th>
                <th scope="col">
                    Use with dark
                </th>
            </tr>
        </thead>
        <canon-swatch
            v-for="(value, name) in colors"
            :id="name"
            :key="name"
            :color="value"
            :name="name"
            :a11y-level="a11yLevel"
        />
    </table>
</div>
</template>

<script>
import colors from '../styles/00_settings/defaults.scss';
import CanonSwatch from './PaletteSwatch';
import CanonRadioButtonList from './Radios/RadioButtonList';

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
    },
};
</script>

<style  scoped>
table {
    outline: 1px solid;
    table-layout: fixed;
    width: 100%;
}
</style>
