<template>
<form novalidate>
    <slot name="before" />
    <slot />
    <slot name="after" />
</form>
</template>

<script>
    export default {
        name: 'CanonForm',
    }
</script>
