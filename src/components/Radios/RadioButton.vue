<template>
<div class="canon-c-radio">
    <input
        :id="id"
        class="canon-c-radio__input"
        :value="value"
        :name="name"
        :checked="shouldBeChecked"
        type="radio"
        @change="onChange"
    >
    <label 
        :for="id"
        class="canon-c-radio__label"
    >{{ label }}</label>
</div>
</template>

<script>
export default {
    name: 'CanonRadioButton',
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
    @include binary-control();
}
</style>