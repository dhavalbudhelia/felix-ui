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
    <span :class="[checkClass, color]"></span>
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
      let color = this.color !== null ? this.color : `text-${this.$theme.color.primary}`;
      return ['check', color, `hover:${color}`];
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
span.check {
  content: "";
  font-size: 17px;
  transition: all .15s ease-out;
}

span.check:before {
  font-family: "Font Awesome 5 Free";
  content: "\f0c8";
  transform: scale(0);
  transition: all .15s ease-out;
}

label.checked span.check:before {
  content: "\f14a";
  font-weight: 900;
  transform: scale(1);
}

</style>
