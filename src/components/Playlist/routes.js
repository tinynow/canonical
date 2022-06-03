import PlaylistApp from './PlaylistApp.vue';
import Playlist from './Playlist.vue';
import Welcome from './Welcome.vue';
import Start from './Start.vue';
import SongnoteMixes from ''

export default { 
    path: '/songnotes',
    component: PlaylistApp,
    children: [
        {
            name: 'Welcome',
            path: '/',
            component: SongnoteWelcome,
        },
        {
            name: 'Home',
            path: 'mixes/:userId',
            component: SongnoteHome,
        },
        {
            name: 'Edit',
            path: 'mixes/:userId/:mixId',
            component: SongnotePlaylist,
        },
    ],
};