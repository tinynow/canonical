<template>
<tr
    class="canon-swatch"
>
    <th
        scope="row"
        class="pv3"
    >
        {{ name }}
    </th>
    <td class="tc">
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
    </td>
</tr>
</template>

<script>
// import CanonTag from './Tag';
import {isHex, isHsl, isRgb} from '../../functions/color/detectSyntax';
import hexToRgb from '../../functions/color/hexToRgb';
import hslToRgb from '../../functions/color/hslToRgb';
import getContrast from '../../functions/color/getWcagContrast';
import rgbToObject from '../../functions/color/rgbToObject';
import CanonTypeSpecimen from './TypeSpecimen';

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
        CanonTypeSpecimen,
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
            return this.getContrast(this.color, this.theme.colors.base.light).toFixed(3);
        },
        ratioAgainstDark() {
            return this.getContrast(this.color, this.theme.colors.base.dark).toFixed(3);
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
                return {r:256,g:256,b:256};
            } else {
                console.error(`Color format must be rgb, hex, hsl format or the named color values "black" or "white". Value provided was ${color}`);
            }
        },
        getContrast(color1, color2) {
            return getContrast(
                this.convertToRgbObject(color1),
                this.convertToRgbObject(color2)
            );
        },
        // There are only 3 ratios that WCAG uses as of 2.1
        contrastLevel(contrast) {

            const ratios =  [
                1/7, //safe - passes AAA
                1/4.5,//ok - passes AA, AAA large or bold
                1/3, //warning - passes AA large or bold, and non-text
            ];

            return ratios.filter((ratio) => contrast < ratio).length;
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

<style lang="scss">

</style>
