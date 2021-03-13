<template>
  <input type="checkbox"
         :checked="isChecked"
         :value="modelValue"
         v-bind="$attrs"
         class="hidden"
         :true-value="trueValue"
         :false-value="falseValue">
  <label :class="[classObject, cssClass]"
         :disabled="disabled"
         :tabindex="disabled ? false : 0"
         @click.prevent="check">
    <span :class="[checkClass]"></span>
  </label>
</template>

<script>

import CssClasses from "./CssClasses";

export default {
  name: 'fe-toggle-switch',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      required: false,
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      require: false,
      default: false,
    },
    cssClass: {
      type: String,
      required: false,
      default: ''
    },
    color: {
      type: String,
      required: false,
      default: ''
    },
  },
  computed: {
    isChecked() {
      return this.modelValue === this.trueValue;
    },
    /**
     * class names object
     */
    classObject() {
      let classes = ['fe-toggle-switch', CssClasses.base];
      let checkColor = `bg-${this.$theme.color.tertiary}`;
      let hoverColor = `hover:bg-${this.$theme.color.tertiaryDark}`;
      if (this.modelValue) {
        if (this.color !== '') {
          checkColor = this.color;
          hoverColor = `hover:${checkColor}`;
        } else {
          checkColor = `bg-${this.$theme.color.primary}`;
          hoverColor = `hover:bg-${this.$theme.color.primaryDark}`;
        }
      }
      if (this.isChecked) {
        classes.push('checked');
      }
      if (this.disabled) {
        classes.push(CssClasses.disabled);
      } else {
        classes.push(CssClasses.general);
        classes.push(hoverColor);
      }
      classes.push(checkColor);
      return classes;
    },
    /**
     * check class object
     * @return {string[]}
     */
    checkClass() {
      let checkColor = 'bg-white';
      return ['check', checkColor, CssClasses.check];
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
.fe-toggle-switch {
  width: 52px;
  height: 26px;
}

span.check {
  height: 20px;
  width: 20px;
  -webkit-transition: .3s;
  transition: .3s;
  left: 3px;
  top: 3px;
}

label.checked span.check {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/*check*/
span.check:before {
  content: "";
  -webkit-transition: .3s;
  transition: .3s;
}

</style>
