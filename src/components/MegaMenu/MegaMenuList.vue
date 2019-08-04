<template>
<ul>
    <canon-mega-menu-list-item
        v-for="item in items"
        :key="item.id"
        v-bind="item"
        :expanded="openItems.includes(item.id)"
        :controls="item.id"
        :open-items="openItems"
        @click="$emit('click')"
    />
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
