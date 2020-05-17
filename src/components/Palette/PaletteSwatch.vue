<template>
<div>
    <h3 class="ffheading canon-u-type--2">
        <span class="db">{{ name }}</span>
        <span>{{ color }}</span>
    </h3>


    <!-- <td
        v-for="(contrast, index) in contrasts"
        :key="colors[index].name"
        class="canon-color-matrix__cell"
        :class="isNotSafe(contrast) && !showFailures ? 'dn' : null"
    > -->
    <div v-if="false">
        <template v-if="isNotSafe(contrast) && showFailures">
            <!-- Under 3 not good for anything -- using default safe colors-->
            <canon-icon
                icon-name="do-not"
                icon-width="30px"
                icon-height="30px"
                icon-stroke="currentColor"
            />
        </template>
          
        <template v-if="!isNotSafe(contrast)">
            <!-- over 3 - use color scheme colors -->
            <div class="flex">
                <canon-icon
                    v-if="showInteractive(contrast)"
                    key="interactiveIcon"
                    icon-name="interactive"
                    icon-width="30px"
                    icon-height="30px"
                    icon-stroke="currentColor"
                    :icon-fill="colors[index].value"
                />

                <canon-icon
                    v-if="showLarge(contrast)"
                    key="largeBoldIcon"
                    icon-name="large-bold-text"
                    icon-width="30px"
                    icon-height="30px"
                    icon-fill="currentColor"
                    stroke-width="0"
                />

                <!-- over 7 everyones happy -->

                <canon-icon
                    v-if="isSafe(contrast)"
                    key="smileIcon"
                    icon-name="smile"
                    icon-width="30px"
                    icon-height="30px"
                />
            </div>
        </template>
    </div>
    {{ $store.state.colorTool }}
</div>
</template>

<script>
// import CanonTag from './Tag';
import {isHex, isHsl, isRgb} from '../../utils/color/detectSyntax';
import hexToRgb from '../../utils/color/hexToRgb';
import hslToRgb from '../../utils/color/hslToRgb';
import getContrast from '../../utils/color/getWcagContrast';
import rgbToObject from '../../utils/color/rgbToObject';
import CanonIcon from './../Icon/Icon';
// import CanonTypeSpecimen from './TypeSpecimen';
import convertToRgb from './../../utils/color/convertToRgb';


export default {
    name: 'CanonSwatch',
    components: {
        // CanonTypeSpecimen,
        CanonIcon,
    },
    props: {
        color: {
            type: String,
            required: true,
        },
        colors: {
            type: Array,
            required: true,
        },
        contrasts: {
            type: Array,
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
        colorFormat: {
            type: String,
            default: 'hsl',
        },
        showText: {
            type: Boolean,
            default: true,
        },
        showContrastRatio: {
            type: Boolean,
            default: true,
        },
        showFailures: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            wcagFontSize: {
                'small': 18.5,
                'large': 24,
            },
            messages: {
                ok: 'Anything.',
                uiOnly: 'Interface elements.',
                largeText: 'Large, bold text, interface elements.',
                fail: 'Nothing.',
            },
        };
    },
    computed: {
        cssVars() {
            return {
                '--swatch-color': this.color,
            };
        },

    },
    methods: {

        getContrast(color1, color2) {
            return getContrast(
                color1,
                color2,
            );
        },
        isNotSafe(contrast) {
            return contrast < 3;
        },
        isSafe(contrast) {
            return contrast >= 4.5 && this.a11yLevel === 'aa' || contrast >= 7; 
        },
        isSafeForUI(contrast) {
            return contrast >= 3;
        },
        isSafeForLarge(contrast) {
            return  contrast >= 3 && this.a11yLevel === 'aa' || contrast >= 4.5;
        },
        showInteractive(contrast) {
            return this.isSafeForUI(contrast) && !this.isSafe(contrast);
        },
        showLarge(contrast) {
            return this.isSafeForLarge(contrast) && !this.isSafe(contrast);
        },
        message(contrast) {
            if (this.isSafe(contrast)) {
                return this.messages.ok;
            } else if (this.isSafeForLarge(contrast)) {
                return this.messages.largeText;
            } else if (this.isSafeForUI(contrast)) {
                return this.messages.uiOnly
            } else {
                return this.messages.fail;
            }
        },
    },
    
};
</script>
