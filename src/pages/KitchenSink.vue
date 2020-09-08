<template>
<div>
    <h1>Kitchen Sink</h1>
    <canon-repeater
        v-slot="{add, index, remove, update}"
        v-model="vals"
    >
        <canon-field
            :id="`color_${index}`"
            type="text"
            @input="update(index, $event)"
        >
            <template slot="label">
                Color {{ index }}
            </template>
        </canon-field>
        <div>
            <button
                @click="add(index)"
            >
                Add
            </button>
            <button
                @click="remove(index)"
            >
                Remove
            </button>
        </div>
    </canon-repeater>
</div>
</template>

<script>
import CanonField from '../components/Field/Field';
import CanonRepeater from '../components/Repeater/Repeater';
export default {
    name: 'KitchenSinkPage',
    components: {
        CanonRepeater,
        CanonField,
    },
    data() {
        return {
            vals: [
                {
                    color: '#fff',
                    label: 'White',
                },
                {
                    color: '#676767',
                    label: 'Gray',
                },
            ],
        };
    },
    methods: {
        removeData(index) {
            this.vals.splice(index, 1);
        },
    },
}
</script>

<style lang="scss">

</style>