<template>
  <div :class="[classObject, sizeClass, size]" @mouseover="hovered(true)" @mouseout="hovered(false)">
    <div class="dropdown-trigger" @click="toggleTrigger">
      <slot name="trigger">
        <FeButton :size="size" :disabled="disabled">
          <template #iconAfter>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </template>
          <template v-if="selectedItem">{{ selectedItem }}</template>
          <template v-else>{{ triggerButtonText }}</template>
        </FeButton>
      </slot>
    </div>
    <transition name="fade">
      <div v-if="opened || hoverable" :class="dropDownMenuClassObject">
        <div class="dropdown-content bg-white rounded border border-gray-400 shadow py-2">
          <a v-for="item in items"
             :key="item"
             @click="selectItem(item)"
             class="dropdown-item text-gray-800 block leading-normal py-1 px-4 relative hover:bg-gray-200 hover:cursor-pointer"
          >
            <slot name="item" :item="item">{{ item }}</slot>
          </a>
        </div>
      </div>
    </transition>
    <div
      v-if="opened && !hoverable"
      @click="clickedOutside"
      class="fixed w-full h-full top-0 left-0 z-10 md:bg-white md:opacity-0 bg-black opacity-75"
    ></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, nextTick, watch, computed} from 'vue';
import FeButton from '@/components/Button/Button.vue';

export default defineComponent({
  name: 'FeDropdown',
  emits: ['update:modelValue', 'opened-change', 'change'],
  components: {
    FeButton,
  },
  props: {
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: null
    },
    triggerButtonText: {
      type: String,
      default: 'Dropdown'
    },
    items: {
      type: Array,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'is-md',
      required: false,
      validator: function (value: string) {
        return ['is-xs', 'is-sm', 'is-md', 'is-lg'].includes(value);
      },
    },
  },
  setup(props, {emit}) {
    const opened = ref(false);
    const selectedItem = ref(props.modelValue);

    /**
     * size class object
     */
    const sizeClass = computed(() => {
      switch (props.size) {
        case 'is-xs':
          return 'text-xs';
        case 'is-sm':
          return 'text-sm';
        case 'is-md':
          return 'text-base';
        case 'is-lg':
          return 'text-lg';
        default:
          return 'text-base';
      }
    });

    /**
     * class names object form dropdown wrapper
     */
    const classObject = computed(() => {
      return {
        'fe-dropdown block align-top': true,
        'opened': opened.value,
      }
    });

    /**
     * class names object for dropdown menu
     */
    const dropDownMenuClassObject = computed(() => {
      return {
        'dropdown-menu': true,
        'block z-20 pt-1': opened.value,
        'hidden': !opened.value,
        'md:normal-position': opened.value && props.hoverable,
        'center-position md:normal-position': opened.value && !props.hoverable,
      }
    });

    /**
     * toggle triggering
     */
    function toggleTrigger() {
      if (props.hoverable || props.disabled) {
        return;
      }
      if (!opened.value) {
        // if not opened, toggle after clickOutside event
        // this fixes toggling programmatic
        nextTick(() => {
          opened.value = !opened.value;
        });
      } else {
        opened.value = !opened.value;
      }
    }

    /**
     * Close dropdown if clicked outside.
     */
    const clickedOutside = () => {
      opened.value = (!props.hoverable) ? false : opened.value;
    }

    /**
     * select item and close the dropdown
     * @param value
     */
    const selectItem = (value) => {
      if (selectedItem.value !== value) {
        emit('change', value);
        selectedItem.value = value;
      }
      emit('update:modelValue', value);
      opened.value = false;
    }

    /**
     * toggle dropdown on hover of the trigger if hoverable setting is set
     * @param enter
     */
    const hovered = (enter) => {
      if (props.hoverable) {
        if (enter && !opened.value) {
          opened.value = true;
        } else if (!enter && opened.value) {
          opened.value = false;
        }
      }
    }

    watch(opened, async (newValue) => {
      emit('opened-change', newValue);
    });

    return {
      opened,
      selectedItem,
      sizeClass,
      classObject,
      dropDownMenuClassObject,
      toggleTrigger,
      clickedOutside,
      selectItem,
      hovered,
    }
  },
})
</script>

<style scoped>
@media (min-width: 768px) {
  .fe-dropdown .dropdown-menu.md\:normal-position {
    position: absolute;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    -webkit-transform: none;
    transform: none;
  }
}

.fe-dropdown .center-position {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.fe-dropdown .fade-enter-active, .fe-dropdown .fade-leave-active {
  transition: opacity .5s ease;
}

.fe-dropdown .fade-enter, .fe-dropdown .fade-leave-to {
  opacity: 0;
}

</style>
