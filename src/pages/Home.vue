<template>
<div
    class="canon-home-page"
>
    <header
        :style="styleVals"
        class="canon-site-header flex flex-wrap canon-layout --tube"
    >
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
            </div>
        </div>
        <nav class="mr0 mlauto flex items-end self-end">
            <router-link 
                to="/palette"
                class="ml2"
            >
                Color Palette Contrasts
            </router-link>
            <router-link 
                to="/songnotes"
                class="ml2"
            >
                songnotes
            </router-link>
        </nav>
    </header>
    <main
        class="canon-layout --auto-flow --readable --tube"
    >
        <h1>A playground for serious play</h1>
    
        <p>I am a multi-disciplinary person who works full time for a large state agency. There, I do web development and design with a focus on accessibility, design systems, and content strategy. Here, I am free to sweat the small stuff and revel in the green fields.</p>
        <p>
            <router-link to="/palette">
                Try this not quite finished Color Combinations tool
            </router-link>. Given a set of colors, it lets you know which combinations have accessible contrast ratios.
        </p>
    </main>
</div>
</template>

<script>
import colors from '../styles/00_settings/bird-lover-theme.scss';

export default {
    name: 'HomePage',
    data() {
        return {
            colors: colors,
            primes: [ 1,2,3,5,7,9,13,17,19,26,37,41,43,47,53 ],
        };
    },
    computed: {
        colorValues() {
            return Object.values(this.colors);
        },
        colorStops() {
            const colors = [...this.shuffle(this.colorValues), ...this.shuffle(this.colorValues)] ;
            let colorStops = [];
            let startSize = 0;
            let endSize = this.rando();
            
            for(let i = 0; i < colors.length; i++) {
                endSize = colors[i] !== 'white' ? this.rando() + startSize : 2;
                const ring = `${colors[i]} ${startSize}px, ${colors[i]} ${endSize}px`;
                colorStops.push(ring);
                startSize = endSize;
            }
            return colorStops.join(', ');

        },
        gradient() {
            return `repeating-radial-gradient(circle at 100%, ${this.colorStops})`;
        },
        styleVals() {
            return {
                'background-image': this.gradient,
                };
        },
    },
    mounted() {
        // trigger a re-compute
        setInterval(() => this.colors = {...this.colors}, 4000);
    },
    beforeMount() {
        document.documentElement.style.setProperty('--page-bg', this.gradient)
    },
    methods: {
        rando() {
            return this.primes[Math.floor(Math.random() * Math.floor(this.primes.length))] * 2;
        },
        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                //pick a random index (of the remaining set of options)
                const j = Math.floor(Math.random() * (i + 1));
                //ref current item of the array
                const temp = array[i];
                //overwrite the first item of the array with the random
                array[i] = array[j];
                //overwrite the random with the current
                array[j] = temp;
            }
            return array;
        },
    },
};
</script>
<style lang="scss">
.canon-home-page {
    min-height: 100vh;
    outline: 2px solid honeydew;

    h1 {
        text-shadow: 1px 1px 1px #999;
    }

    p {
        display: block;
        color: white;
        background-color: var(--tropical-areas-combined);
        margin-left: -$space/4;
        margin-right: -$space/4;
        margin-inline: -$space/4;
        padding-left: $space/4;
        padding-right: $space/4;

        // padding-inline: $space/4;
        border-radius: 4px;
        box-shadow: 2px 2px 0 0 var(--white);
        a {
            color: rgb(238, 230, 117) ;
        }
    }
    transition: all 2s ease;
}
html {
    // @include radial-gradient($birdRegionColors);
    // background-image: radial-gradient(circle at 80%, 
    // #84a25d 0%, #84a25d 20px, 
    // #686641 20px,  #686641 28px, 
    // #308cab 28px, #308cab 33px, 
    // #3b9141 33px, #3b9141 44px, 
    // #e5c552 44px, #e5c552 125px,
    // #a28c44 125px, #a28c44 150px, 
    // #e29c78 150px, #e29c78 170px, 
    // #00abf5 170px,  #00abf5 190px, 
    // #e36745 190px, #e36745 195px, 
    // #bf6240 195px, #bf6240 220px,);
}
</style>
