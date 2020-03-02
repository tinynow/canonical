import CanonTypography from './Typography.vue'

export default {
    title: 'Typography',
    component: CanonTypography,
}
export const intro = () => ({
    components: {CanonTypography},
    template: '<canon-typography/>',
});