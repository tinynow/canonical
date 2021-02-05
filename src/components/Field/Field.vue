<template>
<div
    class="canon-field"
    :class="rootClasses"
    @focus="onWrapperFocus"
    @blur="onWrapperBlur"
>
    <label
        class="canon-field__label"
        :for="uid"
    >
        <span class="canon-field__label-slot">
            <slot name="label" />
        </span>
    </label>
    <div
        v-if="$slots.hint"
        class="canon-field__hint-slot"
    >
        <slot name="hint" />
    </div>
    <div class="canon-field__input-wrapper" :class="inputWrapperClasses">
        <div class="canon-field__input-skin flex items-center" :class="inputSkinClasses">
            <div
                v-if="$slots.prefix"
                class="canon-field__prefix"
            >
                <slot name="prefix" />
            </div>
            <textarea
                v-if="type === 'textarea'"
                :id="uid"
                ref="input"
                :key="uid"
                class="canon-field__input"
                :value="value"
                v-bind="$attrs"
                @input="input"
                v-on="listeners"
            />
            <input
                v-else
                :id="uid"
                ref="input"
                :key="uid"
                class="canon-field__input"
                :type="type"
                :value="value"
                v-bind="$attrs"
                @input="input"
                v-on="listeners"
            >
    
            <slot name="suffix" />
        </div>
        <slot name="after" />
    </div>
    <div
        v-show="$slots.feedback"
        class="canon-field__feedback-slot"
    >
        <slot name="error" />
    </div>
</div>
</template>

<script>
import uniqueId from '../../mixins/uniqueId';
import requireSlots from '../../mixins/requireSlots';

export default {
    name: 'CanonField',
    mixins: [
        requireSlots,
        uniqueId,
    ],
    inheritAttrs: false,
    model: {
        prop: 'value',
        event: 'input',
    },
    props: {
        id: {
            type: [String, null],
            default: null,
        },
        type: {
            type: String,
            default: 'text',
            validator(val) {
                const valid = [
                    'text',
                    'textarea',
                    'tel',
                    'email',
                    'password',
                    'search',
                    'url',
                ]
                if (!valid.includes(val)) {
                    console.error('CanonField only supports the following types: ', valid );
                }
                return valid.includes(val);
            },
        },
        value: {
            type: String,
            default: '',
        },
        inputWrapperClasses: {
            type: [String, Array, Object],
            default: () => null,
        },
        inputSkinClasses: {
            type: [String, Array, Object],
            default: () => null,
        },
    },
    data() {
        return {
            hasFocus: false,
            rootClasses: {
                'focused': this.hasFocus,
            },
            validity: null,
            requiredSlots: [
                'label',
            ],
        };
    },
    computed: {
        listeners() {
            const { input, ...listeners } = this.$listeners;
            return listeners;
        },
        focusWithinDetected() {
            try {
                document.querySelector(':focus-within')
            } catch (error) {
                return false;
            }
            return true;
        },
    },
    mounted() {
        this.copyNativeValidity();
    },
    methods: {
        input(event) {
            this.copyNativeValidity();
            this.$emit('input', event.target.value);
        },
        /* Toggles .--focus-within class to replace :focus-within */
        onWrapperFocus() {
            if ( this.focusWithinDetected ) {
                this.hasFocus = true;
            }
        },
        /* Toggles .--focus-within class to replace :focus-within */
        onWrapperBlur() {
            if ( this.focusWithinDetected ) {
                this.hasFocus = false;
            }
        },
        /* Converts ValidityState to a plain object and updates data */
        copyNativeValidity() {
            const validityState = this.$refs.input.validity;
            const errorTypes = [ 'valueMissing', 'typeMismatch', 'patternMismatch', 'tooLong', 'tooShort', 'rangeUnderflow','errorTypes', 'rangeOverflow', 'stepMismatch', 'badInput', 'customError' ];
            const validity = {}
            errorTypes.forEach(type => {
                validity[type] = validityState[type]
            });
            this.validity = validity;
        },
    },
}
</script>

<style lang="scss">
@import "./field.scss";

</style>
