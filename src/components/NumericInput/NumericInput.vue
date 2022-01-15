<template>
  <div :class="[wrapperClass]">
    <input :id="id"
           :name="name"
           :class="[inputObject]"
           :placeholder="placeholder"
           type="text"
           :value="modelValue"
           :disabled="disabled"
           @input="onInput"
           @blur="onBlur"
           @focus="onFocus">
    <div v-if="!disabled" class="flex flex-row right-0 absolute items-center h-full">
      <div :class="caretDownClass" @click.stop="decrement()">
        <fe-icon icon="minus" icon-pack="fas" :size="size"></fe-icon>
      </div>
      <div :class="caretUpClass" @click.stop="increment()">
        <fe-icon icon="plus" icon-pack="fas" :size="size"></fe-icon>
      </div>
    </div>
  </div>
</template>

<script>
import FeIcon from "@/components/Icon/Icon.vue";
import SizeMixin from "../../mixins/SizeMixin.js";
import CssClasses from "./CssClasses";

export default {
  name: 'fe-numeric-input',
  components: {
    FeIcon
  },
  mixins: [SizeMixin],
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
  },
  computed: {
    /**
     * class object for wrapper div
     */
    wrapperClass() {
      let classes = ['fe-numeric-input-wrapper', CssClasses.base];
      if (this.disabled) {
        classes.push(CssClasses.disabled);
      } else {
        classes.push(CssClasses.general);
        classes.push(`focus-within:border-${this.$theme.color.primary} active:border-${this.$theme.color.primary}`);
      }
      classes.push(this.colorClass);
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.wrapperSizeXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.wrapperSizeSm);
          break;
        case 'is-md':
          classes.push(CssClasses.wrapperSizeMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.wrapperSizeLg);
          break;
        default:
          classes.push(CssClasses.wrapperSizeMd);
      }
      return classes;
    },
    /**
     * class object for input
     */
    inputObject() {
      let classes = ['fe-numeric-input w-full', CssClasses.input];
      if (this.disabled) {
        classes.push(CssClasses.disabled);
      }
      classes.push(this.sizeClass);
      classes.push(this.colorClass);
      return classes;
    },
    /**
     * size class object
     */
    sizeClass() {
      switch (this.size) {
        case 'is-xs':
          return CssClasses.sizeXs;
        case 'is-sm':
          return CssClasses.sizeSm;
        case 'is-md':
          return CssClasses.sizeMd;
        case 'is-lg':
          return CssClasses.sizeLg;
        default:
          return CssClasses.sizeMd;
      }
    },
    /**
     * color class object
     */
    colorClass() {
      let primary = '';
      if (this.disabled) {
        primary = `bg-${this.$theme.color.tertiary}`;
      } else {
        primary = `bg-white`;
      }
      return `${primary}`;
    },
    /**
     * icon class object
     */
    iconClass() {
      return CssClasses.icon;
    },
    /**
     * caret class object
     */
    caretDownClass() {
      return CssClasses.caretDown;
    },
    /**
     * caret class object
     */
    caretUpClass() {
      return CssClasses.caretUp;
    },
  },
  methods: {
    decrement() {
      if (Number.isNaN(parseFloat(this.modelValue))) {
        this.$emit('update:modelValue', 0);
      } else if (this.minValue === null || (parseFloat(this.modelValue) - this.step) >= this.minValue) {
        this.$emit('update:modelValue', (parseFloat(this.modelValue) - this.step));
      }
    },
    increment() {
      if (Number.isNaN(parseFloat(this.modelValue))) {
        this.$emit('update:modelValue', 0);
      } else if (this.maxValue === null || (parseFloat(this.modelValue) + this.step) <= this.maxValue) {
        this.$emit('update:modelValue', (parseFloat(this.modelValue) + this.step));
      }
    },
    /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
    onInput(event) {
      this.$nextTick(() => {
        this.$emit('update:modelValue', event.target.value);
      });
    },
    /**
     * emit blur event
     * @param $event
     */
    onBlur($event) {
      this.$emit('blur', $event);
    },
    /**
     * emit focus event
     * @param $event
     */
    onFocus($event) {
      this.$emit('focus', $event);
    },
  }
}
</script>
