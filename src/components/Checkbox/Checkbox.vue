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
    ><span class="canon-c-checkbox__label-text">{{ label }}</span></label>
    {{ shouldBeChecked }}
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
        id: {
            type: String,
            required: true,
        },
        value: {
            type: [String, Boolean],
            required: false,
            default: null,
        },
        modelValue: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            required: true,
        },
    },
    computed: {
        shouldBeChecked() {
            if (typeof this.value === Boolean) {
                return this.value;
            }
            return this.modelValue === this.value;
        },
    },
    methods: {
        onChange() {
            this.$emit('change', this.value);
        },
    },
};
</script>
<style lang="scss">
.canon-c-checkbox {
    @include binary-control($size: 1rem, $checkbox: true );
}
</style>