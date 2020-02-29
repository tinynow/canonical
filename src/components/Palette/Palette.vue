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
        <h2>
            Choose base dark and light colors - usually very close to pure black and pure white.
        </h2>
        <canon-field
            required
            minlength="4"
            pattern="\d{3}[\-]\d{3}[\-]\d{4}"
            type="number"
        >
            <template v-slot:label>
                A very long label account number id
            </template>
        </canon-field>
        <canon-field>
            <template v-slot:label>
                Another label of some sort
            </template>
        </canon-field>    
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
        <canon-swatch
            v-for="(value, name) in colors"
            :id="name"
            :key="name"
            :color="value"
            :colors="colors"
            :name="name"
            :a11y-level="a11yLevel"
        />
    </table>
</div>
</template>

<script>
import colors from '../../styles/00_settings/defaults.scss';
import CanonSwatch from './PaletteSwatch';
import CanonRadioButtonList from '../Radios/RadioButtonList';
import CanonField from '../Inputs/InputField';
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
        CanonField,
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