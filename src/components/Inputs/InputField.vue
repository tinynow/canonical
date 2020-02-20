<template>
<div class="canon-field">
    {{ focusWithinDetected }}
    <label
        class="canon-field__label"
        :for="uid"
    >
        <span class="canon-field__label-text"><slot name="label" /></span>
        <span class="canon-field__label-supplement"><slot name="label-supplement" />{{ errorMessage }}</span>
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
    },
    computed: {
        listeners() {
            const { input, ...listeners } = this.$listeners;
            return listeners;
        },
        uid() {
            return this.id ? this.id : uniqueId('uid_')
        },
        validity() {
            return this.$refs.input.validity;
        },
        errorMessage() {
            const input = this.$refs.input;
            return input ? input.validationMessage : '';
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
    methods: {
        input(event) {
            this.$emit('input', event.target.value);
        },
    },
}
</script>
<style lang="scss">
@import './input-field.scss';
</style>
