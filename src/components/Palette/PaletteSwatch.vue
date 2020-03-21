<template>
<tr
    class="canon-swatch"
>
    <th
        scope="row"
        class="flex canon-color-matrix__col-header  "
    >
        <span class="canon-swatch__color-label db normal flex-grow-1">
            {{ name }}
        </span>
        <span
            class="pl2"
            :style="{ backgroundColor: color }"
        />
    </th>
    <td
        v-for="(contrast, index) in contrasts"
        :key="colors[index].name"
    >
        <div
            v-show="isNotSafe(contrast)"
            class="flex flex-column items-center justify-center pa1"
        >
            <!-- Under 3 not good for anything -- using default safe colors-->
            <canon-icon
                icon-name="do-not"
                icon-width="30px"
                icon-height="30px"
                icon-stroke="currentColor"
            />
            <span class="canon-u-compact--0 tc">
                {{ message(contrast) }}
            </span>
            <span v-if="showContrast">{{ contrast.toFixed(2) }}</span>
        </div>
        
        <div
            v-show="!isNotSafe(contrast)"
            :style="{ backgroundColor: colors[index].value, color: color }"
            
            class="h100 flex flex-column items-center justify-center pa1"
        >
            <!-- over 3 - use color scheme colors -->
            <div class="flex">
                <canon-icon
                    v-show="showInteractive(contrast)"
                    icon-name="interactive"
                    icon-width="30px"
                    icon-height="30px"
                    icon-stroke="currentColor"
                    :icon-fill="colors[index].value"
                />

                <canon-icon
                    v-show="showLarge(contrast)"
                    icon-name="large-bold-text"
                    icon-width="30px"
                    icon-height="30px"
                    icon-fill="currentColor"
                    stroke-width="0"
                />

                <!-- over 7 everyones happy -->

                <canon-icon
                    v-show="isSafe(contrast)"
                    icon-name="smile"
                    icon-width="30px"
                    icon-height="30px"
                />
            </div>
            <span
                class="canon-u-compact--0 tc"
                :class="{'canon-u-compact--1': showLarge(contrast)}"
            >
                {{ message(contrast) }}
            </span>
            <span v-if="showContrast">{{ contrast.toFixed(2) }}</span>
        </div>
    </td>
</tr>
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
    },
    data() {
        return {
            wcagFontSize: {
                'small': 18.5,
                'large': 24,
            },
            messages: {
                ok: 'Use for anything.',
                uiOnly: 'Use for interface elements only.',
                largeText: 'Use for large or bold text or interface elements only.',
                fail: 'Do not use at all.',
            },
            showContrast: true,
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