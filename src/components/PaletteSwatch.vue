<template>
<tr
    class="canon-swatch"
    :style="cssVars"
>
    <th
        scope="row"
        class="canon-swatch__name canon-swatch__bg--light"
    >
        {{ name }}
    </th>
    <td class="canon-swatch__contrast-vs-light">
        {{ scoreToEnglish(levelAgainstLight, 'aaa') }}
        <div class="canon-swatch__bg">
            <span class="canon-swatch__bg--light">As Background</span>
        </div>
        <div class="canon-swatch__bg--light">
            <span class="canon-swatch__bg">As text</span>
        </div>
    </td>
    <td class="canon-swatch__contrast-vs-dark">
        {{ scoreToEnglish(levelAgainstDark, 'aaa') }}
    </td>

    <td class="canon-swatch__content canon-swatch__bg--light">
        <div class="canon-swatch__contrast-examples">
            <div class="canon-swatch__bg">
                <div class="canon-swatch__bg--dark" />
            </div>
     
            <div class="canon-swatch__bg--light">
                <div class="canon-swatch__bg" />
            </div>
            <div class="canon-swatch__bg--dark">
                <div class="canon-swatch__bg" />
            </div>
        </div>
    </td>
</tr>
</template>

<script>
// import CanonTag from './Tag';
import {isHex, isHsl, isRgb} from '../utilities/color/detectSyntax';
import hexToRgb from '../utilities/color/hexToRgb';
import hslToRgb from '../utilities/color/hslToRgb';
import getContrast from '../utilities/color/getWcagContrast';
import rgbToObject from '../utilities/color/rgbToObject';

const plainEnglish = [
    'worse',
    'bad',
    'ok sometimes*',
    'good',
    'very good',
];


export default {
    name: 'CanonSwatch',
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
            type: Number,
            default: 0,
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
                '--text--dark': this.theme.colors.base.dark,
                '--text--light': this.theme.colors.base.light,
                '--bg--dark': this.theme.colors.base.dark,
                '--bg--light': this.theme.colors.base.light,
                '--swatch-color': this.color,
                '--wcag-large': `${this.wcagFontSize.large}px`,
                '--wcag-small': `${this.wcagFontSize.small}px`,
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
        contrastLevel(contrast) {

            const ratios =  [
                1/7, //safe - passes AAA
                1/4.5,//ok - passes AA, AAA large or bold
                1/3, //warning - passes AA large or bold, and non-text
            ];

            return ratios.filter((ratio) => contrast < ratio).length;
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

.canon-swatch__bg {
    background-color: var(--swatch-color);
}
.canon-swatch__text {
    color: var(--swatch-color);
}
.canon-swatch__bg--dark {
    background-color: var(--bg--dark);
}
.canon-swatch__bg--light {
    background-color: var(--bg--light);
}
.canon-swatch__text--dark {
    color: var(--text--dark);
}
.canon-swatch__text--light {
    color: var(--text--light);
}
.wcag-large-text {
    font-size: var(--wcag-large);
}
.wcag-regular-text {
    font-size: var(--wcag-small)
}
</style>
