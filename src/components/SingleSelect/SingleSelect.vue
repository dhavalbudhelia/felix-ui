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
              >{{ item.text }}
              </div>
            </div>
            <template v-if="groupByProperty !== null" v-for="(group, groupName) in groups">
              <div :class="[dropdownItemClassObject, dropdownItemHoverClassObject]"
                   class="dropdown-group">
                <div :class="groupClassObject">{{ groupName }}</div>
              </div>
              <div v-for="groupItem in group"
                   :class="[dropdownItemClassObject, dropdownItemHoverClassObject]"
                   class="grouped-item">
                <div @click="selectItem(groupItem)"
                     :class="getItemClassObject(groupItem)"
                >{{ groupItem.text }}
                </div>
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
import SizeMixin from "../../mixins/SizeMixin.js";
import CssClasses from "./CssClasses";

export default {
  name: 'fe-single-select',
  components: {
    FeInput,
    FeIcon,
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
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Select Item'
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
    searchable: {
      type: Boolean,
      default: false,
    },
    noRecordsFoundTemplate: {
      type: String,
      default: 'No Records Found'
    },
    expanded: {
      type: Boolean,
      default: false,
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
      if (this.expanded) {
        classes.push('expanded w-full');
      }
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
      return this.filteredItems.map((itemData) => {
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
      if (this.groupByProperty !== null) {
        return this.groupBy(this.items, 'groupLabel');
      }
      return [];
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
          this.filteredItems = this.indexedDataSource.filter((itemData) => {
            return itemData[this.labelProperty].toLowerCase().includes(value.toLowerCase());
          });
        } else {
          this.filteredItems = this.indexedDataSource;
        }
      }
    }
  },
  methods: {
    groupBy(items, key) {
      return items.reduce(function (group, item) {
        item.isGroupItem = true;
        (group[item[key]] = group[item[key]] || []).push(item);
        return group;
      }, {});
    },

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
      this.$emit('update:modelValue', this.selectedItem.id);
      this.clickedOutside();
    },
    /**
     * clear values
     */
    clearValues() {
      this.selectedItem = null;
      this.$emit('update:modelValue', '');
    },
    /**
     * clear search term input
     */
    clearSearch() {
      this.searchTerm = '';
    },
    getItemClassObject(item) {
      let selectedClass = this.isItemSelected(item) ? CssClasses.dropdownItemSelected : '';
      let color = this.isItemSelected(item) ? `text-white bg-${this.$theme.color.primary}` : '';
      let itemClass = (this.groupByProperty !== null) ? CssClasses.groupItem : CssClasses.item;
      return [itemClass, selectedClass, color];
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
    if (this.modelValue !== '') {
      let selectedItem = this.items.find((item) => {
        return item.id === this.modelValue;
      });
      if (selectedItem !== undefined) {
        this.selectedItem = selectedItem;
      }
    }
  }
}
</script>

<style scoped>
.fe-single-select.is-xs:not(.expanded) {
  width: 240px;
}

.fe-single-select.is-sm:not(.expanded) {
  width: 280px;
}

.fe-single-select.is-md:not(.expanded) {
  width: 320px;
}

.fe-single-select.is-lg:not(.expanded) {
  width: 360px;
}

.fe-single-select .dropdown-content {
  margin-top: .15rem;
}

.fe-single-select .dropdown-content-items-wrapper {
  max-height: 275px;
}

.fe-single-select.is-xs .dropdown-content-items-wrapper {
  width: 238px;
}

.fe-single-select.is-sm .dropdown-content-items-wrapper {
  width: 278px;
}

.fe-single-select.is-md .dropdown-content-items-wrapper {
  width: 318px;
}

.fe-single-select.is-lg .dropdown-content-items-wrapper {
  width: 358px;
}

@media (min-width: 768px) {
  .fe-single-select .md\:normal-position {
    position: absolute;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    -webkit-transform: none;
    transform: none;
  }
}

.singleselect-center-position {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.fe-single-select .fade-enter-active, .fe-single-select .fade-leave-active {
  transition: opacity .2s ease;
}

.fe-single-select .fade-enter, .fe-single-select .fade-leave-to {
  opacity: 0;
}

</style>
