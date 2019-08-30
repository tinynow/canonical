<template>
<button
    class="canon-c-button"
    :type="type"
    :style="cssVars"
>
    <slot name="content" />
</button>
</template>

<script>
export default {
    name: 'CanonButton',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        theme: {
            type: String,
            default: 'dark',
            validator(val) {
                if (['dark', 'light'].includes(val)) {
                    return true;
                } else {
                    console.error(
                        'Theme should be "dark" for light background or "light" for dark'
                    );
                    return false;
                }
            },
        },
        baseColor: {
            type: String,
            default() {
                return this.theme === dark ? 'hsl(0,0%,6%)' : 'white';
            },
        },
    },
    computed: {
        cssVars() {
            return {
                '--baseColor': this.baseColor,
            };
        },
    },
};
</script>

<style lang="scss">
</style>