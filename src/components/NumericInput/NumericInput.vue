<template>
  <div :class="[wrapperClass]">
    <input :id="id"
           :name="name"
           :class="[inputObject]"
           :placeholder="placeholder"
           type="text"
           data-testid="numeric-input"
           :value="modelValue"
           :disabled="disabled"
           @input="onInput"
           @blur="onBlur"
           @focus="onFocus">
    <div v-if="!disabled" class="flex flex-row right-0 absolute items-center h-full">
      <div :class="caretDownClass" @click.stop="decrement()" data-testid="numeric-input-decrement-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
        </svg>
      </div>
      <div :class="caretUpClass" @click.stop="increment()" data-testid="numeric-input-increment-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,computed, inject, nextTick} from "vue";

export default defineComponent({
  name: 'FeNumericInput',
  emits: ['update:modelValue', 'blur', 'focus'],
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
      type: [Number, String],
      default: null
    },
    placeholder: {
      type: String,
    },
    step: {
      type: Number,
      default: 1,
    },
    minValue: {
      type: Number,
      default: null,
    },
    maxValue: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    const $theme = inject('$theme');

    /**
     * class object for wrapper div
     */
    const wrapperClass = computed(() => {
      let classes = ['fe-numeric-input-wrapper flex items-center pl-2 text-left relative rounded'];
      if (props.disabled) {
        classes.push('shadow-none cursor-not-allowed');
      } else {
        classes.push('border border-solid border-gray-400 focus-within:outline-none hover:border-gray-500');
        classes.push(`focus-within:border-${$theme.color.primary} active:border-${$theme.color.primary}`);
      }
      classes.push(colorClass.value);
      switch (props.size) {
        case 'is-xs':
          classes.push('h-5');
          break;
        case 'is-sm':
          classes.push('h-6');
          break;
        case 'is-md':
          classes.push('h-8');
          break;
        case 'is-lg':
          classes.push('h-10');
          break;
        default:
          classes.push('h-8');
      }
      return classes;
    });

    /**
     * size class object
     */
    const sizeClass = computed(() => {
      switch (props.size) {
        case 'is-xs':
          return 'my-px text-xs';
        case 'is-sm':
          return 'my-1 text-sm';
        case 'is-md':
          return 'my-1 text-base';
        case 'is-lg':
          return 'my-2 text-lg';
        default:
          return 'my-1 text-base';
      }
    });

    /**
     * class object for input
     */
    const inputObject = computed(() => {
      let classes = ['fe-numeric-input w-full focus:outline-none active:outline-none'];
      if (props.disabled) {
        classes.push('shadow-none cursor-not-allowed');
      }
      classes.push(sizeClass.value);
      classes.push(colorClass.value);
      return classes;
    });

    /**
     * color class object
     */
    const colorClass = computed(() => {
      let primary = '';
      if (props.disabled) {
        primary = `bg-${$theme.color.tertiary}`;
      } else {
        primary = `bg-white`;
      }
      return `${primary}`;
    });

    /**
     * caret class object
     */
    const caretDownClass = computed(() => {
      return 'flex items-center border-l h-full px-2 cursor-pointer select-none hover:bg-gray-200 rounded-r';
    })

    /**
     * caret class object
     */
    const caretUpClass = computed(() => {
      return 'flex items-center border-l h-full px-2 cursor-pointer select-none hover:bg-gray-200';
    });

    const decrement = () => {
      if (Number.isNaN(parseFloat(props.modelValue.toString()))) {
        emit('update:modelValue', 0);
      } else if (props.minValue === null || (parseFloat(props.modelValue.toString()) - props.step) >= props.minValue) {
        emit('update:modelValue', (parseFloat(props.modelValue.toString()) - props.step));
      }
    };

    const increment = () => {
      if (Number.isNaN(parseFloat(props.modelValue.toString()))) {
        emit('update:modelValue', 0);
      } else if (props.maxValue === null || (parseFloat(props.modelValue.toString()) + props.step) <= props.maxValue) {
        emit('update:modelValue', (parseFloat(props.modelValue.toString()) + props.step));
      }
    };

    /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
    const onInput = (event) => {
      nextTick(() => {
        emit('update:modelValue', event.target.value);
      });
    };

    /**
     * emit blur event
     * @param event
     */
    const onBlur = (event) => {
      emit('blur', event);
    };

    /**
     * emit focus event
     * @param event
     */
    const onFocus = (event) => {
      emit('focus', event);
    }

    return {
      wrapperClass,
      sizeClass,
      inputObject,
      colorClass,
      caretDownClass,
      caretUpClass,
      decrement,
      increment,
      onInput,
      onBlur,
      onFocus,
    }
  },
})
</script>
