<template>
<div id="app">
    <header>
        <router-link to="/docs">
            Documentation
        </router-link>
    </header>
    <router-view />
    <canon-mega-menu :items="navigationData.primaryNavigation" />
</div>
</template>
<script>
//import CanonProse from './components/Prose';
import navigationData from './data/menu.json';
import CanonMegaMenu from './components/MegaMenu';

export default {
    name: 'App',
    components: {
        CanonMegaMenu,
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
