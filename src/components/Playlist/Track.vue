<template>
<li
    :key="name"
    class="canon-track"
>
    <div class="flex items-center pt1">
        <span class="pr3 pv2 canon-u-type--sm">{{ playlist }}</span>
               
        <img
            class="flex-shrink-0 show-at-md"
            :src="album.images[2].url"
            :width="album.images[2].width"
            :height="album.images[2].height"
        > 
        <div class="pl1">
            <h3 class="canon-u-type--1">
                {{ name }} {{ external_ids }}
            </h3>
            <a
                v-for="artist in artists"
                :key="artist.id"
                :href="artist.external_urls.spotify"
                class="pr1"
            >
                {{ artist.name }}
            </a>
        </div>
            
        <span class="mlauto mr0">{{ millisecondsToEnglish(duration_ms) }}</span>
    </div>
    <button
        v-if="showPreviews"
        class="canon-track__preview-toggle reset-button pl1 link-style"
        :aria-expanded="track.previewExpanded"
        @click="togglePlayer(id)"
    >
        Preview
    </button>
    <audio
        v-if="showPreviews"
        :ref="id"
        class="db w100"
        controls
        :src="preview_url"
    >
        Your browser does not support the
        <code>audio</code> element.
    </audio>
    <div class="canon-track-notes">
    </div>
</li>
</template>

<script>
    export default {
        name: 'CanonTrack',

        
    }
</script>

<style lang="scss">

</style>