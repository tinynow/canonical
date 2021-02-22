import PlaylistApp from './PlaylistApp.vue';
import Playlist from './Playlist.vue';
import Welcome from './Welcome.vue';
import Start from './Start.vue';

export default { 
    path: '/songnotes',
    component: PlaylistApp,
    children: [
        {
            path: '/',
            component: Welcome,
        },
        {
            path: 'app',
            component: Start,
        },
        {
            path: 'playlist',
            component: Playlist,
        },
    ],
};