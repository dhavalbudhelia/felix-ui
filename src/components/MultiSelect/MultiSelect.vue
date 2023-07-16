<template>
  <div :class="[classObject, size]">
    <div class="border rounded flex flex-nowrap items-center cursor-pointer border-gray-400 hover:border-gray-500" @click="toggleTrigger">
      <div :class="placeholderWrapperClassObject">
        <div v-if="selectValueDisplay === ''" class="px-2 text-gray-400">{{ placeholder }}</div>
        <div class="px-2">{{ selectValueDisplay }}</div>
        <div v-if="!allItemSelected" class="text-gray-600">
          {{ selectedValueDisplayRemaining }}
        </div>
      </div>
      <div v-if="selectValueDisplay !== ''" @click.stop.prevent="clearValues"
           class="float-right grow-0 flex items-center cursor-pointer w-6 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
      <div :class="caretClassObject">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
    <select aria-hidden="true" class="hidden" :id="id" :name="name">
      <option v-for="(item, key) in selectedItems" :key="key" :value="item.id" selected>{{ key }}</option>
    </select>
    <div>{{ opened }}</div>
    <transition name="fade">
      <div v-if="opened" :class="dropDownMenuClassObject" @click.stop>
        <div class="dropdown-content bg-white rounded border border-gray-400 shadow">
          <div class="dropdown-content-header-wrapper">
            <div v-if="searchable" :class="dropdownItemClassObject" class="border-b p-1 px-2">
              <FeInput
                  ref="search"
                  v-model="searchTerm"
                  placeholder="Search..."
                  class="w-full"
                  data-testid="search-input"
              >
                <template #iconBefore>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </template>
              </FeInput>
              <div
                  v-if="searchTerm !== ''"
                  @click.stop.prevent="clearSearch"
                  class="multi-select-search-clear absolute top-0 right-0 py-2 cursor-pointer w-8 text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </div>

            <div v-if="items.length > 0 && searchTerm === ''" :class="dropdownItemClassObject"
                 class="border-b">
              <FeCheckbox
                  key="selectAll"
                  :model-value="allItemSelected"
                  @update:modelValue="selectAll"
                  css-class="w-full h-full py-1 px-4"
              >Select All
              </FeCheckbox>
            </div>
          </div>
          <div class="dropdown-content-items-wrapper left-0 overflow-y-scroll z-20">
            <div v-if="groupByProperty === null" v-for="item in items"
                 :class="[dropdownItemClassObject, 'hover:bg-gray-200 hover:cursor-pointer']">
              <FeCheckbox
                  :key="item.id"
                  v-model="item.selected"
                  @update:modelValue="selectItem(item, $event)"
                  css-class="w-full h-full py-1 px-4"
              >{{ item.text }}
              </FeCheckbox>
            </div>
            <template v-if="groupByProperty !== null" v-for="(group, groupName) in groups">
              <div :class="[dropdownItemClassObject, 'hover:bg-gray-200 hover:cursor-pointer']"
                   class="dropdown-group">
                <FeCheckbox
                    :key="groupName"
                    @update:modelValue="selectGroup(groupName, $event)"
                    v-model="group.selected"
                    css-class="w-full h-full py-1 px-4"
                >{{ groupName }}
                </FeCheckbox>
              </div>
              <div v-for="groupItem in group.items"
                   :class="[dropdownItemClassObject, 'hover:bg-gray-200 hover:cursor-pointer']"
                   class="grouped-item pl-3">
                <FeCheckbox
                    :key="groupItem.id"
                    v-model="groupItem.selected"
                    @update:modelValue="selectItem(groupItem, $event)"
                    css-class="w-full h-full py-1 px-4"
                >{{ groupItem.text }}
                </FeCheckbox>
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
    <div v-if="opened" @click="clickedOutside" class="fixed w-full h-full top-0 left-0 z-10 md:bg-white md:opacity-0 bg-black opacity-75"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted, nextTick, watch} from "vue";
import FeInput from '@/components/Input/Input.vue';
import FeCheckbox from '@/components/Checkbox/Checkbox.vue';

export default defineComponent({
  name: 'FeMultiSelect',
  components: {
    FeInput,
    FeCheckbox
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
    size: {
      type: String,
      default: 'is-md',
      required: false,
      validator: (value: string) => {
        return ['is-xs', 'is-sm', 'is-md', 'is-lg'].includes(value);
      },
    },
  },
  setup(props, {emit}) {
    const indexedDataSource = ref([]);
    const opened = ref(false);
    const filteredItems = ref([]);
    const selectedItems = ref([]);
    const searchTerm = ref('');

    /**
     * determine maximum display count as per the size of this component
     */
    const maxDisplayLength = computed(() => {
      if (props.size === 'is-xs') {
        return 15;
      } else if (props.size === 'is-sm') {
        return 18;
      } else if (props.size === 'is-lg') {
        return 22;
      } else {
        return 20;
      }
    });

    /**
     * class object
     */
    const classObject = computed(() => {
      let classes = ['fe-multi-select outline-none block'];
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
        classes.push('multiselect-center-position md:normal-position');
      } else {
        classes.push('hidden');
      }
      return classes;
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
     * computed prop for item data
     */
    const items = computed(() => {
      return filteredItems.value.map((itemData) => {
        let id = itemData[props.valueProperty];
        let selected = (selectedItems.value.find((selectedItem: { id: string }) => {
          return selectedItem.id === id;
        })) !== undefined;
        return {
          id: id,
          text: itemData[props.labelProperty],
          groupLabel: itemData[props.groupByProperty],
          selected: selected,
          feIndex: itemData['feIndex']
        };
      });
    });

    /**
     * computed prop for grouped item
     */
    const groups = computed(() => {
      if (props.groupByProperty) {
        return items.value.reduce(function (group: any, item) {
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
    });

    /**
     * collection of display text of all selected items
     */
    const selectTexts = computed(() => {
      return selectedItems.value.map((item: { text: string }) => {
        return item.text;
      });
    });

    /**
     * collection of item identifier of all selected items
     */
    const selectValues = computed(() => {
      return selectedItems.value.map((item: { id: string }) => {
        return item.id;
      });
    });

    /**
     * collection of maximum allowed selected item texts
     */
    const selectValuesShort = computed(() => {
      if (selectTexts.value.join(', ').length > maxDisplayLength.value) {
        let currentLength = 0;
        let shortDisplayValues = [];
        selectTexts.value.forEach((value) => {
          currentLength += value.length + 1;
          if (currentLength <= maxDisplayLength.value) {
            shortDisplayValues.push(value);
          }
        });
        return shortDisplayValues;
      }
      return selectTexts.value;
    });

    /**
     * displayable text of comma separated selected items
     */
    const selectValueDisplay = computed(() => {
      return (allItemSelected.value) ? props.allItemSelectedLabel : selectValuesShort.value.join(', ');
    });

    /**
     * if selected items are more than maximum then attach remaining item placeholder
     */
    const selectedValueDisplayRemaining = computed(() => {
      let remainingDisplayValue = '';
      if (selectTexts.value.length > selectValuesShort.value.length) {
        let remainingCount = (selectTexts.value.length - selectValuesShort.value.length);
        remainingDisplayValue = `+${remainingCount} more...`;
      }
      return remainingDisplayValue;
    });

    /**
     * check if all items are selected
     */
    const allItemSelected = computed(() => {
      return props.dataSource?.length === selectedItems.value.length;
    });

    onMounted(() => {
      let mappedDataSource = props.dataSource?.map((item, key) => {
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
    });

    /**
     * toggle opening of multiselect.
     * if opening multiselect and sortSelected is set then also sort selected items
     */
    const toggleTrigger = () => {
      if (!opened.value) {
        // if not opened, toggle after clickOutside event
        // this fixes toggling programmatic
        searchTerm.value = '';
        nextTick(() => {
          opened.value = true;
          if (props.sortSelected && selectedItems.value.length > 0 && !allItemSelected.value) {
            //if selection has been made then on opening of the multi select sort items
            sortFilteredItemsBySelected();
          }
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
    const isItemSelected = (item) => {
      let found = selectedItems.value.find((selectedItem) => {
        return selectedItem.id === item.id;
      });
      return found !== undefined;
    };

    /**
     * select supplied item if checked
     * @param item
     * @param checked
     */
    const selectItem = (item, checked) => {
      if (checked) {
        if (!isItemSelected(item)) {
          selectedItems.value.push(item);
          selectedItems.value = selectedItems.value.sort((current, next) => {
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
        selectedItems.value = selectedItems.value.filter((selectedItem) => {
          return selectedItem.id !== item.id;
        });
      }
      emit('update:modelValue', selectValues.value);
    };

    /**
     * select all items and emit an input even
     * @param checked
     */
    const selectAll = (checked) => {
      items.value.forEach((item) => {
        selectItem(item, checked);
      });
      emit('update:modelValue', selectValues.value);
    };

    /**
     * clear values
     */
    const clearValues = () => {
      selectedItems.value = [];
      emit('update:modelValue', selectValues.value);
    };

    /**
     * select group items for supplied group name
     * @param groupName
     * @param checked
     */
    const selectGroup = (groupName, checked) => {
      if (groups.value[groupName] !== undefined && groups.value[groupName].items !== undefined) {
        groups.value[groupName].items.forEach((groupItem) => {
          selectItem(groupItem, checked);
        });
      }
    };

    /**
     * clear search term input
     */
    const clearSearch = () => {
      searchTerm.value = '';
    };

    /**
     * order selected items to the top on re-open
     */
    const sortFilteredItemsBySelected = () => {
      filteredItems.value = filteredItems.value.map((itemData) => {
        itemData.selected = (selectedItems.value.find((selectedItem) => {
          return selectedItem.id === itemData.id;
        })) !== undefined ? 1 : 0;
        return itemData;
      });
      filteredItems.value = filteredItems.value.sort((current, next) => {
        return next.selected - current.selected || current.feIndex - next.feIndex;
      });
    };

    watch(() => searchTerm.value, (newValue) => {
      if (props.searchable) {
        if (newValue !== '') {
          filteredItems.value = indexedDataSource.value.filter((itemData) => {
            return itemData[props.labelProperty].toLowerCase().includes(newValue.toLowerCase());
          });
        } else {
          filteredItems.value = indexedDataSource.value;
          if (props.sortSelected && selectedItems.value.length > 0 && !allItemSelected.value) {
            //if selection has been made then on opening of the multi select sort items
            sortFilteredItemsBySelected();
          }
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
      selectedItems,
      searchTerm,
      maxDisplayLength,
      classObject,
      dropDownMenuClassObject,
      dropdownItemClassObject,
      placeholderWrapperClassObject,
      caretClassObject,
      items,
      groups,
      selectTexts,
      selectValues,
      selectValuesShort,
      selectValueDisplay,
      selectedValueDisplayRemaining,
      allItemSelected,
      toggleTrigger,
      clickedOutside,
      isItemSelected,
      selectItem,
      selectAll,
      clearValues,
      selectGroup,
      clearSearch,
      sortFilteredItemsBySelected,
    }
  },
});
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
