export default {
    computed: {
        emptySlots() {
            if (this.requiredSlots) {
                return this.requiredSlots.filter(slotName => !this.$slots[slotName]);
            }
            return [];
        },
    },
    mounted() {
        if (this.emptySlots.length) {
            this.emptySlots.forEach(slotName => {
                throw `Slot "${slotName}" cannot be empty in <${this.$options._componentTag}/>.`;
            });
        }
    },
}