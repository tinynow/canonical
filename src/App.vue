<template>
<div id="app">
    <canon-palette />
    <header>
        <router-link to="/docs">
            Documentation
            Palette
        </router-link>
    </header>
    <router-view />
</div>
</template>
<script>
import CanonPalette from './components/Palette';
//import CanonProse from './components/Prose';
import navigationData from './data/menu.json';


export default {
    name: 'App',
    components: {
        CanonPalette,
    },
    data() {
        return {
            navigationData,
        };
    },
    // computed: {
    //     route
    // },
};
</script>
<style lang="scss">
@import './styles/global.scss';
.canonical-card {
    box-shadow: 1px 4px 8px -3px hsla(0, 0, 0, 0.5);
}
</style>
