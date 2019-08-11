<template>
<nav class="canon-c-mega-menu">
    <button
        v-show="!isWide"
        class="canon-c-mega-menu__main-toggle"
        aria-label="Main Menu"
        aria-controls="canon-mega-menu"
        aria-expanded="menuOpen"
        @click="menuToggleOpen = !menuToggleOpen"
    >
        <canon-icon
            icon-width="45px"
            icon-height="45px"
            icon-name="menu"
            class="db"
        />
        <span class="db">Menu</span>
    </button>
    <transition name="slide-from-right">
        <div
            v-show="menuOpen"
            class="canon-c-mega-menu__wrapper"
            :class="`--currentLevel${currentLevel}`"
        >
            <div
                id="canon-mega-menu"
                class="canon-c-mega-menu__level --level1"
            >
                <canon-mega-menu-level-heading
                    v-show="!isWide"
                    :level="1"
                    @click="goBack(1)"
                />
                <ul class="canon-c-mega-menu__list --level1 reset-list">
                    <li
                        v-for="item in items"
                        :key="item.id"
                    >
                        <button
                            v-show="currentLevel === 1 || isWide"
                            :ref="`toggle_${item.id}`"
                            :aria-controls="item.id"
                            :aria-expanded="item.id === level1Open"
                            class="canon-c-mega-menu__item canon-c-mega-menu__toggle --level1 flex items-center"
                            @click="toggleOpen(item.id, 1)"
                        >
                            <span class="w100">{{ item.label }}</span>
                            <canon-icon
                                v-show="!isWide"
                                icon-name="arrow-right"
                            />
                        </button>

                        <!-- LEVEL 2 START -->

                        <div
                            v-show="item.id === level1Open"
                            :id="item.id"
                            ref="level-container"
                            class="canon-c-mega-menu__level --level2"
                        >
                            <canon-mega-menu-level-heading
                                v-show="!isWide"
                                :level="2"
                                @click="goBack(2)"
                            >
                                <div class="flex flex-column">
                                    <strong>{{ item.label }}</strong>
                                </div>
                            </canon-mega-menu-level-heading>

                            <ul class="canon-c-mega-menu__list --level2 reset-list">
                                <li class="canon-c-mega-menu__list-item --level2">
                                    <a
                                        :href="item.children[0].route"
                                        class="canon-c-mega-menu__item canon-c-mega-menu__link --level2"
                                    >{{ item.label }} Top Tasks
                                    </a>
                                </li>
                                <li
                                    v-for="level2Item in item.children.slice(1)"
                                    :key="level2Item.id"
                                    class="canon-c-mega-menu__list-item --level2"
                                >
                                    <button
                                        v-show="currentLevel === 2 || isWide"
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
                                            v-show="!isWide"
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

                                        <ul class="reset-list canon-c-mega-menu__list --level3">
                                            <li
                                                v-for="level3Item in level2Item.children"
                                                :key="level3Item.id"
                                                class="canon-c-mega-menu__list-item --level3"
                                            >
                                                <a
                                                    v-if="!level3Item.children"
                                                    class="canon-c-mega-menu__item canon-c-mega-menu__link --level3"
                                                    :href="level3Item.route"
                                                >{{ level3Item.label }}</a>
                                                <button
                                                    v-else
                                                    v-show="currentLevel === 3 || isWide"
                                                    :ref="`toggle_${level3Item.id}`"
                                                    :key="`toggle_${level3Item.id}`"
                                                    class="canon-c-mega-menu__item canon-c-mega-menu__toggle --level3 flex items-center"
                                                    :aria-expanded="
                                                        level3Item.id === level3Open
                                                    "
                                                    :aria-controls="level3Item.id"
                                                    @click="
                                                        toggleOpen(level3Item.id, 3)
                                                    "
                                                >
                                                    <span class="w100">{{ level3Item.label }}</span>
                                                    <canon-icon
                                                        class="mlauto mr0"
                                                        icon-name="arrow-right"
                                                    />
                                                </button>

                                                <!-- LEVEL 4 START -->

                                                <div
                                                    v-show="
                                                        level3Item.id === level3Open
                                                    "
                                                    :id="level3Item.id"
                                                    class="canon-c-mega-menu__level --level4"
                                                    @focusout="trapFocus(4)"
                                                >
                                                    <canon-mega-menu-level-heading
                                                        v-show="!isWide"
                                                        :level="4"
                                                        @click="goBack(4)"
                                                    >
                                                        <div class="flex flex-column">
                                                            <strong>{{ item.label }}</strong>
                                                            <div class="breadcrumbs flex flex-wrap items-center">
                                                                <span>{{ level2Item.label }}</span>
                                                                <canon-icon
                                                                    icon-name="caret-right"
                                                                    icon-width="18px"
                                                                    icon-height="18px"
                                                                />
                                                                <span>{{ level3Item.label }}</span>
                                                            </div>
                                                        </div>
                                                    </canon-mega-menu-level-heading>

                                                    <ul class="canon-c-mega-menu__list --level4 reset-list">
                                                        <li class="canon-c-mega-menu__list-item --level4">
                                                            <a
                                                                class="canon-c-mega-menu__item --level4 canon-c-mega-menu__link"
                                                                :href="level3Item.route"
                                                            >
                                                                {{ level3Item.label }}
                                                            </a>
                                                        </li>
                                                        <li
                                                            v-for="level4Item in level3Item.children"
                                                            :key="level4Item.id"
                                                            class="canon-c-mega-menu__list-item --level4"
                                                        >
                                                            <a
                                                                class="canon-c-mega-menu__item --level4 canon-c-mega-menu__link"
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
                        <!-- LEVEL 2 END -->
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</nav>
</template>

<script>
/* 
TODO: Add uid to items in API
TODO: Verify that v-show is best choice (vs v-if, check a11y)
TODO: Consider moving all 'isWide' dynamic styles into SCSS/media queries
TODO: add drop down transition
NOTE: The desktop dropdown needs a fixed height, because we are absolutely positioning a nested list
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
            menuToggleOpen: false,
            isWide: true, //TODO: is this best, needed to prevent slide transition on desktop
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
        menuOpen() {
            return this.isWide || this.menuToggleOpen;
        },
    },
    mounted() {
        const generateId = (index, prefix) =>
            prefix ? `${prefix}-${index}` : `navItem_${index}`;

        const walkTree = (items, prevId) => {
            items.forEach((element, index, list) => {
                const thisId = generateId(index, prevId);
                element.id = thisId;
                if (element.children) {
                    walkTree(element.children, thisId);
                }
            });
            return items;
        };
        walkTree(this.items);

        const isItWide = window.matchMedia('(min-width: 715px)');
        const setWide = () => {
            this.isWide = isItWide.matches;
        };
        isItWide.addListener(setWide);
        setWide(isItWide);
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
                this.setLevelOpenState(level, id);
                closeKids(level);
            }
        },
        goBack(level) {
            //put focus back on previous level item
            //toggle close this level
            const openParentId = this[`level${level - 1}Open`];
            if (level > 1) {
                this.$refs[`toggle_${openParentId}`][0].focus();
                this.toggleOpen(openParentId, level - 1);
            } else {
                //close the whole menu
                this.setLevelOpenState(1, null);
                this.menuToggleOpen = false;
            }
        },
    },
};
</script>

<style lang="scss">
@import '../../styles/configuration.scss';

/* =======================================================================
     MEGA MENU
========================================================================== */
$megaMenuBreakPoint: 715px; //TODO: convert to ems

/*
     Mega Menu Containers
=================================================== */

.canon-c-mega-menu {
    --megaMenuBreakPoint: 715px;
    --mainToggleBorderColor: var(--black);
    --mainToggleTextColor: var(--black);
    --mainToggleTextColor--hover: var(--white);
    --mainToggleBgColor: var(--white);
    --mainToggleBgColor--hover: var(--black);

    --itemPadding: 8px 0.25em;
    --itemBorder: 1px solid var(--black);
    --itemBgColor: var(--white);
    --hoverBgColor: var(--medium-gray);
    --hoverTextColor: var(--white);
    --itemExpandedBgColor: var(--black);
    --headingBgColor: var(--black);
    --headingTextColor: var(--white);

    --quickEase: cubic-bezier(0.4, 0, 0.2, 1);
    --pseudoColumns: linear-gradient(
        to right,
        #ffffff 33.33%,
        var(--very-light-gray) 33.33%,
        var(--very-light-gray) 66.66%,
        #ffffff 66.66%
    );
}

.canon-c-mega-menu {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;

    @include min-screen-width($megaMenuBreakPoint) {
        position: relative;
        height: auto;
        font-size: 20px;
    }
}

.canon-c-mega-menu__wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--itemBgColor);
    transition: all 0.3s ease;
    @include min-screen-width($megaMenuBreakPoint) {
        position: relative;
        overflow: visible;
    }
}

.canon-c-mega-menu__level {
    position: absolute;
    top: 0;
    width: 100%;
    background: var(--itemBgColor);

    /* Push all the next levels to the right */
    &:not(.--level1) {
        left: 100%;
    }
}

.canon-c-mega-menu__list {
    @include min-screen-width($megaMenuBreakPoint) {
        height: 100%;
        padding-top: $space/2;
        &.--level1 {
            padding-top: $space;
            display: flex;
            justify-content: space-around;
            align-items: stretch;
            > li {
                display: flex;
                margin: 0 5px;
            }
        }
    }
}

/* Wraps all the levels */
.canon-c-mega-menu__level.--level1 {
    transition-delay: 0.1s;
    transition: transform 0.3s var(--quickEase);

    .--currentLevel2 & {
        transform: translateX(-100%);
    }
    .--currentLevel3 & {
        transform: translateX(-200%);
    }
    .--currentLevel4 & {
        transform: translateX(-300%);
    }

    @include min-screen-width($megaMenuBreakPoint) {
        position: relative;
        border: none;
        .canon-c-mega-menu & {
            transform: translate(0%);
        }
    }
}
@include min-screen-width($megaMenuBreakPoint) {
    .canon-c-mega-menu__level.--level2 {
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        min-height: 600px; //TODO: how do we make this height of absolutely positioned child lists
        overflow: scroll;
        border: 1px solid black;
        background: var(--pseudoColumns);
    }
    .canon-c-mega-menu__list.--level2 {
        width: 33.3%;
    }
    .canon-c-mega-menu__level.--level3 {
        position: absolute;
        top: 0;
        left: 33.3%;
        width: 33.3%;
        background-color: black;
        color: white;
        min-height: 100%;
    }
    .canon-c-mega-menu__level.--level4 {
        position: absolute;
        left: 100%;
        top: 0;
        width: 100%;
        min-height: 100%;
    }
}

/*
    Mobile only 
=================================================== */
.canon-c-mega-menu__main-toggle {
    position: absolute;
    right: $space/4;
    top: $space/4;
    padding: 0 4px 2px 4px;
    font-size: var(--text--xxs);
    line-height: 1;
    text-transform: uppercase;
    background-color: var(--mainToggleBgColor);
    border: 2px solid var(--mainToggleBorderColor);
    border-radius: 4px;
    &:focus {
        box-shadow: var(--focusRing);
    }
    &:hover {
        color: var(--mainToggleTextColor--hover);
        background-color: var(--mainToggleBgColor--hover);
    }
}

.canon-c-mega-menu__back-button {
    width: $space * 3;
    min-height: $space * 2;
    color: var(--headingTextColor);
    background-color: var(--headingBgColor);
    border: none;
    margin-right: 2px;
    &:focus {
        background-color: var(--hoverBgColor);
    }
    &:hover {
        background-color: var(--hoverBgColor);
    }
}

.canon-c-mega-menu__heading-content {
    width: 100%;
    font-size: var(--text--xs);
    color: var(--headingTextColor);
    background-color: var(--headingBgColor);
}

/*
    The Focusable Item (link or button
=================================================== */

.canon-c-mega-menu__item {
    line-height: 1.25;
    display: block;
    width: 100%;
    padding: var(--itemPadding);
    text-align: left;
    appearance: none;
    background: var(--itemBgColor);
    border: none;
    border-bottom: var(--itemBorder);
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: var(--hoverBgColor);
        color: var(--hoverTextColor);
    }
    &:focus {
        outline: none;
        box-shadow: var(--focusRing--internal);
    }
    &[aria-expanded='true'] {
        background-color: var(--itemExpandedBgColor);
        color: var(--invertTextColor);
    }

    @include min-screen-width($megaMenuBreakPoint) {
        padding: 12px 8px;
        border-radius: 8px 0 0 8px;
        border: none;

        &.--level1 {
            text-align: center;
            line-height: 1.2;
            border: 1px solid black;
            border-bottom: none;
            border-radius: 4px 4px 0 0;
            &[aria-expanded='true'] {
                border-bottom-color: white;
            }
        }

        &.--level2[aria-expanded='true'],
        &.--level3 {
            background-color: black;
            color: white;
        }

        &.--level3[aria-expanded='true'] {
            background-color: var(--itemBgColor);
            color: black;
        }
    }
}

@include min-screen-width($megaMenuBreakPoint) {
    .canon-c-mega-menu__list-item {
        padding: 0 0 0 $space/2;
        margin-top: 4px;
    }
    .canon-c-mega-menu__link {
        border-radius: 8px;
        width: calc(100% - #{$space/2});
    }
}
</style>
