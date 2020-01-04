<template>
<div id="app">
    <header>
        <span class="canon-logo canon db pa1">canonical</span>
        <nav class="canon-c-site-nav--simple">
            <router-link to="/">
                Home
            </router-link>
            <router-link 
                to="/palette"
                class="ml2"
            >
                Palette
            </router-link>

            <router-link
                to="/docs"
                class="ml2"
            >
                Documentation
            </router-link>
        </nav>
    </header>
    <main>
        <router-view />
    </main>
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
$brand--primary: color(gray--5);

.canonical-card {
    box-shadow: 1px 4px 8px -3px hsla(0, 0, 0, 0.5);
}
.canon-logo {
    padding: $space/4 $space*3;
    background: $brand--primary;
    color: color(gray--1);
    letter-spacing: 2px;
    font-weight: 600;
    @include type-setting(2);
}

.canon-c-site-nav--simple {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    padding: $space/4 5% $space/4 $space/4;
    background: color(gray--1);
}

</style>
