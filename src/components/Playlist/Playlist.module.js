const INITIAL_STATE = {
    
};
export default {
    namespaced: true,
    state: {
        user: null,
        playlists: null,
    },
    mutations: {
        SET(state, {key, value}) {
            state[key] = value;
        },
    },
    actions: {
        parseSpotifyPlaylist(context, payload) {
            const tracks = payload;

        },
    },
}