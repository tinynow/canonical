<template>
<div class="canon-repeater__container">
    <div
        v-for="(item, index) in contents"
        :key="index"
        class="canon-repeater__item"
    >
        <slot v-bind="{ add, remove, index, update }" />
    </div>
</div>
</template>

<script>
    let original = null;
    export default {
        name: 'CanonRepeater',
        model: {
            prop: 'dataModel',
            event: 'input',
        },
        props: {
            dataModel: {
                type: Array,
                default: () => [],
            },
        },
        data() {
            return {
                contents: [],
                original: null,
            };
        },
        count: 0,
        mounted() {
            original = this.$scopedSlots.default()
            this.contents.push(original);
        },
        methods: {
            add(index, addAction) {
                const clone = [...original];
                this.contents.splice(index, 0, clone);
                this.dataModel.splice(index, 0, clone);
                addAction ? addAction(index) : null;
            },
            remove(index, removeAction) {
                console.log(index);
                this.contents.splice(index, 1);
                this.dataModel.splice(index, 1);
                removeAction ? removeAction(index) : null;
            },
            update(index, payload) {
                this.dataModel[index] = payload;
                this.$emit('input');
            },
        },
    }
</script>