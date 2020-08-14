<template>
<fieldset class="canon-c-fieldset--control-group">
    <legend>{{ label }}</legend>
    <canon-checkbox
        v-for="(option, index) in options"
        :id="id + index"
        :key="option.value"
        v-model="option.checked"
        :label="option.label"
        :name="id"
        :value="option.value"
        @change="onChange($event, option)"
    />
</fieldset>
</template>

<script>
import CanonCheckbox from './Checkbox';

export default {
    name: 'CanonCheckboxList',
    components: {
        CanonCheckbox,
    },
    model: {
        prop: 'options',
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
    },
    data() {
        return {
            selected: [],
        };
    },
    methods: {
        onChange(checked, option) {
            option.checked = checked;
            this.$emit('change', option);
        },

    },
};
</script>
