<template>
<div id="app">
    <header>
        <span>Canonical</span>
        <!-- <router-link to="/docs">
            Documentation
        </router-link> -->
    </header>
    <router-view />
</div>
</template>
<script>
//import CanonProse from './components/Prose';
import navigationData from './data/menu.json';


export default {
    name: 'App',
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
