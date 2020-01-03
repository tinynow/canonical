<template>
<fieldset class="canon-c-fieldset--control-group">
    <legend>{{ question }}</legend>
    <canon-radio-button
        v-for="(option) in options"
        :id="id + option.label"
        :key="option.value"
        :label="option.label"
        :name="id"
        :value="option.value"
        @change="updateAnswer(option)"
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
    props: {
        options: {
            type: Array,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    methods: {
        updateAnswer(option) {
            this.$emit('change', option);
        },
    },
};
</script>
