<template>
<div class="canon-playlist  canon-layout --tube --auto-flow --readable">
    <div class="canon-playlist__selector">
        <canon-field
            v-model="playlistInputVal"
            type="text"
        >
            <span slot="label">Paste a Spotify Playlist ID or URI</span>
            <span
                slot="hint"
                class="ctx-text --document"
            >
                Examples: <code class="canon-u-compact--xs">spotify:playlist:0hqMZ0dfGKiaq37NSmM1Oq</code> or <code class="canon-u-type--xs">https://open.spotify.com/playlist/0hqMZ0dfGKiaq37NSmM1Oq</code>
            </span>
            <canon-button slot="suffix" class="flex-shrink-0" @click="fetchPlaylist">
                Get Playlist {{ playlistId }}
            </canon-button>
        </canon-field>
    </div>
    <div v-if="rawResponse">
        <pre>
playlist: {{ Object.keys(rawResponse) }}
playlist.tracks: {{ Object.keys(rawResponse.tracks) }}
playlist.tracks.items[index]: {{ Object.keys(rawResponse.tracks.items[0]) }}
playlist.tracks.items[index].track: {{ Object.keys(rawResponse.tracks.items[0].track) }}
playlist.tracks.items[index].track.artists[index]: {{ Object.keys(rawResponse.tracks.items[0].track.artists[0]) }}
playlist.tracks.items[index].track.external_urls: {{ Object.keys(rawResponse.tracks.items[0].track.external_urls) }}
playlist.tracks.items[index].track.album: {{ Object.keys(rawResponse.tracks.items[0].track.album) }}
playlist.tracks.items[index].track.album.images: {{ Object.keys(rawResponse.tracks.items[0].track.album.images) }}
playlist.tracks.items[index].track.album.images[0]: {{ Object.keys(rawResponse.tracks.items[0].track.album.images[0]) }}
playlist.tracks.items[index].track.external_ids: {{ Object.keys(rawResponse.tracks.items[0].track.external_ids) }}
playlist.tracks.items[index].track.album: {{ Object.keys(rawResponse.tracks.items[0].track.album) }}


        </pre>
        <div class="playlist-header w-100 bg--dark text--light flex">
            <img
                :src="rawResponse.images[1].url"
                alt=""
            >
            <div>
                <h2><a :href="rawResponse.external_urls.spotify">{{ rawResponse.name }}</a></h2>
                <p>
                    created by <a :href="rawResponse.owner.external_urls.spotify">{{ rawResponse.owner.display_name }}</a>   
                    {{ rawResponse.collaborative ? 'with others' : '' }}
                </p>
            </div>
        </div>
        <ol class="canon-track-list reset-list">
            <li
                v-for="(track, index) in rawResponse.tracks.items"
                :key="track.track.name"
                class="canon-track"
            >
                <div class="flex items-center pt1">
                    <span class="pr3 pv2 canon-u-type--sm">{{ index + 1 }}</span>
               
                    <img
                        class="flex-shrink-0 show-at-md"
                        :src="track.track.album.images[2].url"
                        :width="track.track.album.images[2].width"
                        :height="track.track.album.images[2].height"
                    > 
                    <div class="pl1">
                        <h3 class="canon-u-type--1">
                            {{ track.track.name }} {{ track.track.external_ids }}
                        </h3>
                        <a
                            v-for="artist in track.track.artists"
                            :key="artist.id"
                            :href="artist.external_urls.spotify"
                            class="pr1"
                        >
                            {{ artist.name }}
                        </a>
                    </div>
            
                    <span class="mlauto mr0">{{ millisecondsToEnglish(track.track.duration_ms) }}</span>
                </div>
                <button
                    v-if="showPreviews"
                    class="canon-track__preview-toggle reset-button pl1 link-style"
                    :aria-expanded="track.previewExpanded"
                    @click="togglePlayer(track.track.id)"
                >
                    Preview
                </button>
                <audio
                    v-if="showPreviews"
                    :ref="track.track.id"
                    class="db w-100"
                    controls
                    :src="track.track.preview_url"
                >
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
                <div class="canon-track-notes">
                </div>
            </li>
        </ol>
        <pre>
            {{ savedTrack }}
        </pre>
    </div>
</div>
</template>

<script>

import CanonField from '../Field/Field';
import CanonButton from '../Button/Button';
import fakeResponse from '../../../api/fakePlaylistResponseBody.json';
import extractSpotifyId from './helpers/extractSpotifyId';
import millisecondsToEnglish from './helpers/millisecondsToEnglish';

const PLAYLIST_ENDPOINT = '../.netlify/functions/getPlaylist';
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
            rawResponse: fakeResponse,
            showPreviews: false,
            savedTrack: null,
        };
    },
    computed: {
        playlistId() {
          return extractSpotifyId(this.playlistInputVal);
        },
    },
    methods: {
        fetchPlaylist(playlistId) {
            if (playlistId === this.playlistId) {
                return;
            }
            const params = new URLSearchParams();
            params.append('playlistId', this.playlistId);
            const uri = `${PLAYLIST_ENDPOINT}?${params}`;
            // return fetch(uri, PLAYLIST_REQUEST_OPTIONS )
            // .then(response => response.json())
            // .then(result => {
            //     this.rawResponse = result;
            // });
            this.rawResponse = fakeResponse;
            // this.savePlaylist()
        },

        savePlaylist() {
            this.createTracks(this.rawResponse.tracks.items).then(response => {
                console.log(response);
                // this.createPlaylist();
            });
        },
        createPlaylist() {

        },
        createTracks(data) {
            return fetch('/.netlify/functions/tracksCreate', {
                body: JSON.stringify(data),
                method: 'POST',
            }).then(response => {
                return response.json()
            });
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
        millisecondsToEnglish,
    },
}
</script>

<style lang="scss">
audio {
    border-radius: 400px;
}
</style>