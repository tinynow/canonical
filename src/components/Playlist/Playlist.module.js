// with gratitude: https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const milliToSeconds = milliseconds => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const spotifyToSongNoteTrack = t => ({
    name: t.track.name,
    duration: milliToSeconds(t.track.duration_ms),
    isrc: t.track.external_ids.isrc,
    spotify_id: t.track.id,
    album: {
        name: t.track.album.name,
        spotify_id: t.track.album.id,
        release_date: t.track.album.release_date,
        images: t.track.album.images,
    },
    artists: Array.map(t.track.artists, artist => ({
        name: artist.name,
        spotify_id: artist.id,
    })),
});

export default {
    namespaced: true,
    state: {
        user: null,
        playlists: [],
        ui: 'empty',
    },
    mutations: {
        SET(state, {key, value}) {
            state[key] = value;
        },
    },
    actions: {
        async fetchSpotifyPlaylist({dispatch,commit},playlistId) {
            if (playlistId === this.playlistId) {
                return;
            }
            const params = new URLSearchParams();
            params.append('playlistId', this.playlistId);
            const uri = `${PLAYLIST_ENDPOINT}?${params}`;
            const response = await fetch(uri, PLAYLIST_REQUEST_OPTIONS);
            const result = await response.json();
            
            dispatch('savePlaylist', Array.map(result, spotifyToSongNoteTrack));
        },

        async savePlaylist({dispatch, state}) {
            dispatch('createTracks', state.rawResponse.tracks.items)
            .then(response => {

                console.log(response);
                // this.createPlaylist();
            });
        },
        async createPlaylist(context, data) {
            const response = await fetch('/.netlify/functions/playlistCreate', {
                body: JSON.stringify(data),
                method: 'POST',
            });
            return response.json();
        },
        async createTracks(context, data) {
            const response = await fetch('/.netlify/functions/tracksCreate', {
                body: JSON.stringify(data),
                method: 'POST',
            });
            return response.json();
        },
        
    },
}