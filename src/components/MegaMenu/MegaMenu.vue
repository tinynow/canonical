<template>
    <nav
        class="canon-c-mega-menu__wrapper"
        :class="`--currentLevel${currentLevel}`"
    >
        <div class="canon-c-mega-menu">
            <ul class="canon-c-mega-menu__level --level1">
                <li v-for="item in itemsWithIds" :key="item.id">
                    <canon-menu-toggle
                        :ref="`toggle_${item.id}`"
                        :aria-controls="item.id"
                        :aria-expanded="item.id === level1Open"
                        class="--level1"
                        @click="toggleOpen(item.id, 1)"
                    >
                        {{ item.label }}
                    </canon-menu-toggle>
                    <!-- LEVEL 2 START -->
                    <div
                        v-show="item.id === level1Open"
                        :id="item.id"
                        class="canon-c-mega-menu__level --level2"
                    >
                        <div class="cannon-c-mega-menu__heading">
                            <button
                                aria-label="Back to level 1"
                                @click="goBack(2)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                <span aria-hidden="true">{{ item.label }}</span>
                            </button>
                        </div>
                        <a
                            :href="item.children[0].route"
                            class="canon-c-mega-menu__link"
                            >{{ item.label }} Overview</a
                        >
                        <canon-mega-menu-list
                            :items="item.children.slice(1)"
                            :open-items="[level2Open, level3Open]"
                        />
                        <ul class="canon-c-mega-menu__list --level2">
                            <li
                                v-for="level2Item in item.children.slice(1)"
                                :key="level2Item.id"
                            >
                                <button
                                    :key="`toggle_${level2Item.id}`"
                                    class="canon-c-mega-menu__toggle --level2"
                                    :aria-expanded="
                                        level2Item.id === level2Open
                                    "
                                    :aria-controls="level2Item.id"
                                    @click="toggleOpen(level2Item.id, 2)"
                                >
                                    {{ level2Item.label }}
                                </button>
                                <!-- LEVEL 3 START -->
                                <div
                                    v-if="level2Item.id === level2Open"
                                    :id="level2Item.id"
                                    class="canon-c-mega-menu__level --level3"
                                >
                                    <ul class="canon-c-mega-menu__list">
                                        <li
                                            v-for="level3Item in level2Item.children"
                                            :key="level3Item.id"
                                        >
                                            <a
                                                v-if="!level3Item.children"
                                                class="canon-c-mega-menu__link"
                                                :href="level3Item.route"
                                                >{{ level3Item.label }}</a
                                            >
                                            <button
                                                v-else
                                                :key="`toggle_${level3Item.id}`"
                                                class="canon-c-mega-menu__toggle --level3"
                                                :aria-expanded="
                                                    level3Item.id === level3Open
                                                "
                                                :aria-controls="level3Item.id"
                                                @click="
                                                    toggleOpen(level3Item.id, 3)
                                                "
                                            >
                                                {{ level3Item.label }}
                                            </button>
                                            <!-- LEVEL 4 START -->
                                            <div
                                                v-if="
                                                    level3Item.id === level3Open
                                                "
                                                :id="level3Item.id"
                                                class="canon-c-mega-menu__level --level4"
                                            >
                                                <ul
                                                    class="canon-c-mega-menu__list"
                                                >
                                                    <li
                                                        v-for="level4Item in level3Item.children"
                                                        :key="level4Item.id"
                                                    >
                                                        <a
                                                            class="canon-c-mega-menu__link"
                                                            :href="
                                                                level4Item.route
                                                            "
                                                            >{{
                                                                level4Item.label
                                                            }}</a
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
/* 
TODO: Add uid to items in API
TODO: Verify that v-show is best choice (vs v-if, check a11y)

*/
import CanonMenuToggle from './MenuToggle';
import CanonMegaMenuList from './MegaMenuList';

export default {
    name: 'CanonMegaMenu',
    components: {
        CanonMenuToggle,
        CanonMegaMenuList,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            itemsWithIds: [],
            level1Open: null,
            level2Open: null,
            level3Open: null,
        };
    },
    computed: {
        currentLevel() {
            return (
                [this.level1Open, this.level2Open, this.level3Open].filter(
                    openId => openId !== null
                ).length + 1
            );
        },
    },
    mounted() {
        const addIds = (items, prevId) => {
            items.forEach((element, index) => {
                let thisId = prevId ? `${prevId}-${index}` : `navItem_${index}`;
                element.id = thisId;
                if (element.children) {
                    addIds(element.children, thisId);
                }
            });
            return items;
        };
        this.itemsWithIds = addIds(this.items);
    },
    methods: {
        setLevelOpenState(level, openState) {
            this[`level${level}Open`] = openState;
        },
        toggleOpen(id, level) {
            const thisLevelOpen = this[`level${level}Open`];
            const closeKids = levl => {
                const maxLevels = 3;
                let levelsLeft = levl;
                while (levelsLeft < maxLevels) {
                    levelsLeft++;
                    this[`level${levelsLeft}Open`] = null;
                }
            };
            if (thisLevelOpen === id) {
                this.setLevelOpenState(level, null);
                closeKids(level);
            } else {
                closeKids(level);
                this.setLevelOpenState(level, id);
            }
        },
        goBack(level) {
            //put focus back on previous level item
            //toggle close this level
            const openParentId = this[`level${level - 1}Open`];
            this.$refs[`toggle_${openParentId}`][0].$el.focus();
            this.toggleOpen(openParentId, level - 1);
        },
    },
};
</script>

<style lang="scss">
.canon-c-mega-menu__wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    outline: 1px solid blueviolet;
}

.canon-c-mega-menu {
    --itemPadding: 8px 0.25em;
    --itemBorder: 1px solid #696969;
    position: absolute;
    width: 100%;
    font-size: 24px;
    line-height: 1.25;
    transition: transform 0.3s ease-out;
    .--currentLevel2 & {
        transform: translateX(-100%);
    }
    .--currentLevel3 & {
        transform: translateX(-200%);
    }
    .--currentLevel4 & {
        transform: translateX(-300%);
    }
}
.canon-c-mega-menu__level {
    position: absolute;
    top: 0;
    width: 100%;
    background: white;
    &:not(.--level1) {
        left: 100%;
    }
}
.canon-c-mega-menu__list {
    list-style: none;
}
.canon-c-mega-menu__toggle {
    font-size: 100%;
    line-height: 1.25;
    display: block;
    width: 100%;
    padding: var(--itemPadding);
    text-align: left;
    appearance: none;
    background: white;
    border: var(--itemBorder);
    &[aria-expanded='true'] {
        color: red;
    }
}
.canon-c-mega-menu__link {
    display: block;
    width: 100%;
    padding: var(--itemPadding);
    border: var(--itemBorder);
}
</style>
