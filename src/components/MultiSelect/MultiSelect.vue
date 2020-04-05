<template>
    <div :class="[classObject, size]">
        <div :class="wrapperClassObject" @click="toggleTrigger">
            <div :class="placeholderWrapperClassObject">
                <div v-if="selectValueDislay === ''" :class="placeholderClassObject">{{ placeholder }}</div>
                <div :class="displayValuePlaceholderClassObject">{{ selectValueDislay }}</div>
                <div v-if="!allItemSelected" :class="remainingValuePlaceholderClassObject">
                    {{ selectedValueDisplayRemaining }}
                </div>
            </div>
            <div v-if="selectValueDislay !== ''" @click.stop.prevent="clearValues" :class="clearClassObject">
                <fe-icon icon-pack="fas" icon="times" :size="size"></fe-icon>
            </div>
            <div :class="caretClassObject">
                <fe-icon icon-pack="fas" icon="caret-down" size="is-lg"></fe-icon>
            </div>
        </div>
        <select aria-hidden="true" :class="selectClassObject" :id="id" :name="name">
            <option v-for="(item, key) in selectedItems" :key="key" :value="item.id" selected>{{ key }}</option>
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

                        <div v-if="items.length > 0 && searchTerm === ''" :class="dropdownItemClassObject"
                             class="border-b">
                            <fe-checkbox key="selectAll"
                                         local-value="selectAll"
                                         v-model="selectAllValue"
                                         @input="selectAll"
                                         :class="checkboxClassObject"
                            >Select All
                            </fe-checkbox>
                        </div>
                    </div>
                    <div :class="dropdownContentItemWrapperClassObject">
                        <div v-if="groupByProperty === null" v-for="item in items"
                             :class="[dropdownItemClassObject, dropdownItemHoverClassObject]">
                            <fe-checkbox :key="item.id"
                                         :local-value="item.id"
                                         v-model="item.selected"
                                         @input="selectItem(item, $event)"
                                         :class="checkboxClassObject"
                            >{{ item.text }}
                            </fe-checkbox>
                        </div>
                        <template v-if="groupByProperty !== null" v-for="group in groups">
                            <div :class="[dropdownItemClassObject, dropdownItemHoverClassObject]"
                                 class="dropdown-group">
                                <fe-checkbox :key="group.name"
                                             :local-value="group.name"
                                             @input="selectGroup(group.name, $event)"
                                             v-model="group.selected"
                                             :class="checkboxClassObject"
                                >{{ group.name }}
                                </fe-checkbox>
                            </div>
                            <div v-for="groupItem in group.items"
                                 :class="[dropdownItemClassObject, dropdownItemHoverClassObject]"
                                 class="grouped-item pl-3">
                                <fe-checkbox :key="groupItem.id"
                                             :local-value="groupItem.id"
                                             v-model="groupItem.selected"
                                             @input="selectItem(groupItem, $event)"
                                             :class="checkboxClassObject"
                                >{{ groupItem.text }}
                                </fe-checkbox>
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
    import FeCheckbox from '@/components/Checkbox/Checkbox.vue';
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-multi-select',
        components: {
            FeInput,
            FeIcon,
            FeCheckbox
        },
        mixins: [SizeMixin],
        props: {
            id: {
                type: String,
                required: false,
            },
            name: {
                type: String,
                required: false,
            },
            placeholder: {
                type: String,
                required: false,
                default: 'Select Items'
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
            allItemSelectedLabel: {
                type: String,
                required: false,
                default: 'All Item Selected',
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
            sortSelected: {
                type: Boolean,
                required: false,
                default: false,
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
                selectedItems: [],
                searchTerm: '',
            }
        },
        computed: {
            /**
             * determine maximum display count as per the size of this component
             */
            maxDisplayLength() {
                if (this.size === 'is-xs') {
                    return 15;
                } else if (this.size === 'is-sm') {
                    return 18;
                } else if (this.size === 'is-md') {
                    return 20;
                } else if (this.size === 'is-lg') {
                    return 22;
                }

            },
            wrapperClassObject() {
                return [CssClasses.wrapper];
            },
            /**
             * class object
             */
            classObject() {
                let classes = ['fe-multi-select', CssClasses.base];
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
                    classes.push('center-position md:normal-position');
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
            checkboxClassObject() {
                return CssClasses.checkbox;
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
                return ['multi-select-search-clear', CssClasses.searchClear];
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
             * remaining value placeholder class object
             */
            remainingValuePlaceholderClassObject() {
                return CssClasses.remainingValuePlaceholder;
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
                    let selected = (this._.find(this.selectedItems, (selectedItem) => {
                        return selectedItem.id === id;
                    })) !== undefined;
                    return {
                        id: id,
                        text: itemData[this.labelProperty],
                        groupLabel: itemData[this.groupByProperty],
                        selected: selected,
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
                    this._.forIn(options, (value, key) => {
                        let unselectedItems = this._.filter(value, (groupItem) => {
                            return groupItem.selected !== true;
                        });
                        let selected = (unselectedItems === undefined || unselectedItems.length === 0);
                        groups.push({
                            name: key,
                            items: value,
                            selected: selected
                        });
                    });
                }
                return groups;
            },
            /**
             * collection of display text of all selected items
             */
            selectTexts() {
                return this._.map(this.selectedItems, (item) => {
                    return item.text;
                });
            },
            /**
             * collection of item identifier of all selected items
             */
            selectValues() {
                return this._.map(this.selectedItems, (item) => {
                    return item.id;
                });
            },
            /**
             * collection of maximum allowed selected item texts
             */
            selectValuesShort() {
                if (this.selectTexts.join(', ').length > this.maxDisplayLength) {
                    let currentLength = 0;
                    let shortDisplayValues = [];
                    this._.each(this.selectTexts, (value) => {
                        currentLength += value.length + 1;
                        if (currentLength <= this.maxDisplayLength) {
                            shortDisplayValues.push(value);
                        }
                    });
                    return shortDisplayValues;
                }
                return this.selectTexts;
            },
            /**
             * displayable text of comma separated selected items
             */
            selectValueDislay() {
                return (this.allItemSelected) ? this.allItemSelectedLabel : this.selectValuesShort.join(', ');
            },
            /**
             * if selected items are more than maximum then attach remaining item placeholder
             */
            selectedValueDisplayRemaining() {
                let remainingDisplayValue = '';
                if (this.selectTexts.length > this.selectValuesShort.length) {
                    let remainingCount = (this.selectTexts.length - this.selectValuesShort.length);
                    remainingDisplayValue = `+${remainingCount} more...`;
                }
                return remainingDisplayValue;
            },
            /**
             * check if all items are selected
             */
            allItemSelected() {
                return this.dataSource.length === this.selectedItems.length;
            },
            selectAllValue: {
                get() {
                    return this.allItemSelected;
                },
                set(value) {
                }
            }
        },
        watch: {
            /**
             * filter item list if multiselect is set to searchable
             */
            searchTerm(value) {
                if (this.searchable) {
                    if (value !== '') {
                        this.filteredItems = this._.filter(this.indexedDataSource, (itemData) => {
                            return this._.includes(this._.toLower(itemData[this.labelProperty]), this._.toLower(value));
                        });
                    } else {
                        this.filteredItems = this.indexedDataSource;
                        if (this.sortSelected && this.selectedItems.length > 0 && !this.allItemSelected) {
                            //if selection has been made then on opening of the multi select sort items
                            this.sortFilteredItemsBySelected();
                        }
                    }
                }
            }
        },
        methods: {
            /**
             * toggle opening of multiselect.
             * if opening multiselect and sortSelected is set then also sort selected items
             */
            toggleTrigger() {
                if (!this.opened) {
                    // if not opened, toggle after clickOutside event
                    // this fixes toggling programmatic
                    this.searchTerm = '';
                    this.$nextTick(() => {
                        this.opened = true;
                        if (this.sortSelected && this.selectedItems.length > 0 && !this.allItemSelected) {
                            //if selection has been made then on opening of the multi select sort items
                            this.sortFilteredItemsBySelected();
                        }
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
                let found = this._.find(this.selectedItems, (selectedItem) => {
                    return selectedItem.id === item.id;
                });
                return found !== undefined;
            },
            /**
             * select supplied item if checked
             * @param item
             * @param checked
             */
            selectItem(item, checked) {
                if (checked) {
                    if (!this.isItemSelected(item)) {
                        this.selectedItems.push(item);
                        this.selectedItems = this._.orderBy(this.selectedItems, ['feIndex'], ['asc']);
                    }
                } else {
                    this.selectedItems = this._.filter(this.selectedItems, (selectedItem) => {
                        return selectedItem.id !== item.id;
                    });
                }
                this.$emit('input', this.selectValues);
            },
            /**
             * select all items and emit an input even
             * @param checked
             */
            selectAll(checked) {
                this._.each(this.items, (item) => {
                    this.selectItem(item, checked);
                });
                this.$emit('input', this.selectValues);
            },
            /**
             * clear values
             */
            clearValues() {
                this.selectedItems = [];
                this.$emit('input', this.selectValues);
            },
            /**
             * select group items for supplied group name
             * @param groupName
             * @param checked
             */
            selectGroup(groupName, checked) {
                let group = this._.find(this.groups, (group) => {
                    return group.name === groupName;
                });
                if (group !== undefined && group.items !== undefined) {
                    this._.each(group.items, (groupItem) => {
                        this.selectItem(groupItem, checked);
                    });
                }
            },
            /**
             * clear search term input
             */
            clearSearch() {
                this.searchTerm = '';
            },
            /**
             * order selected items to the top on re-open
             */
            sortFilteredItemsBySelected() {
                this.filteredItems = this._.map(this.filteredItems, (itemData) => {
                    itemData.selected = (this._.find(this.selectedItems, (selectedItem) => {
                        return selectedItem.id === itemData.id;
                    })) !== undefined ? 1 : 0;
                    return itemData;
                });
                this.filteredItems = this._.orderBy(
                    this.filteredItems,
                    ['selected', 'feIndex'],
                    ['desc', 'asc']
                );
            },
        },
        mounted() {
            this.indexedDataSource = this._.orderBy(this._.map(this.dataSource, (item, key) => {
                return this._.merge(this._.clone(item), {
                    feIndex: key
                });
            }), ['feIndex'], ['asc']);
            this.filteredItems = this.indexedDataSource;
        }
    }
</script>

<style scoped>
    .fe-multi-select.is-xs {
        width: 240px;
    }

    .fe-multi-select.is-sm {
        width: 280px;
    }

    .fe-multi-select.is-md {
        width: 320px;
    }

    .fe-multi-select.is-lg {
        width: 360px;
    }

    .dropdown-content {
        margin-top: .15rem;
    }

    .dropdown-content-items-wrapper {
        max-height: 275px;
    }

    .fe-multi-select.is-xs .dropdown-content-items-wrapper {
        width: 238px;
    }

    .fe-multi-select.is-sm .dropdown-content-items-wrapper {
        width: 278px;
    }

    .fe-multi-select.is-md .dropdown-content-items-wrapper {
        width: 318px;
    }

    .fe-multi-select.is-lg .dropdown-content-items-wrapper {
        width: 358px;
    }

    @media (min-width: 768px) {
        .fe-multi-select .md\:normal-position {
            position: absolute;
            top: auto;
            right: auto;
            bottom: auto;
            left: auto;
            -webkit-transform: none;
            transform: none;
        }
    }

    .center-position {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

</style>
