<template>
    <div :class="[classObject, size]">
        <Input :placeholder="placeholder"
               v-model="searchTerm"
               :icon-pack-before="iconPackBefore"
               :icon-before="iconBefore"
               :icon-pack-after="iconPackAfter"
               :icon-after="iconAfter"
               :size="size"
        ></Input>
        <div :class="[dropdownClassObject, size]">
            <transition name="fade">
                <div :class="dropDownMenuClassObject">
                    <div class="dropdown-content">
                        <slot name="items" :items="computedItems" :selectItem="selectItem" v-if="!isEmpty">
                            <a v-for="(item, itemKey) in computedItems"
                               :key="itemKey"
                               class="dropdown-item"
                               @click.stop.prevent="selectItem(item)"
                            >
                                <slot name="item" :item="item">{{ item }}</slot>
                            </a>
                        </slot>
                        <slot name="empty" v-else-if="opened">
                            <span class="dropdown-item">No results found</span>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
        <div v-if="opened" @click="clickedOutside" class="mobile-device-backdrop"></div>
    </div>
</template>

<script>
    import Input from '@/components/Input/Input.vue';
    import IconMixin from "@/mixins/IconMixin";
    import SizeMixin from "@/mixins/SizeMixin";

    export default {
        name: 'fe-autocomplete',
        components: {
            Input,
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
             * class names object
             */
            classObject() {
                return {
                    'fe-autocomplete' : true,
                }
            },
            /**
             * dropdown class names object
             */
            dropdownClassObject() {
                return {
                    'fe-dropdown': true,
                    'opened': this.opened,
                }
            },
            /**
             * class names object for dropdown menu
             */
            dropDownMenuClassObject() {
                return {
                    'dropdown-menu': true,
                    'center-position': true,
                    'md:normal-position': true,
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
