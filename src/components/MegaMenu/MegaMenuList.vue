<template>
    <ul>
        <canon-mega-menu-list-item
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            :expanded="openItems.includes(item.id)"
            :controls="item.id"
            @click="$emit('click')"
        >
        </canon-mega-menu-list-item>
    </ul>
</template>

<script>
import CanonMegaMenuListItem from './MenuListItem';

export default {
    name: 'CanonMegaMenuList',
    components: {
        CanonMegaMenuListItem,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        openItems: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style></style>
