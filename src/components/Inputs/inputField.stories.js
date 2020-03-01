import Vue from 'vue';
import CanonField from './InputField.vue';
export default { 
    title: 'Form/Field',
    component: CanonField,
};

export const base = () => ({
    components: { CanonField },
    template: `<canon-field><template v-slot:label>Some value that fits on one line</template></canon-field>`,
});

export const withHint = () => ({
    components: { CanonField },
    template: `
    <canon-field>
        <template v-slot:label>Some value that fits on one line</template>
        <template v-slot:hint>Hint text: this is a hint</template>
    </canon-field>`,
});