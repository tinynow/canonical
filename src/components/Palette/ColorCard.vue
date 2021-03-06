<template>
<li
    class="mt3 canon-color-card"
    :style="{ borderLeftColor: color }"
>
    <div class="flex items-stretch">
        <div>
            <h3 class="ffheading canon-u-compact--3">
                {{ name }}
            </h3>
            <span class="ffbase canon-u-compact--0 ml1">{{ color }}</span>
        </div>
        <div
            class="shadow-1 ml2 flex-grow-1"
            :style="{ backgroundColor: color }"
        />
    </div>
    <div class="flex flex-wrap justify-between items-stretch">
        <div
            v-if="safeFor.anything.length"
            class="pt3 w100"
        >
            <div class="flex">
                <canon-icon
                    icon-name="smile"
                    icon-size="40px"
                    class="pr1"
                />
                <h4 class="canon-u-type--2">
                    Use {{ name }} with these colors for anything.
                </h4>
            </div>
            <canon-color-card-combos
                :combos="safeFor.anything"
                :color="color"
            />
        </div>
        <div
            v-if="safeFor.largeOnly.length"
            class="pt4 w100"
        >
            <div class="flex">
                <canon-icon
                    icon-name="large-bold-text"
                    icon-size="32px"
                    class="pr1"
                />
                <h4 class="canon-u-type--2">
                    Use {{ name }} with these colors for large or bold text.
                </h4>
            </div>
            <canon-color-card-combos
                :combos="safeFor.largeOnly"
                :color="color"
            />
        </div>
        <div
            v-if="safeFor.uiOnly.length"
            class="pt4 w100"
        >
            <div class="flex">
                <canon-icon
                    icon-name="interactive"
                    icon-size="40px"
                    class="pr1"
                />
                <h4 class="canon-u-type--2">
                    Use {{ name }} with these colors for interface controls.
                </h4>
            </div>
            <canon-color-card-combos
                :combos="safeFor.uiOnly"
                :color="color"
            />
        </div>


        <div
            v-if="safeFor.uiOrLarge.length"
            class="pt4 w100"
        >
            <div class="flex">
                <canon-icon
                    icon-name="interactive"
                    icon-size="40px"
                    class="pr1"
                />
                <canon-icon
                    icon-name="large-bold-text"
                    icon-size="40px"
                    class="pr1"
                />
                
                <h4 class="canon-u-type--2">
                    Use {{ name }} with these colors for large text, bold text, or interface elements.
                </h4>
            </div>
            <canon-color-card-combos
                :combos="safeFor.uiOrLarge"
                :color="color"
            />
        </div>

        <div
            v-if="safeFor.nothing.length && showFailures"
            class="pt4 w100"
        >
            <div class="flex">
                <canon-icon
                    icon-name="do-not"
                    icon-size="40px"
                    class="pr1"
                />
                <h4 class="canon-u-type--2">
                    Do not use {{ name }} with these colors.
                </h4>
            </div>
            <canon-color-card-combos
                :combos="safeFor.nothing"
                :color="color"
            />
        </div>
    </div>





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
</li>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapGetters } = createNamespacedHelpers('colorTool');


import {isHex, isHsl, isRgb} from '../../utils/color/detectSyntax';
import hexToRgb from '../../utils/color/hexToRgb';
import hslToRgb from '../../utils/color/hslToRgb';
import getContrast from '../../utils/color/getWcagContrast';
import rgbToObject from '../../utils/color/rgbToObject';
import CanonColorCardCombos from './ColorCardCombos'
import CanonIcon from './../Icon/Icon';
import convertToRgb from './../../utils/color/convertToRgb';


export default {
    name: 'CanonColorCard',
    components: {
        // CanonTypeSpecimen,
        CanonIcon,
        CanonColorCardCombos,
    },
    props: {
        color: {
            type: String,
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
            safeForLabels: {
                anything: 'Anything.',
                uiOnly: 'Interface elements only.',
                uiOrLarge: 'Large text, bold text, or interface elements.',
                nothing: 'Nothing.',
            },
        };
    },
    computed: {
        cssVars() {
            return {
                '--swatch-color': this.color,
            };
        },
        ...mapState([
            'conformanceLevel',
        ]),
        ...mapGetters([
            'colorMatrix',
        ]),

        safeFor() {
            return {
                nothing: this.contrasts.filter(combo => combo.contrast < 3),
                uiOnly: this.contrasts.filter(combo => this.a11yLevel === 'aaa' && combo.contrast >= 3),
                uiOrLarge: this.contrasts.filter(combo => this.a11yLevel === 'aa' && combo.contrast >= 3),
                largeOnly: this.contrasts.filter(combo => this.a11yLevel === 'aaa' && combo.contrast >= 4.5),
                anything: this.contrasts.filter(
                    combo => this.a11yLevel === 'aa' && combo.contrast >= 4.5 || combo.contrast >= 7
                ),
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
<style lang="scss">
.canon-swatch {
    
    // width: $space*1.666;
    // height: $space*4;
    &.--small {
        width: 1.5em;
        height: 1.5em;
    }
}
.canon-color-card  {


}

</style>