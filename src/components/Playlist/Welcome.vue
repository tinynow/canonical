<template>
<div class="canon-layout --tube --auto-flow tc pt3">
    <h2 class="fw800">
        Your playlists were born from a backstory, not an algorithm.
    </h2>
    <div>
        <p class="canon-u-type--2">
            Make them personal again.
        </p>
        <p class="canon-u-type--2">
            Import Spotify playlists or curate a new mix. Add notes. Share.
        </p>
    </div>
    
    <div class="flex items-center justify-center pv3">
        <button
            class="canon-button canon-u-type--3"
            type="button"
            aria-describedby="disclaimer"
            @click="createAccountClick"
        >
            Get Early Access*
        </button>
    </div>

    <p
        id="disclaimer"
        class="pa1 bg--dark text--light"
    >
        *This app is in beta! I will do my best to avoid losing anything you save here, but please proceed with caution.
    </p>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('songNotes');

export default {
    name: 'NewUser',
    methods: {
        ...mapActions([
            'createAccount',
        ]),
        createAccountClick() {
            this.createAccount();
        },
    },
}
</script>

<style lang="scss" scoped>

</style>