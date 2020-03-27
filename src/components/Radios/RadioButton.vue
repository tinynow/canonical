<template>
<div class="canon-c-radio">
    <input
        :id="uid"
        class="canon-c-radio__input"
    >
    <label 
        :for="uid"
        class="canon-c-radio__label"
    ><span class="canon-c-radio__label-text">{{ label }}</span></label>
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