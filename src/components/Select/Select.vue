<template>
  <div :class="[classObject, cssClass]">
    <select v-model="computedValue"
            :id="id"
            :name="name"
            :class="selectClass"
            ref="select"
            v-bind="$attrs"
    >
      <option v-if="placeholder && (computedValue === null || computedValue === '')"
              :value="computedValue"
              selected
              disabled
              hidden
      >{{ placeholder }}
      </option>

      <option v-for="option in options"
              :key="option.value"
              :value="option.value"
              :class="optionClass"
      >{{ option.label }}
      </option>
    </select>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6" :class="caretClass" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</template>

<script>
import CssClasses from "./CssClasses";

export default {
  name: 'fe-select',
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
      type: [String, Number, Boolean, Object, Array],
      default: null
    },
    options: {
      type: Array
    },
    placeholder: {
      type: String,
    },
    expanded: {
      type: Boolean,
      default: false
    },
    cssClass: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedValue: this.modelValue,
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.selectedValue;
      },
      set(newValue) {
        this.selectedValue = newValue;
        this.$emit('update:modelValue', newValue);
      }
    },
    /**
     * class object
     */
    classObject() {
      let classes = ['fe-select', CssClasses.base];
      if (this.$attrs.disabled === undefined || !this.$attrs.disabled) {
        classes.push(CssClasses.general);
      }
      if (this.expanded) {
        classes.push('w-full');
      }
      return classes;
    },
    /**
     * select class object
     */
    selectClass() {
      let classes = ['select'];
      if (this.$attrs.disabled !== undefined) {
        classes.push(CssClasses.disabled);
      } else {
        classes.push(CssClasses.select);
      }
      if (this.expanded) {
        classes.push('w-full');
      }

      classes.push('pr-8');

      return classes;
    },
    /**
     * option class object
     */
    optionClass() {
      if (this.$attrs.disabled !== undefined) {
        return CssClasses.option;
      } else {
        return '';
      }
    },
    /**
     * caret class object
     */
    caretClass() {
      let color = this.color !== '' ? this.color : `text-${this.$theme.color.primary}`;
      return [CssClasses.caret, color];
    },
  },
  watch: {
    /**
     * When v-model change, set internal value.
     */
    modelValue(value) {
      this.selectedValue = value;
    },
  }
}
</script>
