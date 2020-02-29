import Vue from 'vue';
import CanonField from './InputField.vue';

export default { title: 'Field' }

export const base = () => ({
    components: { CanonField },
    template: `<canon-field><template v-slot:label>Some value that fits on one line</template></canon-field>`,
});