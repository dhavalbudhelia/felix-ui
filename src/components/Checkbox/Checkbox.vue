<template>
  <input type="checkbox"
         :checked="isChecked"
         :value="modelValue"
         :disabled="disabled"
         v-bind="$attrs"
         class="hidden"
         :true-value="trueValue"
         :false-value="falseValue">
  <label :class="[classObject, cssClass]"
         :disabled="disabled"
         :tabindex="disabled ? false : 0"
         @click.prevent="check">
    <svg xmlns="http://www.w3.org/2000/svg"
         :class="[checkClass, color]"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <span class="pl-2"><slot/></span>
  </label>
</template>

<script lang="ts">
import {defineComponent, computed, inject} from "vue";

export default defineComponent({
  name: 'FeCheckbox',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    cssClass: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: null
    },
  },
  setup(props, {emit}) {
    const $theme = inject('$theme');
    const isChecked = computed(() => props.modelValue === props.trueValue);

    /**
     * class names object
     * @return {[string, string]}
     */
    const classObject = computed(() => {
      let classes = ['fe-checkbox flex items-center outline-none items-center align-middle select-none m-0'];
      if (isChecked.value) {
        classes.push('checked');
      }
      if (props.disabled) {
        classes.push('opacity-50 inline-flex cursor-not-allowed');
      } else {
        classes.push('cursor-pointer inline-flex');
      }
      return classes;
    });

    /**
     * check class object
     * @return {string[]}
     */
    const checkClass = computed(() => {
      let color = props.color ?? `text-${$theme.color.primary} border-${$theme.color.primary}`;
      return [
        'check',
        color,
        'border',
        'rounded-sm',
        `hover:${color}`,
      ];
    });

    const check = () => {
      if (props.disabled) {
        return;
      }
      emit('update:modelValue', isChecked.value ? props.falseValue : props.trueValue);
    }

    return {
      isChecked,
      classObject,
      checkClass,
      check
    }
  },
})
</script>

<style scoped>
.fe-checkbox .check {
  height: 20px;
  width: 20px;
}

input[type="checkbox"]:not(:checked) + label path {
  display: none;
}

</style>
