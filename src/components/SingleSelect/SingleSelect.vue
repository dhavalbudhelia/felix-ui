<template>
  <div :class="[classObject, size]">
    <div :class="wrapperClassObject" @click="toggleTrigger">
      <div :class="placeholderWrapperClassObject">
        <div v-if="selectedText === ''" :class="placeholderClassObject">{{ placeholder }}</div>
        <div :class="displayValuePlaceholderClassObject">{{ selectedText }}</div>
      </div>
      <div v-if="selectedText !== ''" @click.stop.prevent="clearValues" :class="clearClassObject">
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
      <option v-if="selectedItem !== null" :value="selectedItem.id" selected>{{ selectedItem.id }}</option>
    </select>
    <transition name="fade">
      <div v-if="opened" :class="dropDownMenuClassObject" @click.stop>
        <div :class="dropdownContentClassObject">
          <div class="dropdown-content-header-wrapper">
            <div v-if="searchable" :class="dropdownItemClassObject" class="border-b p-1 px-2">
              <FeInput ref="search"
                        v-model="searchTerm"
                        placeholder="Search..."
                        class="w-full"
              >
                <template #iconBefore>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </template>
              </FeInput>
              <div v-if="searchTerm !== ''"
                   @click.stop.prevent="clearSearch"
                   :class="searchClearClassObject"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
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

<script lang="ts">
import {defineComponent,ref, computed, nextTick, inject, onMounted, watch} from "vue";
import FeInput from '@/components/Input/Input.vue';

interface SelectedItem {
  id: string;
  text: string;
}

export default defineComponent({
  name: 'FeSingleSelect',
  components: {
    FeInput,
  },
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
    size: {
      type: String,
      default: 'is-md',
      validator: function (value: string) {
        return ['is-xs', 'is-sm', 'is-md', 'is-lg'].includes(value);
      },
    },
  },
  setup(props, {emit}) {
    const $theme = inject('$theme');
    const indexedDataSource = ref<Array<{feIndex: number;}>>([]);
    const opened = ref(false);
    const filteredItems = ref<Array<{feIndex: number;}>>([]);
    const selectedItem = ref<SelectedItem|null>(null);
    const searchTerm = ref('');

    const wrapperClassObject = computed(() => {
      return ['border rounded flex flex-nowrap items-center cursor-pointer border-gray-400 hover:border-gray-500'];
    });

    /**
     * class object
     */
    const classObject = computed(() => {
      let classes = ['fe-single-select outline-none block'];
      if (props.expanded) {
        classes.push('expanded w-full');
      }
      if (opened.value) {
        classes.push('opened')
      }
      return classes;
    });

    /**
     * class names object for dropdown menu
     */
    const dropDownMenuClassObject = computed(() => {
      let classes = ['dropdown-menu'];
      if (opened.value) {
        classes.push('block z-20');
        classes.push('singleselect-center-position md:normal-position');
      } else {
        classes.push('hidden');
      }
      return classes;
    });

    /**
     * dropdown content class object
     */
    const dropdownContentClassObject = computed(() => {
      return ['dropdown-content bg-white rounded border border-gray-400 shadow'];
    });

    /**
     * dropdown item wrapper class object
     */
    const dropdownContentItemWrapperClassObject = computed(() => {
      return ['dropdown-content-items-wrapper left-0 overflow-y-scroll z-20'];
    });

    /**
     * dropdown item class object
     */
    const dropdownItemClassObject = computed(() => {
      let classes = ['dropdown-item text-gray-800 block relative'];
      switch (props.size) {
        case 'is-xs':
          classes.push('leading-tight');
          break;
        case 'is-sm':
          classes.push('leading-snug');
          break;
        case 'is-md':
          classes.push('leading-normal');
          break;
        case 'is-lg':
          classes.push('leading-relaxed');
          break;
        default:
          classes.push('leading-normal');
      }
      return classes;
    });

    /**
     * dropdown item hover effect class object
     */
    const dropdownItemHoverClassObject = computed(() => {
      return 'hover:bg-gray-100 hover:cursor-pointer';
    });

    /**
     * checkbox class object
     */
    const itemClassObject = computed(() => {
      return 'w-full h-full py-2 px-4';
    });

    /**
     * checkbox class object
     */
    const groupClassObject = computed(() => {
      return 'w-full h-full py-2 px-3 bg-gray-200 text-gray-600 hover:cursor-default';
    });

    /**
     * select element class object
     */
    const selectClassObject = computed(() => {
      return 'hidden';
    });

    /**
     * clear icon class object
     */
    const clearClassObject = computed(() => {
      return 'float-right grow-0 flex items-center cursor-pointer w-6 text-gray-500';
    });

    /**
     * search clear icon class object
     */
    const searchClearClassObject = computed(() => {
      return ['single-select-search-clear absolute top-0 right-0 py-2 cursor-pointer w-8 text-gray-500'];
    });

    /**
     * placeholder wrapper class object
     */
    const placeholderWrapperClassObject = computed(() => {
      let classes = ['placeholder-wrapper flex-1 outline-none flex flex-nowrap items-center'];
      switch (props.size) {
        case 'is-xs':
          classes.push('text-xs');
          break;
        case 'is-sm':
          classes.push('text-sm');
          break;
        case 'is-md':
          classes.push('text-base');
          break;
        case 'is-lg':
          classes.push('text-lg');
          break;
        default:
          classes.push('text-base');
      }
      return classes;
    });

    /**
     * placeholder class object
     */
    const placeholderClassObject = computed(() => {
      return 'px-2 text-gray-400';
    });

    /**
     * display value placeholder class object
     */
    const displayValuePlaceholderClassObject = computed(() => {
      return 'px-2';
    });

    /**
     * dropdown caret icon class object
     */
    const caretClassObject = computed(() => {
      let classes = ['caret grow-0 border-l border-gray-300 h-full px-2 text-center'];
      switch (props.size) {
        case 'is-xs':
          classes.push('py-0');
          break;
        case 'is-sm':
          classes.push('py-0');
          break;
        case 'is-md':
          classes.push('py-1');
          break;
        case 'is-lg':
          classes.push('py-2 w-10');
          break;
        default:
          classes.push('py-1');
      }
      return classes;
    });

    /**
     * backdrop class object
     */
    const backdropClassObject = computed(() => {
      return 'fixed w-full h-full top-0 left-0 z-10 md:bg-white md:opacity-0 bg-black opacity-75';
    });

    /**
     * computed prop for item data
     */
    const items = computed(() => {
      return filteredItems.value.map((itemData) => {
        let id = itemData[props.valueProperty];
        return {
          id: id,
          text: itemData[props.labelProperty],
          groupLabel: itemData[props.groupByProperty],
          isGroupItem: false,
          selected: selectedItem.value !== null && selectedItem.value.id === id,
          feIndex: itemData['feIndex']
        };
      });
    });

    /**
     * computed prop for grouped item
     */
    const groups = computed(() => {
      if (props.groupByProperty !== null) {
        return groupBy('groupLabel');
      }
      return [];
    });

    /**
     * collection of display text of all selected items
     */
    const selectedText = computed(() => {
      return selectedItem.value !== null ? selectedItem.value.text : '';
    });

    const groupBy = (key) => {
      return items.value.reduce(function (group, item) {
        item.isGroupItem = true;
        (group[item[key]] = group[item[key]] || []).push(item);
        return group;
      }, {});
    };

    /**
     * toggle opening of singleselect.
     */
    const toggleTrigger = () => {
      if (!opened.value) {
        // if not opened, toggle after clickOutside event
        // this fixes toggling programmatic
        searchTerm.value = '';
        nextTick(() => {
          opened.value = true;
        });
      } else {
        opened.value = false;
      }
    };

    /**
     * Close dropdown if clicked outside.
     */
    const clickedOutside = () => {
      opened.value = false;
    };

    /**
     * check if supplied item is selected
     * @param item
     * @return {boolean}
     */
    const isItemSelected = (item) =>  {
      return selectedItem.value !== null && selectedItem.value.id === item.id;
    };

    /**
     * select supplied item if checked
     * @param item
     */
    const selectItem = (item: SelectedItem) => {
      console.log('selecting item');
      selectedItem.value = item;
      emit('update:modelValue', item.id);
      clickedOutside();
    };

    /**
     * clear values
     */
    const clearValues = () => {
      selectedItem.value = null;
      emit('update:modelValue', '');
    };

    /**
     * clear search term input
     */
    const clearSearch = () => {
      searchTerm.value = '';
    };

    const getItemClassObject = (item) => {
      let selectedClass = isItemSelected(item) ? 'bg-gray-200' : '';
      let color = isItemSelected(item) ? `selected-item text-white bg-${$theme.color.primary}` : '';
      let itemClass = (props.groupByProperty !== null) ? 'w-full h-full py-2 px-6' : 'w-full h-full py-2 px-4';
      return [itemClass, selectedClass, color, 'item'];
    };

    onMounted(() => {
      let mappedDataSource = props.dataSource.map((item: any, key) => {
        return Object.assign(item, {
          feIndex: key
        });
      });
      indexedDataSource.value = mappedDataSource.sort((current, next) => {
        if (current.feIndex > next.feIndex) {
          return 1;
        }
        if (next.feIndex > current.feIndex) {
          return -1;
        }
        return 0;
      });
      filteredItems.value = indexedDataSource.value;
      if (props.modelValue !== '') {
        let foundItem = items.value.find((item) => {
          return item.id === props.modelValue;
        });
        if (foundItem !== undefined) {
          selectedItem.value = foundItem;
        }
      }
    });

    /**
     * filter item list if singleselect is set to searchable
     */
    watch(() => searchTerm.value, (value) => {
      if (props.searchable) {
        if (value !== '') {
          filteredItems.value = indexedDataSource.value.filter((itemData) => {
            return itemData[props.labelProperty].toLowerCase().includes(value.toLowerCase());
          });
        } else {
          filteredItems.value = indexedDataSource.value;
        }
      }
    });

    watch(() => opened.value, (newValue) => {
      if (newValue && props.searchable) {
        nextTick(() => {
          if (
              document.getElementsByClassName('fe-input').length > 0 &&
              document.getElementsByClassName('fe-input')[0]
          ) {
            document.getElementsByClassName('fe-input')[0]?.focus();
          }
        });
      }
    });

    return {
      indexedDataSource,
      opened,
      filteredItems,
      selectedItem,
      searchTerm,
      wrapperClassObject,
      classObject,
      dropDownMenuClassObject,
      dropdownContentClassObject,
      dropdownContentItemWrapperClassObject,
      dropdownItemClassObject,
      dropdownItemHoverClassObject,
      itemClassObject,
      groupClassObject,
      selectClassObject,
      clearClassObject,
      searchClearClassObject,
      placeholderWrapperClassObject,
      placeholderClassObject,
      displayValuePlaceholderClassObject,
      caretClassObject,
      backdropClassObject,
      items,
      groups,
      selectedText,
      groupBy,
      toggleTrigger,
      clickedOutside,
      isItemSelected,
      selectItem,
      clearValues,
      clearSearch,
      getItemClassObject,
    }
  },
});
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
