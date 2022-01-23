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

<script>
import CssClasses from "./CssClasses";

export default {
  name: 'fe-checkbox',
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
  computed: {
    isChecked() {
      return this.modelValue === this.trueValue;
    },
    /**
     * class names object
     * @return {[string, string]}
     */
    classObject() {
      let classes = ['fe-checkbox flex items-center', CssClasses.base];
      if (this.isChecked) {
        classes.push('checked');
      }
      if (this.disabled) {
        classes.push(CssClasses.disabled);
      } else {
        classes.push(CssClasses.general);
      }
      return classes;
    },
    /**
     * check class object
     * @return {string[]}
     */
    checkClass() {
      let color = this.color !== null ?
          this.color :
          `text-${this.$theme.color.primary} border-${this.$theme.color.primary}`;
      return [
        'check',
        color,
        'border',
        'rounded-sm',
        `hover:${color}`,
      ];
    },
  },
  methods: {
    check() {
      if (this.disabled) {
        return;
      }
      this.$emit('update:modelValue', this.isChecked ? this.falseValue : this.trueValue);
    },
  }
}
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
