<template>
<a
    :id="uid"
    :href="'#' + uid"
    aria-hidden="true"
    class="canon-anchor-link"
>
    <canon-icon icon-name="link" />
</a>
</template>

<script>
    import CanonIcon from '../Icon'
    import uniqueId from '../../mixins/uniqueId'
    export default {
        name: 'CanonAnchorLink',
        components: {
            CanonIcon,
        },
        mixins: [
            uniqueId,
        ],
        props: {
            id: {
                type: String,
                default: '',
            },
        },
    }
</script>

<style lang="scss">
@import 'anchor-link.scss';
</style>