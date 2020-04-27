<template>
<div
    id="app"
>
    <header class="canon-site-header flex flex-wrap canon-layout --tube">
        <span class="canon-logo canon db pv1">
            <router-link to="/">
                canonical
            </router-link>
        </span>
        <nav class="canon-c-site-nav--simple mr0 mlauto flex items-center pa1">
            <router-link 
                to="/palette"
                class="ml2"
            >
                Color Palette Contrast Tool
            </router-link>
        </nav>
    </header>
    <main class="mw-100">
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

.canon-site-header {
    background-color: color(gray--5);
    a {
        color: color(yellow--3);
        text-decoration: none;
    }
}
.canon-logo {
    padding: $space/2;
    letter-spacing: 2px;
    font-weight: 600;
    @include type-setting(2);
}


</style>
