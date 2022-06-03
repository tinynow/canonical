<template>
<div>
    <h1>{{ user.name }}&apos;s Playlists</h1>
    <template v-if="playlists.length">
        <songnote-mixes />
    </template>
    <template v-else>
        <p>Looks like you don't have any playlists.</p>
        <h2>Import a Spotify playlist...</h2>
    </template>
    <songnote-import />
</div>
</template>

<script>
import SongnoteImport from './SongnoteImport';
import SongnoteMixes from './SongnoteMixes';

export default {
    name: 'SongnoteHome',

    components: {
        SongnoteImport,
    },
    data() {
        return {
            playlistInputVal: '',
            playlist: [],
            rawResponse: null,
            showPreviews: false,
        };
    },
    computed: {
        user() {
            return { loggedIn: false }
        },
        playlistId() {
            // 7vdEZv4c4MG391dfTFqN95
            // spotify:playlist:7vdEZv4c4MG391dfTFqN95
            if (this.playlistInputVal.startsWith('spotify:playlist:')) {
                return this.playlistInputVal.substring(17);
            } else {
                return this.playlistInputVal;
            }
        },


    },
    methods: {
        fetchPlaylist(playlistId) {
            // if (playlistId === this.playlistId) {
            //     return;
            // }
            // const params = new URLSearchParams();
            // params.append('playlistId', this.playlistId);
            // const uri = `${PLAYLIST_ENDPOINT}?${params}`;
            // return fetch(uri)
            // .then(response => response.text())
            // .then(result => {
            //     this.rawResponse = JSON.parse(result);
            //     console.log(JSON.parse(result));
            // });
            this.rawResponse = fakeResponse;

        },
        playlistName() {
            return this.rawResponse.name;
        },
    },
}
</script>

<style lang="scss">

</style>