<template>
<div class="canon-layout --tube ph1">
    <h1>Kitchen Sink</h1>
    <canon-repeater
        v-slot="{add, index, remove }"
        @added="added"
        @removed="removed"
    >
        <canon-field
            :id="`color_${index}`"
            type="text"
            :value="vals[index]"
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
        removed(index) {
            this.vals.splice(index, 1);
        },
        added(index) {
            this.vals.splice(index, 0, {color:'', label: ''});
        },
    },
}
</script>

<style lang="scss">

</style>