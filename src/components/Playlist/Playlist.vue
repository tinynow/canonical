<template>
<div class="canon-playlist">
    <div class="canon-playlist__selector canon-layout --auto-flow-compact">
        <canon-field
            v-model="playlistInputVal"
            type="text"
        >
            <span slot="label">Spotify Playlist ID or URI</span>
        </canon-field>
        
        <canon-button @click="fetchPlaylist">
            Get Playlist {{ playlistId }}
        </canon-button>
    </div>
    <div v-if="rawResponse">
        <h2>{{ playlistName() }}</h2>
        <p>
            created by <a href="rawResponse.owner.external_urls.spotify">{{ rawResponse.owner.display_name }}</a>   
            {{ rawResponse.collaborative ? 'with others' : '' }}
        </p>

        <ul class="canon-track-list reset-list">
            <li
                v-for="track in rawResponse.tracks.items"
                :key="track.track.name"
                class="canon-track"
            >
                <h3 class="canon-u-type--1 dib">
                    {{ track.track.name }}
                </h3>
                <p
                    v-for="artist in track.track.artists"
                    :key="artist.id"
                    class="dib pl1"
                >
                    {{ artist.name }}
                </p>
                <button
                    class="canon-track__preview-toggle reset-button pl1 link-style"
                    :aria-expanded="track.previewExpanded"
                    @click="togglePlayer(track.track.id)"
                >
                    Preview
                </button>
                <audio
                    :ref="track.track.id"
                    class="db w-100"
                    controls
                    :src="track.track.preview_url"
                >
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </li>
        </ul>
        <pre>
            {{ rawResponse.tracks.items[0] }}
        </pre>
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
    name: 'CanonPlaylist',
    components: {
        CanonField,
        CanonButton,
    },
    data() {
        return {
            playlistInputVal: '',
            playlist: [],
            rawResponse: null,
        };
    },
    computed: {
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
        togglePlayer(id) {
            const player = this.$refs[id][0];
            console.log(player)
            if ( player.paused ) {
                async () => {
                    try {
                        await player.play();
                    } catch(err) {

                    }
                }
            } else {
                player.pause();
            }
        },

    },
}
</script>

<style lang="scss">
audio {
    border-radius: 400px;
}
</style>