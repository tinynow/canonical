import millisecondsToEnglish from './helpers/millisecondsToEnglish';

const spotifyToSongNoteTrack = t => ({
    name: t.track.name,
    duration: millisecondsToEnglish(t.track.duration_ms),
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
        user: window.localStorage.getItem('songnote_user'),
    },
    getters: {
        getUserStatus: state => !!state.user,
        getUser: state => JSON.parse(state.user),
    },
    mutations: {
        SET(state, {key, value}) {
            state[key] = value;
        },
        SET_USER(state, currentUser) {
            if (!currentUser) {
                state.user = null;
                window.localStorage.removeItem('songnote_user');
                return;
            }
            state.user = JSON.stringify(currentUser);
            window.localStorage.setItem('songnote_user', state.user)
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
        createAccount() {
            netlifyIdentity.open('signup'); 
        },
        // logIn() {
        //     netlifyIdentity.open('login'); 
        // },
        updateUser({ commit }, payload) {
            commit('SET_USER', payload.currentUser);
        }, 
    },
}