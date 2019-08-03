<template>
    <li>
        <a v-if="!children" class="canon-c-mega-menu__link" :href="route">
            {{ label }}
        </a>
        <template v-else>
            <button
                class="canon-c-mega-menu__toggle"
                :aria-expanded="expanded"
                :aria-controls="controls"
                @click="$emit('click')"
            >
                {{ label }}
            </button>
            <div
                v-show="expanded"
                :id="controls"
                class="canon-c-mega-menu__level"
            >
                <slot name="level-header" />
                <canon-mega-menu-list :items="children" />
            </div>
        </template>
    </li>
</template>

<script>
export default {
    name: 'CanonMegaMenuListItem',
    components: {
        CanonMegaMenuList: () => import('./MegaMenuList'),
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        route: {
            type: [String, null],
            default: null,
        },
        children: {
            type: [Array, null],
            default: null,
        },
        controls: {
            type: [String, null],
            default: null,
        },
        expanded: {
            type: [String, null],
            default: null,
        },
    },
};
</script>

<style></style>
