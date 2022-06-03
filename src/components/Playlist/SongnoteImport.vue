<template>
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
</template>

<script>
import CanonField from './../Field';
export default {
    name: 'SongnoteImport',
    components: {
        CanonField,
    },
    

}
</script>

<style lang="scss" scoped>

</style>