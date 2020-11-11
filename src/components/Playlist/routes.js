import PlaylistSelect from './PlaylistSelect.vue';
import Playlist from './Playlist.vue';
import Welcome from './Welcome.vue';

export default [
    {
        path: '/',
        component: PlaylistSelect,
    },
    {
        path: 'welcome',
        component: Welcome,
    },
    {
        path: 'playlist',
        component: Playlist,
    },
];