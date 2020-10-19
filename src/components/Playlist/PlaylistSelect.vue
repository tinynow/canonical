<template>
<div>
    {{ this.$store.state }}
    <div
        v-if="!user.loggedIn"
        class="canon-layout --auto-flow-compact"
    >
        <p>
            Your music has a story. Share it.
            Liner love notes.
            Mixtape liner notes of the future.
            Playlists personalized.
            Annotate tracks.
        </p>
        <div class="canon-playlist__selector canon-layout --auto-flow-compact">
            <canon-field
                v-model="playlistInputVal"
                type="text"
            >
                <span slot="label">Import a playlist</span>
                <span slot="hint">Paste a Spotify playlist ID or URI</span>
            </canon-field>
        
            <canon-button @click="fetchPlaylist">
                Get Playlist {{ playlistId }}
            </canon-button>
        </div>
    </div>
    <div v-else>
        <div
            v-if="!user.hasPlaylists"
        >
            Here are your playlists.
        </div>
    </div>
</div>
</template>

<script>
import CanonField from '../Field/Field';
import CanonButton from '../Button/Button';
import fakeResponse from '../../../api/fakePlaylistResponseBody.json';
const PLAYLIST_ENDPOINT = '.netlify/functions/getPlaylist';
const PLAYLIST_REQUEST_OPTIONS = {
    method: 'GET',
};

export default {
    name: 'CanonPlaylistSelect',

    components: {
        CanonField,
        CanonButton,
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
            return { loggedIn: false}
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