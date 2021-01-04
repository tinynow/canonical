<template>
<button
    class="canon-clip"
    type="button"
    @click="copy"
> 
    <span class="canon-clip__label">{{ clipped ? 'Copied' : 'Click to Copy' }}:</span>&nbsp;
    <span class="canon-clip__slot"><slot /></span>
</button>
</template>

<script>
export default {
    name: 'CanonClip',
    data() {
        return {
            clipped: false,
        }
    },
    methods: {
        async copy() {
            await navigator.clipboard.writeText(this.$slots.default[0].text).then(() => { this.clipped = true });
        },
    },
}
</script>

<style lang="scss">
@import "clip.scss";
</style>