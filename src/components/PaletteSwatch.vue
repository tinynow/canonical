<template>
<div
    class="canon-swatch canon-swatch__bg flex items-center"
    :style="cssVars"
>
    <div class="canon-swatch__content canon-swatch__bg--light pa2 mv3 mh3">
        <h2 
            :aria-level="level ? level : null"
        >
            {{ name }}
        </h2>
        <ul class="">
            <li v-if="levelAgainstDark === 3">
                Use {{ name }} with {{ Object.keys( darkColor)[0] }} anytime.
            </li>
            <li v-if="levelAgainstDark === 2">
                For AAA, use {{ name }} ONLY with {{ Object.keys( darkColor)[0] }}  for <span class="wcag-large-text">large</span> or <b>bold</b>. Use for AA anytime.
            </li>
            <li v-if="levelAgainstDark === 1">
                For AA, ONLY use {{ name }} with {{ Object.keys( darkColor)[0] }}  for <span class="wcag-large-text">large</span> or <b>bold</b>.
            </li>
            <li v-if="levelAgainstDark === 0">
                <canon-icon
                    icon-name="x"
                    icon-height="0.875rem"
                    icon-width="0.875rem"
                    fat="true"
                /><span> DO NOT use with {{ Object.keys( darkColor)[0] }}</span>
            </li>
            <li v-if="levelAgainstLight === 3">
                Use {{ name }} with {{ Object.keys(lightColor)[0] }} anytime.
            </li>
            <li v-if="levelAgainstLight === 2">
                For AAA, ONLY use {{ name }} with {{ Object.keys(lightColor)[0] }}  for <span class="wcag-large-text">large</span> or <b>bold</b>. Use for AA anytime.
            </li>
            <li v-if="levelAgainstLight === 1">
                For AA, ONLY use {{ name }} with {{ Object.keys(lightColor)[0] }}  for <span class="wcag-large-text">large</span> or <b>bold</b>.
            </li>
            <li v-if="levelAgainstLight === 0">
                DO NOT use with {{ Object.keys(lightColor)[0] }}
            </li>
        </ul>
    </div>
    <div class="canon-swatch__contrast-examples mr3 mlauto">
        <div class="flex">
            <div class="canon-swatch__bg pl2 pt2 pr4 pb3">
                <div class="canon-swatch__bg--light pa1" />
            </div>
            <div class="canon-swatch__bg  pl2 pt2 pr4 pb3">
                <div class="canon-swatch__bg--dark pa1" />
            </div>
        </div>
        <div class="flex">
            <div class="canon-swatch__bg--light pl2 pt2 pr4 pb3">
                <div class="canon-swatch__bg pa1" />
            </div>
            <div class="canon-swatch__bg--dark  pl2 pt2 pr4 pb3">
                <div class="canon-swatch__bg pa1" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import CanonTag from './Tag';
import CanonIcon from './Icon/Icon';
import {isHex, isHsl, isRgb} from '../utilities/color/detectSyntax';
import hexToRgb from '../utilities/color/hexToRgb';
import hslToRgb from '../utilities/color/hslToRgb';
import getContrast from '../utilities/color/getWcagContrast';
import rgbToObject from '../utilities/color/rgbToObject';

export default {
    name: 'CanonSwatch',
    components: {
        CanonIcon,
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
        level: {
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
            // const ratioDefs = [
            //     [1/3, 'ONLY passes AA large or bold text, and non-text.'],
            //     [1/4.5, 'ONLY pass AA, AAA large or bold, and non-text'],
            //     [1/7, 'Passes everything']
            // ];

            // const ratioMap = new Map(ratioDefs);
            const ratios =  [
                1/7, //safe - passes AAA
                1/4.5,//ok - passes AA, AAA large or bold
                1/3, //warning - passes AA large or bold, and non-text
            ];

            return ratios.filter((ratio) => contrast < ratio).length;
        },
    },
    
};
</script>

<style>
.canon-swatch {
    min-height: 25vh;
}
.canon-swatch__swatch {
    min-width: 50px;
}
.canon-swatch__content {
    width: 40%;
    min-width: 15em;
}
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
