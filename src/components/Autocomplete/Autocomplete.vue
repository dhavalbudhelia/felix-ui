<template>
  <div class="fe-autocomplete">
    <FeInput
        :placeholder="placeholder"
        v-model="searchTerm"
        :id="id"
        :name="name"
    >
      <template #iconBefore>
        <slot name="iconBefore"/>
      </template>
      <template #iconAfter>
        <slot name="iconAfter"/>
      </template>
    </FeInput>
    <div :class="[dropdownClassObject]">
      <transition name="fade">
        <div :class="dropDownMenuClassObject">
          <div class="dropdown-content bg-white rounded border border-gray-400 shadow py-2">
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

<script lang="ts">
import {defineComponent, ref, computed, watch} from "vue";
import FeInput from '@/components/Input/Input.vue';

export default defineComponent({
  name: 'FeAutocomplete',
  emits: ['searching', 'update:modelValue'],
  components: {
    FeInput,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      default: (() => {
        return [];
      }),
    },
    placeholder: {
      type: String,
      default: 'Type to search...',
    },
    async: {
      type: Boolean,
      default: false,
    },
  },
  setup (props, {emit}) {
    const localInputElement = ref(null);
    const opened = ref(false);
    const filteredItems = ref<Array<string>>([]);
    const searchTerm = ref('');

    const dropdownClassObject = computed(() => {
      let classes = ['fe-dropdown block align-top'];
      if (opened.value) {
        classes.push('opened')
      }
      return classes;
    });

    const dropDownMenuClassObject = computed(() => {
      let classes = ['dropdown-menu'];
      if (opened.value) {
        classes.push('block z-20 pt-1');
        classes.push('inset-auto absolute transform-none');
      } else {
        classes.push('hidden');
      }
      return classes;
    });

    const itemClassObject = ['dropdown-item text-gray-800 block leading-normal py-1 px-4 relative hover:bg-gray-200 hover:cursor-pointer'];

    const computedItems = computed(() => {
      return props.async ? props.items : filteredItems.value;
    });

    const isEmpty = computed(() => {
      return computedItems.value.length === 0;
    });

    //Close dropdown if clicked outside.
    const clickedOutside = () => {
      opened.value = false;
    };

    //filter items by given value
    const filterItems = (value: string) => {
      if (props.items.length > 0) {
        filteredItems.value = props.items.filter((item: any) => {
          return item.toLowerCase().includes(value.toLowerCase());
        }).map((item: any) => {
          return item.toString();
        });
      } else {
        filteredItems.value = [];
      }
    };

    // watch search term value change
    watch(searchTerm, async (newValue) => {
      opened.value = true;
      if (props.async) {
        if (newValue.trim() !== '') {
          emit('searching', newValue);
        } else {
          opened.value = false;
        }
      } else if (newValue.trim() === '') {
        filteredItems.value = [];
        opened.value = false;
      } else {
        filterItems(newValue);
      }
    });

    //emit input when item was selected and close dropdown
    const selectItem = (item) => {
      emit('update:modelValue', item);
      searchTerm.value = '';
      filteredItems.value = [];
      opened.value = false;
    };

    return {
      localInputElement,
      opened,
      filteredItems,
      searchTerm,
      dropdownClassObject,
      dropDownMenuClassObject,
      itemClassObject,
      computedItems,
      isEmpty,
      clickedOutside,
      filterItems,
      selectItem
    }
  },
})
</script>

<style scoped>
.fe-autocomplete .fade-enter-active, .fe-autocomplete .fade-leave-active {
  transition: opacity .5s ease;
}

.fe-autocomplete .fade-enter, .fe-autocomplete .fade-leave-to {
  opacity: 0;
}
</style>
