<template>
<div id="app">
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
};
</script>
<style lang="scss">
@import './styles/global.scss';
.canonical-card {
    box-shadow: 1px 4px 8px -3px hsla(0, 0, 0, 0.5);
}
</style>
