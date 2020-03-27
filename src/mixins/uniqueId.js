import uniqueId from '../utils/uniqueId';

export default {
    computed: {
        uid() {
            return this.id ? this.id : uniqueId('uid_')
        },
    },
}