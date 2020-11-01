import Vue from 'vue';
import Vuex from 'vuex';
import colorTool from './components/Palette/Palette.module'
import songNotes from './components/Playlist/Playlist.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        colorTool,
        songNotes,
    },
});
