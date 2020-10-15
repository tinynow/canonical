<template>
<div class="canon-layout --tube --auto-flow">
    <h1>Annotate Playlists*</h1>
    <canon-playlist />
</div>
</template>

<script>
import CanonPlaylist from '../components/Playlist/Playlist';
export default {
    name: 'PlaylistPage',
    components: {
        CanonPlaylist,
    },
}
</script>
