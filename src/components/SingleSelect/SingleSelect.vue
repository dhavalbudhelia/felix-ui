<template>
    <div :class="[classObject, size]">
        <div :class="wrapperClassObject" @click="toggleTrigger">
            <div :class="placeholderWrapperClassObject">
                <div v-if="selectedText === ''" :class="placeholderClassObject">{{ placeholder }}</div>
                <div :class="displayValuePlaceholderClassObject">{{ selectedText }}</div>
            </div>
            <div v-if="selectedText !== ''" @click.stop.prevent="clearValues" :class="clearClassObject">
                <fe-icon icon-pack="fas" icon="times" :size="size"></fe-icon>
            </div>
            <div :class="caretClassObject">
                <fe-icon icon-pack="fas" icon="caret-down" size="is-lg"></fe-icon>
            </div>
        </div>
        <select aria-hidden="true" :class="selectClassObject" :id="id" :name="name">
            <option v-if="selectedItem !== null" :value="selectedItem.id" selected>{{ selectedItem.id }}</option>
        </select>
        <transition name="fade">
            <div v-if="opened" :class="dropDownMenuClassObject" @click.stop>
                <div :class="dropdownContentClassObject">
                    <div class="dropdown-content-header-wrapper">
                        <div v-if="searchable" :class="dropdownItemClassObject" class="border-b p-1 px-2">
                            <fe-input ref="search"
                                      v-model="searchTerm"
                                      placeholder="Search..."
                                      icon-pack-before="fas"
                                      icon-before="search"
                                      class="w-full"
                            ></fe-input>
                            <div v-if="searchTerm !== ''"
                                 @click.stop.prevent="clearSearch"
                                 :class="searchClearClassObject"
                            >
                                <fe-icon icon-pack="fas" icon="times" size="is-sm"></fe-icon>
                            </div>
                        </div>
                    </div>
                    <div :class="dropdownContentItemWrapperClassObject">
                        <div v-if="groupByProperty === null" v-for="item in items"
                             :class="[dropdownItemClassObject, dropdownItemHoverClassObject]">
                            <div @click="selectItem(item)"
                                 :class="getItemClassObject(item)"
                            >{{ item.text }}</div>
                        </div>
                        <template v-if="groupByProperty !== null" v-for="group in groups">
                            <div :class="[dropdownItemClassObject, dropdownItemHoverClassObject]"
                                 class="dropdown-group">
                                <div :class="groupClassObject">{{ group.name }}</div>
                            </div>
                            <div v-for="groupItem in group.items"
                                 :class="[dropdownItemClassObject, dropdownItemHoverClassObject]"
                                 class="grouped-item">
                                <div @click="selectItem(groupItem)"
                                     :class="getItemClassObject(groupItem)"
                                >{{ groupItem.text }}</div>
                            </div>
                        </template>
                        <div v-if="searchable && filteredItems.length === 0" :class="dropdownItemClassObject"
                             class="py-2 px-4">
                            {{ noRecordsFoundTemplate }}
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div v-if="opened" @click="clickedOutside" :class="backdropClassObject"></div>
    </div>
</template>

<script>
    import FeIcon from '@/components/Icon/Icon.vue';
    import FeInput from '@/components/Input/Input.vue';
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-single-select',
        components: {
            FeInput,
            FeIcon,
        },
        mixins: [SizeMixin],
        props: {
            id: {
                type: String,
                required: false,
                default: null,
            },
            name: {
                type: String,
                required: false,
                default: null,
            },
            value: {
                type: [String, Number],
                default: '',
                required: false,
            },
            placeholder: {
                type: String,
                required: false,
                default: 'Select Item'
            },
            dataSource: {
                type: Array,
                required: false,
                default: function () {
                    return [];
                }
            },
            valueProperty: {
                type: String,
                required: false,
                default: 'value',
            },
            labelProperty: {
                type: String,
                required: false,
                default: 'label',
            },
            groupByProperty: {
                type: String,
                required: false,
                default: null,
            },
            searchable: {
                type: Boolean,
                required: false,
                default: false,
            },
            noRecordsFoundTemplate: {
                type: String,
                required: false,
                default: 'No Records Found'
            },
            themeOptions: {
                type: Object,
                required: false,
                default: function () {
                    return optionsDefaults.themeOptions;
                },
            },
        },
        data() {
            return {
                indexedDataSource: [],
                opened: false,
                filteredItems: [],
                selectedItem: null,
                searchTerm: '',
            }
        },
        computed: {
            wrapperClassObject() {
                return [CssClasses.wrapper];
            },
            /**
             * class object
             */
            classObject() {
                let classes = ['fe-single-select', CssClasses.base];
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
                    classes.push('singleselect-center-position md:normal-position');
                } else {
                    classes.push('hidden');
                }
                return classes;
            },
            /**
             * dropdown content class object
             */
            dropdownContentClassObject() {
                return ['dropdown-content', CssClasses.dropdownContent];
            },
            /**
             * dropdown item wrapper class object
             */
            dropdownContentItemWrapperClassObject() {
                return ['dropdown-content-items-wrapper', CssClasses.dropdownContentItemWrapper];
            },
            /**
             * dropdown item class object
             */
            dropdownItemClassObject() {
                let classes = ['dropdown-item', CssClasses.dropdownItem];
                switch (this.size) {
                    case 'is-xs':
                        classes.push(CssClasses.dropdownItemXs);
                        break;
                    case 'is-sm':
                        classes.push(CssClasses.dropdownItemSm);
                        break;
                    case 'is-md':
                        classes.push(CssClasses.dropdownItemMd);
                        break;
                    case 'is-lg':
                        classes.push(CssClasses.dropdownItemLg);
                        break;
                    default:
                        classes.push(CssClasses.dropdownItemMd);
                }
                return classes;
            },
            /**
             * dropdown item hover effect class object
             */
            dropdownItemHoverClassObject() {
                return CssClasses.dropdownItemHover;
            },
            /**
             * checkbox class object
             */
            itemClassObject() {
                return CssClasses.item;
            },
            /**
             * checkbox class object
             */
            groupClassObject() {
                return CssClasses.group;
            },
            /**
             * select element class object
             */
            selectClassObject() {
                return CssClasses.select;
            },
            /**
             * clear icon class object
             */
            clearClassObject() {
                return CssClasses.clear;
            },
            /**
             * search clear icon class object
             */
            searchClearClassObject() {
                return ['single-select-search-clear', CssClasses.searchClear];
            },
            /**
             * placeholder wrapper class object
             */
            placeholderWrapperClassObject() {
                let classes = ['placeholder-wrapper', CssClasses.placeholderWrapper];
                switch (this.size) {
                    case 'is-xs':
                        classes.push(CssClasses.placeholderWrapperXs);
                        break;
                    case 'is-sm':
                        classes.push(CssClasses.placeholderWrapperSm);
                        break;
                    case 'is-md':
                        classes.push(CssClasses.placeholderWrapperMd);
                        break;
                    case 'is-lg':
                        classes.push(CssClasses.placeholderWrapperLg);
                        break;
                    default:
                        classes.push(CssClasses.placeholderWrapperMd);
                }
                return classes;
            },
            /**
             * placeholder class object
             */
            placeholderClassObject() {
                return CssClasses.placeholder;
            },
            /**
             * display value placeholder class object
             */
            displayValuePlaceholderClassObject() {
                return CssClasses.displayValuePlaceholder;
            },
            /**
             * dropdown caret icon class object
             */
            caretClassObject() {
                let classes = ['caret', CssClasses.caret];
                switch (this.size) {
                    case 'is-xs':
                        classes.push(CssClasses.caretXs);
                        break;
                    case 'is-sm':
                        classes.push(CssClasses.caretSm);
                        break;
                    case 'is-md':
                        classes.push(CssClasses.caretMd);
                        break;
                    case 'is-lg':
                        classes.push(CssClasses.caretLg);
                        break;
                    default:
                        classes.push(CssClasses.caretMd);
                }
                return classes;
            },
            /**
             * backdrop class object
             */
            backdropClassObject() {
                return CssClasses.backdrop;
            },
            /**
             * computed prop for item data
             */
            items() {
                return this._.map(this.filteredItems, (itemData) => {
                    let id = itemData[this.valueProperty];
                    return {
                        id: id,
                        text: itemData[this.labelProperty],
                        groupLabel: itemData[this.groupByProperty],
                        isGroupItem: false,
                        selected: this.selectedItem !== null && this.selectedItem.id === id,
                        feIndex: itemData['feIndex']
                    };
                });
            },
            /**
             * computed prop for grouped item
             */
            groups() {
                let groups = [];
                if (this.groupByProperty !== null) {
                    let options = this._.groupBy(this.items, (item) => {
                        return item.groupLabel;
                    });
                    this._.forIn(options, (items, key) => {
                        this._.forEach(items, (item) => {
                            item.isGroupItem = true;
                        });
                        groups.push({
                            name: key,
                            items: items,
                        });
                    });
                }
                return groups;
            },
            /**
             * collection of display text of all selected items
             */
            selectedText() {
                return this.selectedItem !== null ? this.selectedItem.text : '';
            },
        },
        watch: {
            /**
             * filter item list if singleselect is set to searchable
             */
            searchTerm(value) {
                if (this.searchable) {
                    if (value !== '') {
                        this.filteredItems = this._.filter(this.indexedDataSource, (itemData) => {
                            return this._.includes(this._.toLower(itemData[this.labelProperty]), this._.toLower(value));
                        });
                    } else {
                        this.filteredItems = this.indexedDataSource;
                    }
                }
            }
        },
        methods: {
            /**
             * toggle opening of singleselect.
             */
            toggleTrigger() {
                if (!this.opened) {
                    // if not opened, toggle after clickOutside event
                    // this fixes toggling programmatic
                    this.searchTerm = '';
                    this.$nextTick(() => {
                        this.opened = true;
                        if (this.searchable) {
                            this.$nextTick(() => {
                                this.$refs.search.$refs.input.focus();
                            });
                        }
                    });
                } else {
                    this.opened = false;
                }
            },
            /**
             * Close dropdown if clicked outside.
             */
            clickedOutside() {
                this.opened = false;
            },
            /**
             * check if supplied item is selected
             * @param item
             * @return {boolean}
             */
            isItemSelected(item) {
                return this.selectedItem !== null && this.selectedItem.id === item.id;
            },
            /**
             * select supplied item if checked
             * @param item
             */
            selectItem(item) {
                this.selectedItem = item;
                this.$emit('input', this.selectedItem.id);
                this.clickedOutside();
            },
            /**
             * clear values
             */
            clearValues() {
                this.selectedItem = null;
                this.$emit('input', '');
            },
            /**
             * clear search term input
             */
            clearSearch() {
                this.searchTerm = '';
            },
            getItemClassObject(item) {
                let selectedClass = this.isItemSelected(item) ? CssClasses.dropdownItemSelected : '';
                let color = this.isItemSelected(item) ? `text-white bg-${this.themeOptions.color.primary}` : '';
                let itemClass = (this.groupByProperty !== null) ? CssClasses.groupItem : CssClasses.item;
                return [itemClass, selectedClass, color];
            },
        },
        mounted() {
            this.indexedDataSource = this._.orderBy(this._.map(this.dataSource, (item, key) => {
                return this._.merge(this._.clone(item), {
                    feIndex: key
                });
            }), ['feIndex'], ['asc']);
            this.filteredItems = this.indexedDataSource;
            if (this.value !== '') {
                let selectedItem = this._.find(this.items, (item) => {
                    return item.id === this.value;
                });
                if (selectedItem !== undefined) {
                    this.selectedItem = selectedItem;
                }
            }
        }
    }
</script>
