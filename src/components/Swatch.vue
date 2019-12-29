<template>
<div class="canon-swatch" :style="cssVars">
    <h2 :aria-level="level ? level : null">{{ label }}</h2>
    <div class="canon-swatch__text">
        <div class="canon-swatch__bg--dark">
            {{ contrastLevel(ratioAgainstDark) }}
            <p v-if="levelAgainstDark === 3">Use {{ label }} against {{ darkColor }} anytime.</p>
            <p v-if="levelAgainstDark === 2">For AAA, use {{ label }} ONLY against {{ darkColor }}  for <span class="wcag-large-text">large</span> or <b>bold</b>. Use for AA anytime.</p>
            <p v-if="levelAgainstDark === 1"></p>
            <p v-if="levelAgainstDark === 0">DO NOT use against {{ darkColor }}</p>
        </div>
        <div class="canon-swatch-bg--light">

            <p>DO use {{ label }} against {{ lightColor }} anytime.</p>
            <p>Use {{ label }} ONLY against {{ lightColor }}  for <span class="wcag-large-text">large</span> or <b>bold</b>.</p>
            <p>DO NOT use against {{ lightColor }}</p>
        </div>
    </div> 
    <div class="canon-swatch__bg">
    </div> 
</div>
</template>

<script>
// import CanonTag from './Tag';

import {isHex, isHsl, isRgb} from '../functions/color/detectSyntax';
import hexToRgb from '../functions/color/hexToRgb';
import hslToRgb from '../functions/color/hslToRgb';
import getContrast from '../functions/color/getWcagContrast';
import rgbToObject from '../functions/color/rgbToObject';

export default {
    name: 'CanonSwatch',
    // components: {
    //     CanonTag,
    // },
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
            type: String,
            default: '#222',
        },
        lightColor: {
            type: String,
            default: '#efefef',
        },
        color: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: () => this.color,
        },
        level: {
            type: Number,
            default: 0,
        }
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
                '--wcag-small': `${this.wcagFontSize.small}px`
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
