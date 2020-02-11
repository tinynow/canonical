<template>
<div>
    <label
        :for="uid"
    >
        <slot name="label" />
    </label>
    <input
        :id="uid"
        :type="type"
    >
</div>
</template>

<script>
import uniqueId from '../../functions/utilities/uniqueId'
export default {
    name: 'CanonInputBase',
    props: {
        id: {
            type: [String, null],
            default: null,
        },
        type: {
            type: String,
            default: 'text',
            validator(val) {
                const valid = [
                    'text',
                    'number',
                    'tel',
                    'email',
                    'password',
                    'search',
                    'url',
                ]
                return valid.includes(val);
            },
        },
    },
    computed: {
        uid() {
            return this.id ? this.id : uniqueId('uid_')
        },
    },
}
</script>