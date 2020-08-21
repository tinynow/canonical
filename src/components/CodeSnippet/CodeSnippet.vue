<template>
<code 
    v-escape-slot
><slot /></code>
</template>

<script>
    export default {
        name: 'CanonCodeSnippet',
        directives: {
            escapeSlot: {
                bind(el) {
                    const html = el.innerHTML;
                    el.textContent = html;
                },
            },
        },
    }
</script>

<style lang="scss">
.canon-code-snippet {
    overflow-x: scroll;
    font-family: $monospace-font-family;
}
</style>