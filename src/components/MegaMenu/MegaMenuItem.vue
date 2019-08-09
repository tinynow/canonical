<template>
<li 
    :class="`--level${item.level}`"
    class="canon-c-mega-menu__list-item"
>
    <a
        v-if="!item.children"
        :ref="item.id"
        class="canon-c-mega-menu__link canon-c-mega-menu__item"
        :href="route"
    >
        {{ item.label }}
    </a>
    <template v-else>
        <button
            :ref="item.id"
            :class="`--level${item.level}`"
            class="canon-c-mega-menu__toggle canon-c-mega-menu__item flex items"
            :aria-expanded="expanded"
            :aria-controls="item.id"
            @click="$emit('click')"
        >
            <slot name="toggle-content" />
        </button>
        <div
            v-show="expanded"
            :id="item.id"
            :class="`--level${item.level}`"
            class="canon-c-mega-menu__level flex items-center"
        >
            <slot name="children" />
        </div>
    </template>
</li>
</template>

<script>
export default {
    name: 'CanonMegaMenuItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style></style>
