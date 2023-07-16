<template>
  <button
      type="button"
      class="fe-button"
      :class="[classObject, sizeClass, colorClass, cssClass]"
      :disabled="disabled"
      @click="emitClick"
      :id="id"
      :name="name"
  >
    <template v-if="!iconOnly">
      <slot name="iconBefore"/>
      <div class="mx-2">
        <slot></slot>
      </div>
      <slot name="iconAfter"/>
    </template>
    <slot v-else/>
  </button>
</template>

<script lang="ts">
import {defineComponent, computed, inject} from "vue";

export default defineComponent({
  name: 'FeButton',
  emits: ['click'],
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    cssClass: {
      type: String,
      default: ''
    },
    iconOnly: {
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
    const sizeClass = computed(() => {
      switch (props.size) {
        case 'is-xs':
          return 'p-0';
        case 'is-sm':
          return 'p-px';
        case 'is-md':
          return 'p-1';
        case 'is-lg':
          return 'p-2';
        default:
          return 'p-1';
      }
    });

    const colorClass = computed(() => {
      let primary = `bg-${$theme.color.primary}`;
      let primaryDark = `bg-${$theme.color.primaryDark}`;
      if (props.plain) {
        primary = `bg-white`;
        primaryDark = `hover:bg-white active:bg-white focus:bg-white`;
      } else if (props.disabled) {
        primary = `bg-${$theme.color.tertiary}`;
        primaryDark = `bg-${$theme.color.tertiary}`;
      }
      return `${primary} hover:${primaryDark} focus:ring-${primary} active:${primaryDark}`;
    });

    const classObject = computed(() => {
      let classes = [
        'flex items-center border cursor-pointer justify-center text-center px-2',
        'whitespace-nowrap rounded inline-flex items-center select-none font-medium hover:outline-none',
        'active:outline-none focus:outline-none focus:ring-1 focus:ring-opacity-75'
      ];
      if (props.plain && !props.disabled) {
        classes.push('text-gray-900 border-gray-500 shadow-none hover:border-gray-600 active:border-gray-400 focus:border-gray-600');
      } else if (props.disabled) {
        classes.push('cursor-not-allowed border-gray-400 text-gray-600');
      } else {
        classes.push('text-white border-transparent shadow active:border-gray-400');
      }
      return classes;
    });

    const emitClick = (event) => {
      emit('click', event);
    }

    return {
      sizeClass,
      colorClass,
      classObject,
      emitClick,
    }
  },
})
</script>
