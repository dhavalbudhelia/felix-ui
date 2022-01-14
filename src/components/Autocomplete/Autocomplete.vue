<template>
  <div :class="['fe-autocomplete']">
    <fe-input :placeholder="placeholder"
              v-model="searchTerm"
              :id="id"
              :name="name"
              :icon-pack-before="iconPackBefore"
              :icon-before="iconBefore"
              :icon-pack-after="iconPackAfter"
              :icon-after="iconAfter"
    ></fe-input>
    <div :class="[dropdownClassObject]">
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
import CssClasses from "./CssClasses";

export default {
  name: 'fe-autocomplete',
  emits: ['searching', 'update:modelValue'],
  components: {
    FeInput,
  },
  mixins: [IconMixin],
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
        if (value.trim() !== '') {
          this.$emit('searching', value);
        } else {
          this.opened = false;
        }
      } else if (value.trim() === '') {
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
        this.filteredItems = this.items.filter((item) => {
          return item.toLowerCase().includes(value.toLowerCase());
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
      this.$emit('update:modelValue', item);
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
      return classes;
    },
    /**
     * class names object for dropdown menu
     */
    dropDownMenuClassObject() {
      let classes = ['dropdown-menu'];
      if (this.opened) {
        classes.push(CssClasses.menu);
        classes.push(CssClasses.position);
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
.fe-autocomplete .fade-enter-active, .fe-autocomplete .fade-leave-active {
  transition: opacity .5s ease;
}

.fe-autocomplete .fade-enter, .fe-autocomplete .fade-leave-to {
  opacity: 0;
}
</style>
