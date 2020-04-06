<template>
    <div :class="[size]">
        <fe-input :placeholder="placeholder"
                  v-model="searchTerm"
                  :icon-pack-before="iconPackBefore"
                  :icon-before="iconBefore"
                  :icon-pack-after="iconPackAfter"
                  :icon-after="iconAfter"
                  :size="size"
        ></fe-input>
        <div :class="[dropdownClassObject, size]">
            <transition name="fade">
                <div :class="dropDownMenuClassObject">
                    <div :class="contentClassObject">
                        <slot name="items" :items="computedItems" :selectItem="selectItem" v-if="!isEmpty">
                            <a v-for="(item, itemKey) in computedItems"
                               :key="itemKey"
                               :class="itemClassObject"
                               @click.stop.prevent="selectItem(item)"
                            >
                                <slot name="item" :item="item">{{ item }}</slot>
                            </a>
                        </slot>
                        <slot name="empty" v-else-if="opened">
                            <span :class="itemClassObject">No results found</span>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
        <div v-if="opened" @click="clickedOutside" class="fixed w-full h-full top-0 left-0 z-10"></div>
    </div>
</template>

<script>
    import FeInput from '@/components/Input/Input.vue';
    import IconMixin from "@/mixins/IconMixin";
    import SizeMixin from "@/mixins/SizeMixin";
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-autocomplete',
        components: {
            FeInput,
        },
        mixins: [IconMixin, SizeMixin],
        props: {
            items: {
                type: Array,
                default: (() => {
                    return [];
                }),
                required: false,
            },
            placeholder: {
                type: String,
                default: 'Type to search...',
                required: false,
            },
            async: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        data() {
            return {
                localInputElement: null,
                opened: false,
                filteredItems: [],
                searchTerm: '',
            }
        },
        watch: {
            /**
             * watch search term value change
             */
            searchTerm(value) {
                this.opened = true;
                if (this.async) {
                    if (this._.trim(value) !== '') {
                        this.$emit('searching', value);
                    } else {
                        this.opened = false;
                    }
                } else if (this._.trim(value) === '') {
                    this.filteredItems = [];
                    this.opened = false;
                } else {
                    this.filterItems(value);
                }
            }
        },
        methods: {
            /**
             * Close dropdown if clicked outside.
             */
            clickedOutside() {
                this.opened = false;
            },
            /**
             * filter items by given value
             * @param value
             */
            filterItems(value) {
                if (this.items.length > 0) {
                    this.filteredItems = this._.filter(this.items, (item) => {
                        return this._.includes(this._.lowerCase(item), this._.lowerCase(value));
                    });
                } else {
                    this.filteredItems = [];
                }
            },
            /**
             * emit input when item was selected and close dropdown
             * @param item
             */
            selectItem(item) {
                this.$emit('input', item);
                this.searchTerm = '';
                this.filteredItems = [];
                this.opened = false;
            },
        },
        computed: {
            /**
             * dropdown class names object
             */
            dropdownClassObject() {
                let classes = ['fe-dropdown', CssClasses.base];
                if (this.opened) {
                    classes.push('opened')
                }
                classes.push(this.sizeClass);
                return classes;
            },
            /**
             * class names object for dropdown menu
             */
            dropDownMenuClassObject() {
                let classes = ['dropdown-menu'];
                if (this.opened) {
                    classes.push(CssClasses.menu);
                    classes.push('normal-position');
                } else {
                    classes.push('hidden');
                }
                return classes;
            },
            /**
             * content class object
             */
            contentClassObject() {
                return ['dropdown-content', CssClasses.content];
            },
            /**
             * item class object
             */
            itemClassObject() {
                return ['dropdown-item', CssClasses.item];
            },
            /**
             * size class object
             */
            sizeClass() {
                switch (this.size) {
                    case 'is-xs':
                        return CssClasses.sizeXs;
                    case 'is-sm':
                        return CssClasses.sizeSm;
                    case 'is-md':
                        return CssClasses.sizeMd;
                    case 'is-lg':
                        return CssClasses.sizeLg;
                    default:
                        return CssClasses.sizeMd;
                }
            },
            /**
             * compute if there are any filtered items
             * @return {boolean}
             */
            isEmpty() {
                return this.computedItems.length === 0;
            },
            /**
             * compute items
             * @return {*}
             */
            computedItems() {
                return this.async ? this.items : this.filteredItems;
            },
        },
    }
</script>

<style scoped>
    .normal-position {
        position: absolute;
        top: auto;
        right: auto;
        bottom: auto;
        left: auto;
        -webkit-transform: none;
        transform: none;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
