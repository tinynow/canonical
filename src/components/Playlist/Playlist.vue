<template>
<div class="canon-playlist canon-layout --tube">
    <button @click="createUser(fakeUser)">
        user
    </button>
    <div v-if="view === 'import'">
        <div class="canon-playlist__selector pv3">
            <canon-field
                v-model="playlistInputVal"
                type="text"
                class="mw6"
                input-wrapper-classes="flex items-stretch"
            >
                <span slot="label">Paste a Spotify Playlist ID or URI</span>
                <div
                    slot="hint"
                >
                    <details>
                        <summary>Examples:</summary> 
                        <code class="canon-u-compact--xs">spotify:playlist:0hqMZ0dfGKiaq37NSmM1Oq</code> or <code class="canon-u-type--xs">https://open.spotify.com/playlist/0hqMZ0dfGKiaq37NSmM1Oq</code>
                    </details>
                </div>
                <canon-button slot="after" class="pa1 ml1 flex-shrink-0" @click="fetchPlaylist">
                    Get Playlist
                </canon-button>
                <p slot="error">
                    {{ getPlaylistError }}
                </p>
            </canon-field>
        </div>
    </div>


    <div class="slide">
        <div class="playlist-header w100 flex items-start">
            <img
                :src="playlist.images[1].url"
                alt=""
                class="flex-shrink-0 mw3"
            >
            <div class="ml2">
                <h2 class="canon-u-type--3 bold fw600">
                    {{ playlist.name }}
                </h2>
                <a :href="playlist.external_urls.spotify" class="ttu canon-u-type--xs">{{ playlist.source }} Playlist</a>
                <p class="di">
                    created by <a :href="playlist.owner.external_urls.spotify">{{ playlist.owner.display_name }}</a>   
                    {{ playlist.collaborative ? 'with others' : '' }}
                </p>
            </div>
        </div>
        <ol class="canon-track-list reset-list mt2">
            <li
                v-for="(track, index) in tracks"
                :key="track.name"
                class="canon-track mt1"
                :class="index === editing ? '--editing' : null"
            >
                <div class="flex items-start pt1">
                    <span class="pr1 pt1 canon-u-type--sm dn">{{ index + 1 }}</span>
                    
                    <img
                        v-if="false"
                        class="flex-shrink-0 show-at-md"
                        :src="track.album.images[2].url"
                        :width="track.album.images[2].width"
                        :height="track.album.images[2].height"
                    > 
                    <div>
                        <h3 :id="`id_${track.track.external_ids.isrc}`" class="canon-u-type--1 dib">
                            {{ track.track.name }}
                        </h3>
                        <a
                            v-for="artist in track.track.artists"
                            :key="artist.id"
                            :href="artist.external_urls.spotify"
                            class="pl1 canon-u-compact--0 dib"
                        >{{ artist.name }}
                        </a>
                    </div>
            
                    <span class="mlauto mr0 ml1">{{ millisecondsToEnglish(track.track.duration_ms) }}</span>
                </div>
                <transition name="slide-from-top">
                    <div v-if="index === editing" class="canon-track-notes">
                        <canon-editor />
                    </div>
                </transition>
                <button
                    v-if="index !== editing"
                    type="button"
                    :aria-describedby="`id_${track.track.external_ids.isrc}`"
                    :aria-expanded="index === editing ? 'true' : 'false'"
                    class="reset-button link-style"
                    @click="editing = index"
                >
                    Edit
                </button>
                <button
                    v-if="showPreviews"
                    class="canon-track__preview-toggle reset-button pl1 link-style"
                    :aria-expanded="previewExpanded"
                    @click="togglePlayer(track.id)"
                >
                    Preview
                </button>
                <audio
                    v-if="showPreviews && track.track.preview_url"
                    :ref="track.id"
                    class="db w100"
                    controls
                    :src="track.preview_url"
                >
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </li>
        </ol>
    </div>
</div>
</template>

<script>
import CanonField from '../Field/Field';
import CanonButton from '../Button/Button';
import CanonEditor from '../Editor/Editor';
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
        CanonEditor,
    },
    data() {
        return {
            view: 'import',
            playlistInputVal: '',
            playlist: {
                source: 'spotify',
            },
            rawResponse: fakeResponse,
            tracks: [],
            editing: null,
            showPreviews: false,
            savedTrack: null,
            getPlaylistError: null,
            fakeUser: {
                name: 'Fake Joe',
                id: 'fakeid',
            },
        };
    },
    computed: {
        playlistId() {
          return extractSpotifyId(this.playlistInputVal);
        },
    },
    beforeMount() {
        if (this.rawResponse) {
            this.loadPlaylist();
        }
    },
    methods: {
        fetchPlaylist(playlistId) {
            if (playlistId === this.playlistId) {
                return;
            }
            const params = new URLSearchParams();
            params.append('playlistId', this.playlistId);
            const uri = `${PLAYLIST_ENDPOINT}?${params}`;
            return fetch(uri, PLAYLIST_REQUEST_OPTIONS )
            .then(response => response.json())
            .then(result => {
                this.rawResponse = result;
                this.loadPlaylist();
            });
            // this.rawResponse = fakeResponse;
            // this.savePlaylist()
        },
        loadPlaylist() {
            const { tracks, ...playlistData } = this.rawResponse;
            const { items, ...trackData} = tracks;
            this.playlist = {
                ...this.playlist,
                ...playlistData,
                ...trackData,
            };
            this.tracks = tracks.items;
        },
        savePlaylist() {
            this.createTracks(this.rawResponse.tracks.items).then(response => {
                console.log(response);
                // this.createPlaylist();
            });
        },
        createPlaylist() {

        },
        // save an array of tracks to the tracks database
        createTracks(data) {
            return fetch('/.netlify/functions/tracksCreate', {
                body: JSON.stringify(data),
                method: 'POST',
            }).then(response => {
                return response.json()
            });
        },
        createUser(data) {
            return fetch('/.netlify/functions/userCreate', {
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