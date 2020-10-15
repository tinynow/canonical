const INITIAL_STATE = {};
const saveInitialState = (store,paths) => {
    const stateFragment = {};
    
}

export default (options = {
    watchedMutations: null,
    preservedStatePaths: null,
}) => ({
    data() {
        return {
            done: [],
            undone: [],
            newMutation: true, //flag to invalidate undone/disable redo
        };
    },
    computed: {
        canUndo() {
            return this.done.length;
        },
        canRedo() {
            return this.undone.length;
        },
    },
    created() {
        INITIAL_STATE = JSON.parse(JSON.stringify(this.$store.state));
        this.$store.registerModule('undoHistory', {
            namespaced: 'true',
            state() {
                return {
                    done: [],
                    undone: [],
                };
            },
            mutations: {
                EMPTY_STATE(state) {
                    this.replaceState(INITIAL_STATE)
                },
            },
        })
        this.$store.subscribe(mutation => {
            if (options.mutations && options.mutations.some(watch => )) {
                if (mutation.type !== EMPTY_STATE) {
                    this.done.push(mutation);
                }
                if (this.newMutation) {
                    this.undone = [];
                }
            }
        });
    },
    methods: {
        undo() {
            this.undone.push(this.done.pop());
            this.newMutation = false;
            this.$store.commit(EMPTY_STATE);
            this.done.forEach(mutation => {
                this.$store.commit(`${mutation.type}`, mutation.payload);
                this.done.pop();
            });
            this.newMutation = true;
        },
        redo() {
            let commit = this.undone.pop();
            this.newMutation = false;
            this.$store.commit(`${commit.type}`, commit.payload);
            this.newMutation = true;
        },
    },
});