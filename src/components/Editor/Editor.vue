<template>
<div class="canon-editor__container">
    <editor-menu-bar v-slot="{ commands, isActive }" class="pt3" :editor="editor">
        <div class="canon-editor__menu-container flex">
            <button
                v-for="control in controls"
                :key="control.label"
                type="button"
                class="editor-menu-button flex items-center"
                :class="{ 'is-active': isActive[control.name](control.opts ? control.opts : '') }"
                @click="commands[control.name](control.opts)"
            >
                <template v-if="control.icon">
                    <canon-icon :icon-name="control.icon" icon-size="1.25em" />
                </template>
                <span :class="control.icon ? 'visually-hidden' : null">{{ control.label }}</span>
            </button>
        </div>
    </editor-menu-bar>
    <div class="editor-wrapper">
        <!-- copied from https://github.com/ueberdosis/tiptap/blob/main/examples/Components/Routes/Links/index.vue -->
        <editor-menu-bubble
            v-slot="{ commands, isActive, getMarkAttrs, menu }"
            class="menububble"
            :editor="editor"
            @hide="hideLinkMenu"
        >
            <div
                class="menububble"
                :class="{ 'is-active': menu.isActive }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
            >
                <form v-if="linkMenuIsActive" class="menububble__form" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
                    <input
                        ref="linkInput"
                        v-model="linkUrl"
                        class="menububble__input"
                        type="text"
                        placeholder="https://"
                        @keydown.esc="hideLinkMenu"
                    >
                    <button class="menububble__button" type="button" @click="setLinkUrl(commands.link, null)">
                        <canon-icon icon-name="x" />
                    </button>
                </form>

                <template v-else>
                    <button
                        class="menububble__button flex items-center"
                        :class="{ 'is-active': isActive.link() }"
                        @click="showLinkMenu(getMarkAttrs('link'))"
                    >
                        <span>{{ isActive.link() ? 'Edit Link' : 'Add Link' }}</span>
                        <canon-icon class="ml1" icon-name="link" />
                    </button>
                </template>
            </div>
        </editor-menu-bubble>
        <editor-content :editor="editor" />
    </div>
    <pre><code v-html="json"></code></pre>
</div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import { Blockquote, Bold, ListItem, BulletList, Heading, History, Italic, Link, OrderedList } from 'tiptap-extensions';
import CanonIcon from '../Icon';
export default {
    name: 'CanonEditor',
    components: {
        EditorContent,
        EditorMenuBar,
        EditorMenuBubble,
        CanonIcon,
    },
    data() {
        return {
            editor: new Editor({
                content: '<p>Hello World.</p>',
                onUpdate: ({ getJSON, getHTML }) => {
                    this.json = getJSON()
                },
                extensions: [
                    new Bold(),
                    new Blockquote(),
                    new ListItem(),
                    new BulletList(),
                    new Heading({
                        levels: [2,3,4],
                    }),
                    new History(),
                    new Italic(),
                    new Link(),
                ],
            }),
            controls: [
                { 
                    name: 'heading',
                    label: 'H2',
                    opts: { level: 2},
                },
                { 
                    name: 'heading',
                    label: 'H3',
                    opts: { level: 3},
                },
                { 
                    name: 'heading',
                    label: 'H4',
                    opts: { level: 4},
                },
                { 
                    name: 'bullet_list',
                    label: 'List',
                    opts: null,
                    icon: 'list',
                },
                { 
                    name: 'bold',
                    label: 'Bold',
                    opts: null,
                    icon: 'bold',
                },
                { 
                    name: 'italic',
                    label: 'Italic',
                    opts: null,
                    icon: 'italic',
                },
                { 
                    name: 'blockquote',
                    label: 'Blockquote',
                    opts: null,
                    icon: 'blockquote',
                },
            ],
            linkUrl: null,
            linkMenuIsActive: false,
            json: 'Update content to see changes',
        };
    },
    beforeDestroy() {
        this.editor.destroy();
    },
    methods: {
        showLinkMenu(attrs) {
            this.linkUrl = attrs.href
            this.linkMenuIsActive = true
            this.$nextTick(() => {
                this.$refs.linkInput.focus()
            })
        },
        hideLinkMenu() {
            this.linkUrl = null
            this.linkMenuIsActive = false
        },
        setLinkUrl(command, url) {
            command({ href: url })
            this.hideLinkMenu()
        },
    },
}
</script>

<style lang="scss">
.canon-editor__container {
    max-width: 75ch;
}

.editor-menu-button {
    // border: 1px solid var(--dark-gray, #555);
    border: none;
    background-color: var(--white, white);
    padding: 4px 12px;
    margin-right: 8px;
    border-radius: 3px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    box-shadow:  4px 4px 7px #cccccc,
                -4px -4px 7px #ffffff;

    &.is-active {
        border-radius: 3px;
        background: #ffffff;
        box-shadow: inset -1px -1px 1px black, inset 1px 1px 1px black, inset 4px 4px 7px #cccccc,
                    inset -4px -4px 7px #ffffff;
                    
    }
    &:hover {
       outline: 3px solid darkorange; 
    }
    &:focus {
        outline: 3px solid orangered;
    }
}
.ProseMirror {
    min-height: $space*4;
    margin-top: $space;
    padding: $space $space/2;
    border-radius: 0px;
    background: #ffffff;
    box-shadow: inset 4px 4px 8px #d9d9d9,
                inset -10px -10px 20px #ffffff;

    &:focus {
        outline: 1px solid #ccc;
    }
    li > * {
        display: inline;
    }
    blockquote {
        border-left: 4px solid var(--highlight, #888);
        padding-left: 8px;
        font-size: 1.2em;
        font-style: italic;
    }
}
.editor-wrapper {
    position: relative;
}

.menububble {
    position:absolute;
    display:flex;
    z-index:10;
    background:#000;
    border-radius:4px;
    padding: 4px;
    margin-bottom:.5rem;
    visibility:hidden;
    opacity:0;
    transition:opacity .2s,visibility .2s;
}
.menububble:after {
    content: '';
    position: absolute;
    bottom: -8px;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: #000000 transparent transparent transparent;
}
.menububble.is-active {
    opacity:1;
    visibility:visible
}
.menububble__button {
    display:inline-flex;
    background:transparent;
    border:0;
    color:#fff;
    padding: 2px;
    margin-right:.2rem;
    border-radius:3px;
    cursor:pointer;
}
.menububble__button:last-child {
    margin-right:0;
}
.menububble__button:hover {
    background-color:hsla(0,0%,100%,.1);
}
.menububble__button.is-active {
    background-color:hsla(0,0%,100%,.2);
}
.menububble__form {
    display:-webkit-box;
    display:flex;
    align-items:center;
}
.menububble__input {
    font:inherit;
    border:none;
    background:transparent;
    color:#fff
}
</style>