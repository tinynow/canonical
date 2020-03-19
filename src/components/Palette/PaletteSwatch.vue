<template>
<tr
    class="canon-swatch"
>
    <th
        scope="row"
        class="flex"
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
        v-for="item in colors"
        :key="item.name"
    >
        <div
            v-show="isNotSafe(getContrast(color,item.value))"
            class="flex flex-column items-center justify-center pa1"
        >
            <!-- Under 3 not good for anything -- using default safe colors-->
            <canon-icon
                icon-name="do-not"
                icon-width="30px"
                icon-height="30px"
                icon-stroke="currentColor"
            />
            <span class="canon-u-compact--sm tc">
                {{ message(getContrast(color,item.value)) }}
            </span>
            <span v-if="showContrast">{{ getContrast(color,item.value).toFixed(2) }}</span>
        </div>
        
        <div
            v-show="!isNotSafe(getContrast(color,item.value))"
            :style="{ backgroundColor: item.value, color: color }"
            
            class="h100 flex flex-column items-center justify-center pa1"
        >
            <!-- over 3 - use color scheme colors -->
            <div class="flex">
                <canon-icon
                    v-show="showInteractive(getContrast(color,item.value))"
                    icon-name="interactive"
                    icon-width="30px"
                    icon-height="30px"
                    icon-stroke="currentColor"
                    :icon-fill="item.value"
                />

                <canon-icon
                    v-show="showLarge(getContrast(color,item.value))"
                    icon-name="large-bold-text"
                    icon-width="30px"
                    icon-height="30px"
                    icon-fill="currentColor"
                    stroke-width="0"
                />

                <!-- over 7 everyones happy -->

                <canon-icon
                    v-show="isSafe(getContrast(color,item.value))"
                    icon-name="smile"
                    icon-width="30px"
                    icon-height="30px"
                />
            </div>
            <span
                class="canon-u-compact--0 tc"
                :class="{'canon-u-compact--1': showLarge(getContrast(color,item.value))}"
            >
                {{ message(getContrast(color,item.value)) }}
            </span>
            <span v-if="showContrast">{{ getContrast(color,item.value).toFixed(2) }}</span>
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
        // TODO: abstract all the logic
        convertToRgbObject(color) {
            return convertToRgb(color);
        },
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