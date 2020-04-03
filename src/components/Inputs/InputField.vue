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
        <span
            v-if="$slots.hint"
            class="canon-field__hint-slot"
        >
            <slot name="hint" />
        </span>
        <span
            v-show="$slots.error"
            class="canon-field__label-error-slot"
        >
            <slot name="error" />
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
            :key="uid"
            class="canon-field__input"
            :type="type"
            :value="value"
            v-bind="$attrs"
            @input="input"
            v-on="listeners"
        >
        <div
            v-if="$slots.suffix"
            class="canon-field__suffix"
        >
            <slot name="suffix" />
        </div>
    </div>
    <div 
        v-if="$slots.after"
        class="canon-field__after"
    >
        <slot name="after" />
    </div>
</div>
</template>

<script>
import uniqueId from '../../mixins/uniqueId';
import requireSlots from '../../mixins/requireSlots';

export default {
    name: 'CanonInputField',
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
    },
    data() {
        return {
            hasFocus: false,
            rootClasses: {
                '--hasFocusWithin': this.hasFocus,
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
.test {
    color: blue;
}
@import "./input-field.scss";

</style>
