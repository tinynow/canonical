<template>
<div
    id="app"
>
    <main class="mw-100 pt0 pb5">
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

.canonical-card {
    box-shadow: 1px 4px 8px -3px hsla(0, 0, 0, 0.5);
}

.canon-site-header {
    padding: $space/2 $space/4;
    background-color: color(gray--4);
    border-top: 1px solid color(yellow--3);

    a {
        color: white;
        text-shadow: 1px 1px 2px black;
        text-decoration: none;
    }
    *::selection {
       background-color: #111;
    }
}
.canon-logo {
    color: var(--yellow--3);
}
.canon-logo__can-top {
    box-shadow: 0 -5px 1px #000;
}
.canon-site-header__title {
    @include type-setting(2);
    display: block;
    transform-origin: 0% 100%;  
    transition: all .3s ease;
    font-weight: 600;
    letter-spacing: 2px;
}

.canon-logo__cloud {
    transition: all 3s ease;
    transform-origin: 50% 50%;
    transform: translateX(0);
}

.canon-site-header:hover {
    .canon-site-header__title {
        z-index: 2;
        text-shadow: 0px 1px 0.5px rgba(0, 0, 0, .7);
    }

    .canon-logo__cloud {
        animation: scroll-right-from-middle 8s linear infinite;
        filter: drop-shadow( 0px 1px 0.5px rgba(0, 0, 0, .5));
    }
    
}
.canon-logo__can-and-cloud {
    filter: drop-shadow( 0px 1px 0.5px rgba(0, 0, 0, .7));
}

</style>
