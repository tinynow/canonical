<script>
    let original = null;
    export default {
        name: 'CanonRepeater',
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
                count: 1,
            };
        },
        methods: {
            add(index) {
                const clone = [...original];
                this.contents.splice(index, 0, clone);
                this.$emit('added', index);
            },
            remove(index) {
                console.log(arguments);
                this.contents.splice(index, 1);
                this.$emit('removed', index);
            },
        },
        render(createElement) {
            this.original = [...this.$scopedSlots.default()]
            console.log(this.$scopedSlots.default())
            return createElement('div', 
                Array.apply(null, {length: 1}).map( (item, index) => {
                    return createElement('div', {attrs: { id: this.count}, scopedSlots: {
                        default: () => createElement('div',{add: this.add }, this.original),
                     }});
                })
            );

        },
    }
</script>