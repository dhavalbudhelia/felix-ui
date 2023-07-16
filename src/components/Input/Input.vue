<template>
  <div :class="[wrapperClass, colorClass]">
    <slot name="iconBefore"/>
    <component
        :is="type === 'text' ? 'input' : 'textarea'"
        :type="type === 'text' ? 'text' : 'textarea'"
        :ref="type === 'text' ? 'input' : 'textarea'"
        :id="id"
        :name="name"
        :class="[inputObject, colorClass]"
        :placeholder="placeholder"
        :value="localValue"
        :disabled="disabled"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        :rows="rows"
    ></component>
    <slot name="iconAfter"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, nextTick, inject, watch} from "vue";

export default defineComponent({
  name: 'FeInput',
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
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'text',
      validator: function (value: string) {
        return ['text', 'textarea'].includes(value);
      }
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 2,
    },
  },
  setup(props, {emit, slots}) {
    const $theme = inject('$theme');
    const localValue = ref<string|number|null>(null);

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
     * class object for wrapper div
     */
    const wrapperClass = computed(() => {
      let classes = ['fe-input-wrapper flex items-center px-2 text-left rounded'];
      if (props.disabled) {
        classes.push('shadow-none cursor-not-allowed');
      } else {
        classes.push('border border-solid border-gray-400 focus-within:outline-none hover:border-gray-500');
        classes.push(`focus-within:border-${$theme.color.primary}`);
        classes.push(`active:border-${$theme.color.primary}`);
        classes.push(`hover:border-${$theme.color.primary}`);
      }
      if (props.type === 'text') {
        classes.push('h-8');
      }
      return classes;
    });

    /**
     * class object for input
     */
    const inputObject = computed(() => {
      let classes = ['fe-input w-full focus:outline-none active:outline-none'];
      if (props.disabled) {
        classes.push('shadow-none cursor-not-allowed');
      }
      if (slots.iconBefore) {
        classes.push('pl-2');
      }
      if (slots.iconAfter) {
        classes.push('pr-2');
      }
      classes.push('my-1 text-base');
      return classes;
    });

    watch(() => props.modelValue, (newValue) => {
      localValue.value = newValue;
    });

    /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
    const onInput = (event) => {
      nextTick(() => {
        emit('update:modelValue', event.target.value);
        localValue.value = event.target.value;
      });
    };

    /**
     * emit blur event
     * @param $event
     */
    const onBlur = ($event) => {
      emit('blur', $event);
    };

    /**
     * emit focus event
     * @param $event
     */
    const onFocus = ($event) => {
      emit('focus', $event);
    };

    return {
      localValue,
      colorClass,
      wrapperClass,
      inputObject,
      onInput,
      onBlur,
      onFocus,
    }
  },
})
</script>
