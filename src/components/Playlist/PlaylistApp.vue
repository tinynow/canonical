<template>
<div>
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
    created() {
        this.identify();
    },
    methods: {
        ...mapActions([
            'fetchNewPlaylist',
            'changeUi',
            'identify',
        ]),

    },

}
</script>