<template>
<fieldset class="canon-c-fieldset--control-group">
    <legend>{{ label }}</legend>
    <canon-radio-button
        v-for="(option) in options"
        :id="id + option.label"
        :key="option.value"
        :label="option.label"
        :name="id"
        :value="option.value"
        :model-value="value"
        @change="onChange($event)"
    />
</fieldset>
</template>

<script>
import CanonRadioButton from './RadioButton';

export default {
    name: 'CanonRadioButtonList',
    components: {
        CanonRadioButton,
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        options: {
            type: Array,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            selected: this.value,
        };
    },
    methods: {
        onChange(optionValue) {
            this.selected = optionValue;
            this.$emit('change', this.selected);
        },
    },
};
</script>
