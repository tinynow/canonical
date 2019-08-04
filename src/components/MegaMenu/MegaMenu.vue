<template>
<nav
    class="canon-c-mega-menu__wrapper"
    :class="`--currentLevel${currentLevel}`"
>
    <div class="canon-c-mega-menu">
        <ul class="canon-c-mega-menu__level --level1">
            <li
                v-for="item in itemsWithIds"
                :key="item.id"
            >
                <button
                    :ref="`toggle_${item.id}`"
                    :aria-controls="item.id"
                    :aria-expanded="item.id === level1Open"
                    class="canon-c-mega-menu__item canon-c-mega-menu__toggle --level1 flex items-center"
                    @click="toggleOpen(item.id, 1)"
                >
                    <span class="w100">{{ item.label }}</span>
                    <canon-icon icon-name="arrow-right" />
                </button>
                <!-- LEVEL 2 START -->
                <div
                    v-show="item.id === level1Open"
                    :id="item.id"
                    class="canon-c-mega-menu__level --level2"
                >
                    <canon-mega-menu-level-heading
                        :level="2"
                        @click="goBack(2)"
                    >
                        <div class="flex flex-column">
                            <span>{{ item.label }}</span>
                        </div>
                    </canon-mega-menu-level-heading>
                    <a
                        :href="item.children[0].route"
                        class="canon-c-mega-menu__item canon-c-mega-menu__link"
                    >{{ item.label }} Top Tasks
                    </a>
                    <ul class="canon-c-mega-menu__list --level2">
                        <li
                            v-for="level2Item in item.children.slice(1)"
                            :key="level2Item.id"
                        >
                            <button
                                :ref="`toggle_${level2Item.id}`"
                                :key="`toggle_${level2Item.id}`"
                                class="canon-c-mega-menu__item canon-c-mega-menu__toggle --level2 flex items-center"
                                :aria-expanded="
                                    level2Item.id === level2Open
                                "
                                :aria-controls="level2Item.id"
                                @click="toggleOpen(level2Item.id, 2)"
                            >
                                <span class="w100">{{ level2Item.label }}</span>
                                <canon-icon
                                    class="mlauto mr0"
                                    icon-name="arrow-right"
                                />
                            </button>
                            <!-- LEVEL 3 START -->
                            <div
                                v-show="level2Item.id === level2Open"
                                :id="level2Item.id"
                                class="canon-c-mega-menu__level --level3"
                            >
                                <canon-mega-menu-level-heading
                                    :label="level2Item.label"
                                    :level="3"
                                    @click="goBack(3)"
                                >
                                    <div class="flex flex-column">
                                        <strong>{{ item.label }}</strong>
                                        <div class="breadcrumbs">
                                            <span>{{ level2Item.label }}</span>
                                        </div>
                                    </div>
                                </canon-mega-menu-level-heading>

                                <ul class="canon-c-mega-menu__list">
                                    <li
                                        v-for="level3Item in level2Item.children"
                                        :key="level3Item.id"
                                    >
                                        <a
                                            v-if="!level3Item.children"
                                            class="canon-c-mega-menu__item canon-c-mega-menu__link"
                                            :href="level3Item.route"
                                        >{{ level3Item.label }}</a>
                                        <button
                                            v-else
                                            :ref="`toggle_${level3Item.id}`"
                                            :key="`toggle_${level3Item.id}`"
                                            class="canon-c-mega-menu__item canon-c-mega-menu__toggle --level3"
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
                                            v-show="
                                                level3Item.id === level3Open
                                            "
                                            :id="level3Item.id"
                                            class="canon-c-mega-menu__level --level4"
                                        >
                                            <canon-mega-menu-level-heading
                                                :label="
                                                    `${level2Item.label} 
                                                        > ${level3Item.label}`
                                                "
                                                :level="4"
                                                @click="goBack(4)"
                                            >
                                                <div class="flex flex-column">
                                                    <strong>{{ item.label }}</strong>
                                                    <div class="breadcrumbs flex flex-wrap items-center">
                                                        <span>{{ level2Item.label }}</span>
                                                        <canon-icon
                                                            icon-name="caret-right"
                                                            :width="18"
                                                            :height="18"
                                                        />
                                                        <span>{{ level3Item.label }}</span>
                                                    </div>
                                                </div>
                                            </canon-mega-menu-level-heading>
                                            <a :href="level3Item.route">
                                                {{ level3Item.label }}
                                            </a>
                                            <ul class="canon-c-mega-menu__list">
                                                <li
                                                    v-for="level4Item in level3Item.children"
                                                    :key="level4Item.id"
                                                >
                                                    <a
                                                        class="canon-c-mega-menu__item canon-c-mega-menu__link"
                                                        :href="
                                                            level4Item.route
                                                        "
                                                    >{{
                                                        level4Item.label
                                                    }}</a>
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
import CanonMegaMenuLevelHeading from './MegaMenuLevelHeading';
import CanonIcon from '../Icon/Icon';

export default {
    name: 'CanonMegaMenu',
    components: {
        CanonMegaMenuLevelHeading,
        CanonIcon,
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
            this.$refs[`toggle_${openParentId}`][0].focus();
            this.toggleOpen(openParentId, level - 1);
        },
    },
};
</script>

<style lang="scss">
@import '../../styles/00_settings/defaults.scss';
svg {
    width: 24px;
    height: 24px;
}
.canon-c-icon.--xs {
    width: 18px;
    height: 18px;
}

.canon-c-mega-menu__wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

.canon-c-mega-menu {
    --itemPadding: 8px 0.25em;
    --itemBorder: 1px solid #696969;
    --headingBgColor: #232323;
    --headingTextColor: white;
    position: absolute;
    width: 100%;
    font-size: 24px;
    line-height: 1.25;
    transition: transform 0.2s ease;
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
.canon-c-mega-menu__item {
    font-size: 100%;
    line-height: 1.25;
    display: block;
    width: 100%;
    padding: var(--itemPadding);
    text-align: left;
    appearance: none;
    background: white;
    box-shadow: none;
    border: none;
    border-bottom: var(--itemBorder);
    transition: all 0.1s ease-in-out;
    &:focus,
    &:hover {
        outline: none;
        background-color: #696969;
        color: white;
        text-shadow: 0 0 20px black;
    }
}

.canon-c-mega-menu__toggle {
}
.canon-c-mega-menu__link {
}
.cannon-c-mega-menu__heading {
    font-size: 14px;
    line-height: $space;
    width: 100%;
}
.canon-c-mega-menu__back-button {
    width: $space * 3;
    min-height: $space * 2;
    color: var(--headingTextColor);
    background-color: var(--headingBgColor);
    border: none;
    margin-right: 2px;
}
.canon-c-mega-menu__heading-content {
    width: 100%;
    color: var(--headingTextColor);
    background-color: var(--headingBgColor);
}
</style>
