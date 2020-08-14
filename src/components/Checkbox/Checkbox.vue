<template>
<div class="canon-c-checkbox">
    <input
        :id="uid"
        class="canon-c-checkbox__input"
        :value="value"
        :checked="checked"
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

export default {
    name: 'CanonCheckbox',
    mixins: [
        uniqueId,
    ],
    model: {
        prop: 'checked',
        event: 'change',
    },
    props: {
        id: {
            type: String,
            default: '',
        },
        value: {
            type: [String, Boolean],
            required: false,
            default: '',
        },
        checked: {
            type: Boolean,
            default: false,
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
    methods: {
        onChange(event) {
            this.$emit('change', event.target.checked ? this.trueValue : this.falseValue); 
        },
    },
};
</script>
<style lang="scss">
.canon-c-checkbox {
    @include binary-control($size: 1.125rem, $checkbox: true );
}
</style>