<template>
<div
    class="canon-field"
    :class="wrapperClasses"
    @focus="onWrapperFocus"
    @blur="onWrapperBlur"
>
    <label
        class="canon-field__label"
        :for="uid"
    >
        <span class="canon-field__label-slot">
            <slot name="label">
                {{ label }}
            </slot>
        </span>
        <span class="canon-field__after-label-slot">
            <slot
                name="after-label"
            />Please include a special character (#$%^&*!@), a number, and an uppercase letter.
        </span>
    </label>
    <div class="canon-field__input-wrapper flex items-center">
        <div
            v-if="$slots.prefix"
            class="canon-field__prefix"
        >
            <slot name="prefix" />
        </div>
        <input
            :id="uid"
            ref="input"
            :key="id"
            class="canon-field__input"
            :type="type"
            :value="value"
            v-bind="$attrs"
            @input="input"
            v-on="listeners"
        >
        <div class="canon-field__suffix">
            <slot name="suffix" />
        </div>
    </div>
    <div class="canon-field__after">
        <slot name="after" />
    </div>
</div>
</template>

<script>
import uniqueId from '../../functions/utilities/uniqueId'
export default {
    name: 'CanonInputBase',
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
                    'number',
                    'tel',
                    'email',
                    'password',
                    'search',
                    'url',
                ]
                return valid.includes(val);
            },
        },
        value: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            hasFocus: false,
            wrapperClasses: {
                '--hasFocusWithin': this.hasFocus,
            },
            validity: null,
        };
    },
    computed: {
        listeners() {
            const { input, ...listeners } = this.$listeners;
            return listeners;
        },
        uid() {
            return this.id ? this.id : uniqueId('uid_')
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
@import './input-field.scss';
</style>
