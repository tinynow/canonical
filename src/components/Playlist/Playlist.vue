<template>
<div class="canon-playlist"> 
    <!-- title -->
    <!-- tracks -->
    <ul class="canon-track-list">
        <li
            v-for="track in playlist"
            :key="track._id"
            class="canon-track"
        >
            <h2>
                {{ track.title }}
            </h2>
            <div class="canon-track__notes">
                <!--notes-->
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'CanonPlaylist',
    data() {
        return {
            playlist: [],
        };
    },
}
</script>

<style lang="scss">

</style>