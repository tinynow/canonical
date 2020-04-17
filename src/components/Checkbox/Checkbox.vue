<template>
<div class="canon-c-checkbox">
    <input
        :id="uid"
        class="canon-c-checkbox__input"
        :value="value"
        :checked="shouldBeChecked"
        type="checkbox"
        @change="onChange"
    >
    <label 
        :for="uid"
        class="canon-c-checkbox__label"
    >
        <span class="canon-c-checkbox__label-text">
            <slot name="label">{{ label }}</slot>
        </span>
    </label>
</div>
</template>

<script>
import uniqueId from '../../mixins/uniqueId';
import requireSlots from '../../mixins/requireSlots';

export default {
    name: 'CanonCheckbox',
    mixins: [
        requireSlots,
        uniqueId,
    ],
    model: {
        prop: 'modelValue',
        event: 'change',
    },
    props: {
        value: {
            type: [String, Boolean],
            required: false,
            default: null,
        },
        modelValue: {
            type: [String, Boolean],
            default: '',
        },
        label: {
            type: String,
            required: true,
        },
        trueValue: {
            type: [Boolean, String],
            default: true,
        },
        falseValue: {
            type: [Boolean, String],
            default: false,
        },
    },
    computed: {
        shouldBeChecked() {
            if (this.modelValue instanceof Array) {
                return this.modelValue.includes(this.value);
            }
            return this.modelValue === this.trueValue;
        },
    },
    methods: {
        onChange(event) {
            if (this.modelValue instanceof Array) {
                const newValue = [...this.modelValue];
                if  (event.target.checked) {
                    newValue.push(this.value);
                } else {
                    newValue.splice(newValue.indexOf(this.value), 1);
                }
                this.$emit('change', newValue);
            } else {
                this.$emit('change', event.target.checked ? this.trueValue : this.falseValue);
            }
        },
    },
};
</script>
<style lang="scss">
.canon-c-checkbox {
    @include binary-control($size: 1rem, $checkbox: true );
}
</style>