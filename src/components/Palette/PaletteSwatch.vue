<template>
<tr
    class="canon-swatch"
>
    <th
        scope="row"
        class="pv3"
        :style="{ backgroundColor: color }"
    >
        <span class="bg--light pa1">
            {{ name }} -
            {{ color }} 
        </span>
    </th>
    <td
        v-for="(value, colorName) in colors"
        :key="colorName"
        class="tc"
    >
        <div v-if="contrastFromStrings(value, color) < 3">
            Fails: {{ contrastFromStrings(value, color).toFixed(2) }}
        </div>
        <div
            v-else
            :style="{ backgroundColor: value, color: color }"
            class="h100 flex items-center justify-center"
        >
            <span>{{ contrastFromStrings(value, color).toFixed(2) }}</span>
        </div>
    </td>
    <!-- <td class="tc">
        <span class="pv2 db">{{ scoreToEnglish(levelAgainstLight) }}</span>
        <canon-type-specimen
            v-if="scoreToEnglish(levelAgainstLight) != 'No'"
            :color="color"
            base-color="light"
        />
    </td>
    <td class="tc">
        <span class="pv2 db">{{ scoreToEnglish(levelAgainstDark) }}</span>
        <canon-type-specimen
            v-if="scoreToEnglish(levelAgainstDark) != 'No'"
            :color="color"
            base-color="dark"
        />
    </td> -->
</tr>
</template>

<script>
// import CanonTag from './Tag';
import {isHex, isHsl, isRgb} from '../../utils/color/detectSyntax';
import hexToRgb from '../../utils/color/hexToRgb';
import hslToRgb from '../../utils/color/hslToRgb';
import getContrast from '../../utils/color/getWcagContrast';
import rgbToObject from '../../utils/color/rgbToObject';
// import CanonTypeSpecimen from './TypeSpecimen';

const plainEnglish = [
    'No',
    'No',
    'Sometimes*',
    'Yes',
    'Yes',
];


export default {
    name: 'CanonSwatch',
    components: {
        // CanonTypeSpecimen,
    },
    props: {
        theme: {
            type: Object,
            default: () => ({
                colors: {
                    base: {
                        dark: '#111',
                        light: '#efefef',
                    },
                },
            }),
        },
        darkColor: {
            type: Object,
            default: () => ({
                name: 'Base Dark',
                value: '#222',
            }),
        },
        lightColor: {
            type: Object,
             default: () => ({ 'Base Light': '#efefe'}),
        },
        color: {
            type: String,
            required: true,
        },
        colors: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            default: () => this.color,
        },
        a11yLevel: {
            type: String,
            default: 'aaa',
        },
    },
    data() {
        return {
            wcagFontSize: {
                'small': 18.5,
                'large': 24,
            },
        };
    },
    computed: {
        cssVars() {
            return {
                '--swatch-color': this.color,
            };
        },
        ratioAgainstLight() {
            return this.contrastFromStrings(this.color, '#FFFFFF');
        },
        ratioAgainstDark() {
            return this.contrastFromStrings(this.color, this.theme.colors.base.dark);
        },
        levelAgainstLight() {
            return this.contrastLevel(this.ratioAgainstLight);
        },
        levelAgainstDark() {
            return this.contrastLevel(this.ratioAgainstDark);
        },
    },
    methods: {
        // TODO: abstract all the logic
        convertToRgbObject(color) {
            
            if (isRgb(color)) {
                return rgbToObject(color);
            } else if (isHex(color)) {
                return hexToRgb(color);
            } else if (isHsl(color)) {
                return hslToRgb(color);
            } else if (color === 'black') {
                return {r:0,g:0,b:0};
            } else if (color === 'white') {
                return {r:255,g:255,b:255};
            } else {
                console.error(`Color format must be rgb, hex, hsl format or the named color values "black" or "white". Value provided was ${color}`);
            }
        },
        contrastFromStrings(color1, color2) {
            return getContrast(
                this.convertToRgbObject(color1),
                this.convertToRgbObject(color2)
            );
        },
        // There are only 3 ratios that WCAG uses as of 2.1
        contrastLevel(contrast) {

            const ratios =  [
                3, //warning - passes AA large or bold, and non-text
                4.5,//ok - passes AA, AAA large or bold
                7, //safe - passes AAA
            ];

            return ratios.filter((ratio) => contrast > ratio).length;
        },
        score(contrastLevel, conformanceLevel) {
            if ( conformanceLevel === 'aaa') {
                return contrastLevel;
            } else if ( conformanceLevel === 'aa' ) {
                return contrastLevel + 1;
            }
        },
        scoreToEnglish(score)  {
            if ( this.a11yLevel === 'aaa') {
                return plainEnglish[score];
            } else if ( this.a11yLevel === 'aa' ) {
                return plainEnglish[score + 1];
            }
        },
    },
    
};
</script>