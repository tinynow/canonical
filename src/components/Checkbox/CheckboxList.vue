<template>
<fieldset class="canon-checkbox-list canon-fieldset--control-group">
    <legend>
        <slot name="legend">
            {{ legend }}
        </slot>
    </legend>
    <div
        v-if="$slots.hint"
        class="canon-fieldset__hint-slot"
    >
        <slot name="hint" />
    </div>
    <div class="canon-checkbox-list">
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
    </div>
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
        legend: {
            type: String,
            default: '',
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
