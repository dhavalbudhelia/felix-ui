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
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div :class="caretClassObject">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
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
                        class="w-full"
              >
                <template #iconBefore>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </template>
              </fe-input>
              <div v-if="searchTerm !== ''"
                   @click.stop.prevent="clearSearch"
                   :class="searchClearClassObject"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <div v-if="items.length > 0 && searchTerm === ''" :class="dropdownItemClassObject"
                 class="border-b">
              <fe-checkbox key="selectAll"
                           v-model="selectAllValue"
                           @update:modelValue="selectAll"
                           :css-class="checkboxClassObject"
              >Select All
              </fe-checkbox>
            </div>
          </div>
          <div :class="dropdownContentItemWrapperClassObject">
            <div v-if="groupByProperty === null" v-for="item in items"
                 :class="[dropdownItemClassObject, dropdownItemHoverClassObject]">
              <fe-checkbox :key="item.id"
                           v-model="item.selected"
                           @update:modelValue="selectItem(item, $event)"
                           :css-class="checkboxClassObject"
              >{{ item.text }}
              </fe-checkbox>
            </div>
            <template v-if="groupByProperty !== null" v-for="(group, groupName) in groups">
              <div :class="[dropdownItemClassObject, dropdownItemHoverClassObject]"
                   class="dropdown-group">
                <fe-checkbox :key="groupName"
                             @update:modelValue="selectGroup(groupName, $event)"
                             v-model="group.selected"
                             :css-class="checkboxClassObject"
                >{{ groupName }}
                </fe-checkbox>
              </div>
              <div v-for="groupItem in group.items"
                   :class="[dropdownItemClassObject, dropdownItemHoverClassObject]"
                   class="grouped-item pl-3">
                <fe-checkbox :key="groupItem.id"
                             v-model="groupItem.selected"
                             @update:modelValue="selectItem(groupItem, $event)"
                             :css-class="checkboxClassObject"
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
import FeInput from '@/components/Input/Input.vue';
import FeCheckbox from '@/components/Checkbox/Checkbox.vue';
import SizeMixin from "../../mixins/SizeMixin.js";
import CssClasses from "./CssClasses";

export default {
  name: 'fe-multi-select',
  components: {
    FeInput,
    FeCheckbox
  },
  mixins: [SizeMixin],
  emits: ['update:modelValue'],
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select Items'
    },
    dataSource: {
      type: Array,
      default: function () {
        return [];
      }
    },
    valueProperty: {
      type: String,
      default: 'value',
    },
    labelProperty: {
      type: String,
      default: 'label',
    },
    groupByProperty: {
      type: String,
      default: null,
    },
    allItemSelectedLabel: {
      type: String,
      default: 'All Item Selected',
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    noRecordsFoundTemplate: {
      type: String,
      default: 'No Records Found'
    },
    sortSelected: {
      type: Boolean,
      default: false,
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
      return classes;
    },
    /**
     * class names object for dropdown menu
     */
    dropDownMenuClassObject() {
      let classes = ['dropdown-menu'];
      if (this.opened) {
        classes.push(CssClasses.menu);
        classes.push('multiselect-center-position md:normal-position');
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
      return this.filteredItems.map((itemData) => {
        let id = itemData[this.valueProperty];
        let selected = (this.selectedItems.find((selectedItem) => {
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
      if (this.groupByProperty !== null) {
        return this.items.reduce(function (group, item) {
          if (group[item['groupLabel']] === undefined) {
            Object.assign(group, {
              [item['groupLabel']]: {}
            });
          }
          if (group[item['groupLabel']].items === undefined) {
            Object.assign(group[item['groupLabel']], {
              items: []
            });
          }
          group[item['groupLabel']].items.push(item);
          let unselectedItems = group[item['groupLabel']].items.filter((groupItem) => {
            return groupItem.selected !== true;
          });
          group[item['groupLabel']].selected = (unselectedItems === undefined || unselectedItems.length === 0);
          return group;
        }, {});
      }
      return [];
    },
    /**
     * collection of display text of all selected items
     */
    selectTexts() {
      return this.selectedItems.map((item) => {
        return item.text;
      });
    },
    /**
     * collection of item identifier of all selected items
     */
    selectValues() {
      return this.selectedItems.map((item) => {
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
        this.selectTexts.forEach((value) => {
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
          this.filteredItems = this.indexedDataSource.filter((itemData) => {
            return itemData[this.labelProperty].toLowerCase().includes(value.toLowerCase());
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
      let found = this.selectedItems.find((selectedItem) => {
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
          this.selectedItems = this.selectedItems.sort((current, next) => {
            if (current.feIndex > next.feIndex) {
              return 1;
            }
            if (next.feIndex > current.feIndex) {
              return -1;
            }
            return 0;
          });
        }
      } else {
        this.selectedItems = this.selectedItems.filter((selectedItem) => {
          return selectedItem.id !== item.id;
        });
      }
      this.$emit('update:modelValue', this.selectValues);
    },
    /**
     * select all items and emit an input even
     * @param checked
     */
    selectAll(checked) {
      this.items.forEach((item) => {
        this.selectItem(item, checked);
      });
      this.$emit('update:modelValue', this.selectValues);
    },
    /**
     * clear values
     */
    clearValues() {
      this.selectedItems = [];
      this.$emit('update:modelValue', this.selectValues);
    },
    /**
     * select group items for supplied group name
     * @param groupName
     * @param checked
     */
    selectGroup(groupName, checked) {
      if (this.groups[groupName] !== undefined && this.groups[groupName].items !== undefined) {
        this.groups[groupName].items.forEach((groupItem) => {
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
      this.filteredItems = this.filteredItems.map((itemData) => {
        itemData.selected = (this.selectedItems.find((selectedItem) => {
          return selectedItem.id === itemData.id;
        })) !== undefined ? 1 : 0;
        return itemData;
      });
      this.filteredItems = this.filteredItems.sort((current, next) => {
        return next.selected - current.selected || current.feIndex - next.feIndex;
      });
    },
  },
  mounted() {
    let mappedDataSource = this.dataSource.map((item, key) => {
      return Object.assign(item, {
        feIndex: key
      });
    });

    this.indexedDataSource = mappedDataSource.sort((current, next) => {
      if (current.feIndex > next.feIndex) {
        return 1;
      }
      if (next.feIndex > current.feIndex) {
        return -1;
      }
      return 0;
    });
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

.fe-multi-select .dropdown-content {
  margin-top: .15rem;
}

.fe-multi-select .dropdown-content-items-wrapper {
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

.multiselect-center-position {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.fe-multi-select .fade-enter-active, .fe-multi-select .fade-leave-active {
  transition: opacity .3s ease;
}

.fe-multi-select .fade-enter, .fe-multi-select .fade-leave-to {
  opacity: 0;
}

</style>
