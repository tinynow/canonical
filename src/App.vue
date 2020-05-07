<template>
<div
    id="app"
>
    <header class="canon-site-header flex flex-wrap canon-layout --tube">
        <div class="flex items-center">
            <svg
                class="canon-logo mr1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-1 -1 18 18"
                width="75"
                height="75"
            >
                <g
                    fill="none"
                    fill-rule="evenodd"
                    class="canon-logo__can-and-cloud"
                >
                    <path
                        class="canon-logo__can-body"
                        fill="#000"
                        stroke="#FFF"
                        stroke-linejoin="round"
                        d="M3 2h10v11.1c-.14 1.06-2.32 1.9-5 1.9-2.76 0-5-.9-5-2h0V2z"
                    />
                    <ellipse
                        class="canon-logo__can-top"
                        cx="8"
                        cy="2"
                        fill="#fff"
                        stroke="#fff"
                        rx="5"
                        ry="1"
                    />
                    <g class="canon-logo__cloud">
                        <path
                            fill="currentColor"
                            stroke="#979797"
                            stroke-linejoin="round"
                            d="M8.5 5c1.93 0 3.5.9 3.5 2a2 2 0 11-1.55 3.26c-.7.44-1.98.74-3.45.74-2.2 0-4-.67-4-1.5 0-.23.14-.45.4-.65.17-.14.42-.27.7-.39-.98.02-1.94-.08-2.1-.96C1.85 6.67 3.57 6 5.5 6h-.03c.6-.6 1.73-1 3.03-1z"
                        />
                        <path
                            stroke="#979797"
                            stroke-linecap="round"
                            d="M8 7c2.43-.58 2.43 1 2.43 1"
                        />
                    </g>
                </g>
            </svg>
            <div>
                <router-link
                    to="/"
                    class="canon-site-header__title"
                >
                    <span>matt kreiling</span>
                </router-link>
                <p class="canon-site-header__subtitle">
                    Principled design and development.
                </p>
            </div>
        </div>
        <nav class="mr0 mlauto flex items-end self-end">
            <router-link 
                to="/palette"
                class="ml2"
            >
                Color Palette Contrast Tool
            </router-link>
        </nav>
    </header>
    <main class="mw-100 pt0 pb5 canon-layout --tube">
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
    padding: $space/2 $space/4;
    overflow: hidden;
    background-color: color(gray--4);
    border-top: 1px solid color(yellow--3);

    a {
        color: color(yellow--3);
        text-decoration: none;
    }
    *::selection {
       background-color: #111;
    }
}
.canon-logo {
    color: var(--yellow--3);
    overflow: visible;
    z-index: 1;
}
.canon-logo__can-top {
    box-shadow: 0 -5px 1px #000;
}
.canon-site-header__title {
    @include type-setting(2);
    font-weight: 600;
    letter-spacing: 2px;
}

.canon-site-header__subtitle {
    @include type-setting(1);
    color: color(gray--1);
}
.canon-logo__cloud {
    transform-origin: 50% 50%;
    transition: all 1s ease;
    transform: translateX(0);
    animation: scroll-right-from-middle 4s ease;

}

.canon-site-header:hover {
    text-shadow: 0px 1px 0.5px rgba(0, 0, 0, .7);
    .canon-site-header__title {
        position: relative;
       z-index: 2;
    }
    .canon-logo__cloud {
        transition: all 1s ease;
        animation: scroll-right-from-middle 4s ease infinite;
        filter: drop-shadow( 0px 1px 0.5px rgba(0, 0, 0, .5));
    }
    
}
.canon-logo__can-and-cloud {
    filter: drop-shadow( 0px 1px 0.5px rgba(0, 0, 0, .7));
}

</style>
