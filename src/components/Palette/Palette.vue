<template>
<div class="canon-layout --tube mt3">
    <div class="flex">
        <h1 class="ffheading">
            You can use
        </h1>
        <div class="mr0 mlauto">
            <canon-button
                class="canon-palette__settings-toggle inline-flex items-center pv2 ph1"
                aria-controls="palette-settings"
                :aria-expanded="showSettings.toString()"
                @click="showSettings = !showSettings"
            >
                <canon-icon
                    icon-name="settings"
                    class="mr1"
                />Settings
            </canon-button>
            <transition name="slide-from-right">
                <form
                    v-show="showSettings"
                    id="palette-settings"
                    class="canon-palette__settings canon-layout --tube --readable --auto-flow-compact tl pb4 shadow-1"
                >
                    <div class="pt3 canon-layout --readable">
                        <canon-field
                            type="textarea"
                            :value="JSON.stringify(colors)"
                            @input="onPasteInput"
                        >
                            <span slot="label">Paste your colors</span>
                            <span
                                slot="error"
                                class="db"
                            >{{ showBadPasteError ? 'Sorry, I can\'t understand that.' : null }}</span>
                            <div slot="after">
                                <p>Paste a valid JSON array of colors, or an object with color labels as keys. Colors must be hex,rgb, or hsl format.</p>
                                <p class="mt1">
                                    Example: <code><pre>{ "red": "#F11", "white": "hsl(0,100%,100%)"}</pre></code>
                                </p>
                            </div>
                        </canon-field>
                    </div>
                    <canon-radio-button-list
                        id="howAccessible"
                        label="Accessiblity Level"
                        :options="a11yLevelOptions"
                        name="level"
                        :value="a11yLevel"
                        @change="e => a11yLevel = e"
                    />
                    <canon-checkbox
                        v-model="showText"
                        label="Show text labels"
                    />
                    <canon-checkbox
                        v-model="showFailures"
                        label="Show non-passing combinations"
                    />
                    <canon-checkbox
                        :value="showContrasts"
                        label="Show contrast ratios"
                        @change="TOGGLE_CONTRASTS"
                    />
                </form>
            </transition>
        </div>
    </div>
    <div class="canon-layout --auto-flow --readable mt3">
        <p>Give me set of CSS colors, what WCAG level of conformance you adhere to, and I will let you know which colors you can use and when. Open settings to begin.</p>
    </div>

    <ul
        class="canon-color-matrix mt5 reset-list"
        role="list"
    >
        <canon-color-card
            v-for="item in colorMatrix"
            :id="item.name"
            :key="item.name"
            :color="item.value"
            :rgb-color="item.rgb"
            :contrasts="item.contrasts"
            :name="item.name"
            :a11y-level="a11yLevel"
            class="mt3"
        />
    </ul>
    <div class="canon-layout --tube --spacious --readable">
        <h2>Requirements for {{ conformanceLevel }}</h2>
        <p>The following elements need minimum color contrast ratios against their background (or adjacent colors).</p>
        <ul v-show="a11yLevel === 'aa'">
            <li>
                <canon-icon
                    icon-name="large-bold-text"
                    class="pr1"
                />Text that is 24px and larger, or 19px and larger if bold: <strong>3:1</strong>.
            </li>
            <li>
                <canon-icon
                    icon-name="smile"
                    class="pr1"
                />Text that is smaller than 24px: <strong>4.5:1</strong>.
            </li>
            <li>
                <canon-icon
                    icon-name="interactive"
                    class="pr1"
                />Interactive UI components and essential graphical elements: <strong>3:1</strong>.
            </li>
        </ul>
        <ul v-show="a11yLevel === 'aaa'">
            <li>
                <canon-icon
                    icon-name="large-bold-text"
                    class="pr1"
                />Text that is 24px and larger, or 19px and larger if bold: <strong>4.5:1</strong>.
            </li>
            <li>
                <canon-icon
                    icon-name="smile"
                    class="pr1"
                />Text that is smaller than 24px: <strong>7:1</strong>.
            </li>
            <li>
                <canon-icon
                    icon-name="interactive"
                    class="pr1"
                />Interactive UI components and essential graphical elements: <strong>3:1</strong>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapGetters } = createNamespacedHelpers('colorTool');

import CanonColorCard from './ColorCard';
import CanonRadioButtonList from '../Radios/RadioButtonList';
import CanonIcon from '../Icon/Icon';
import CanonCheckbox from '../Checkbox/Checkbox';
import CanonButton from '../Button/Button';
import CanonForm from '../Form/Form';
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
        CanonColorCard,
        CanonRadioButtonList,
        CanonIcon,
        CanonButton,
        CanonCheckbox,
        CanonField,
    },
    data() {
        return {
            a11yLevelOptions: a11yLevelOptions,
            a11yLevel: 'aa',
            showSettings: false,
            showFailures: false,
            showText: true,
            showBadPasteError: false,
        };
    },
    computed: {
        ...mapState([
            'colors',
            'conformanceLevel',
            'showContrasts',
        ]),
        ...mapGetters([
            'colorMatrix',
        ]),
    },
    methods: {
        ...mapMutations(['TOGGLE_CONTRASTS']),
        onPasteInput(value) {
            /**
             * Takes an array, returns a simple object, with keys and values that are equivalent to the corresponding array value
             * Example: ["a","foo",5] => { "a": "a", "foo":"foo", 5:5}
             **/
            const mapValsToObject = array => array.reduce((result, item) => {
                result[item] = item;
                return result;
            }, {});

            try {
                const parsed = JSON.parse(value.trim());
                
                if (Array.isArray(parsed)) {
                    /* example ["#000", "#444", "#FEE"] */
                    const colorDictionary = mapValsToObject(parsed);
                    this.$store.commit('colorTool/SET_COLORS', colorDictionary);

                } else if (typeof parsed === 'object') {
                    this.$store.commit('colorTool/SET_COLORS', parsed);
                    
                }
                this.showBadPasteError = false;

            } catch (e) {
                this.showBadPasteError = true;
            }
            
        },
    },
};
</script>
<style lang="scss">
//TODO: don't forget to normalize/abstract/organize styles
.canon-color-matrix__col-header {
    border: none;
    &[scope="row"] {
        min-width: 8rem;
    }
    &[scope="col"] {
        height: $space*5;
        text-align: left;
        border-bottom-style: solid;
        border-bottom-width: $space/2;
        box-shadow: inset 0 -3px 1px -3px #777;
    }
}
.canon-color-matrix__col-header-text {
    transform-origin: 50% 50%;
    transform: rotateZ(-90deg);
}
.canon-color-matrix__tr {
    border-bottom: 1px solid #ddd;
}

.canon-palette__settings {
    width: $space*12;
    right: 0;
    position: absolute;
    z-index: 1;
    background-color: white;
}
.canon-palette__settings-toggle {
    svg {
        transition: transform .2s ease;
        transform: rotateZ(-1turn);
    }
    &[aria-expanded="true"] svg {
        transform: rotateZ(0);
    }
}

</style>