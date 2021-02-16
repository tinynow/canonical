<template>
<div>
    <header class="pa1 bg--dark text--light flex">
        <p>songnotes</p>
        <div class="mlauto mr0">
            <div data-netlify-identity-menu></div>
        </div>
    </header>
    <router-view />
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('songNotes');

export default {
    name: 'CanonPlaylistApp',
    computed: {
        ...mapState({
            user: state => state.user,
            playlists: state => state.playlists,
            ui: state => state.ui,
        }),
    },
    mounted() {
        this.identify();
    },
    methods: {
        ...mapActions([
            'identify',
        ]),

    },

}
</script>
<style lang="scss">
.netlify-identity-menu {
    text-indent: initial;
    margin: initial;
}
.netlify-identity-item {
    display: inline-block;
    padding: 0 0 0 $space/4;
}
</style>