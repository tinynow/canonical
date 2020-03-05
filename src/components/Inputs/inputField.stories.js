export default { 
    title: 'Form/Field',
};

export const base = () => ({
    template: `<canon-input-field><template v-slot:label>Some value that fits on one line</template></canon-input-field>`,
});

export const withHint = () => ({
    template: `
    <canon-input-field>
        <template v-slot:label>Some value that fits on one line</template>
        <template v-slot:hint>Hint text: this is a hint</template>
    </canon-input-field>`,
});