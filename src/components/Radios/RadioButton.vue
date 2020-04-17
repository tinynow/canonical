<template>
<div class="canon-c-radio">
    <input
        :id="uid"
        class="canon-c-radio__input"
        :value="value"
        :name="name"
        :checked="shouldBeChecked"
        type="radio"
        @change="onChange"
    >
    <label 
        v-if="label"
        :for="uid"
        class="canon-c-radio__label"
    >
        <span
            class="canon-c-radio__label-text"
        >{{ label }}</span>
        <span
            v-if="html"
            class="canon-c-radio__label-text"
            v-html="html"
        />

    </label>
</div>
</template>

<script>
import uniqueId from '../../mixins/uniqueId';

export default {
    name: 'CanonRadioButton',
    mixins: [
        uniqueId,
    ],
    model: {
        prop: 'modelValue',
        event: 'change',
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            default: '',
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
            default: '',
        },
        html: {
            type: String,
            default: '',
        },
    },
    computed: {
        shouldBeChecked() {
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
.canon-c-radio {
    @include binary-control($size: 1rem);
}
</style>