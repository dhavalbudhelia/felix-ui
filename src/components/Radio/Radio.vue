<template>
  <input type="radio"
         :checked="isChecked"
         :value="localValue"
         :disabled="disabled"
         v-bind="$attrs"
         class="hidden"
  />
  <label :class="[classObject, cssClass]"
         :disabled="disabled"
         :tabindex="disabled ? false : 0"
         @click.prevent="emit"
  >
    <span :class="[checkClass, color]"></span>
    <span class="pl-2"><slot/></span>
  </label>
</template>

<script>
import CssClasses from "./CssClasses";

export default {
  name: 'fe-radio',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number, Object],
      required: true,
    },
    localValue: {
      type: [String, Number, Object],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
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
      return this.modelValue === this.localValue;
    },
    /**
     * class names object
     */
    classObject() {
      let classes = ['flex items-center', CssClasses.base];
      if (this.isChecked) {
        classes.push('checked');
      }
      if (this.disabled) {
        classes.push(CssClasses.disabled);
      }
      if (this.vertical) {
        classes.push(CssClasses.vertical);
      } else {
        classes.push(CssClasses.general);
      }
      return classes;
    },
    /**
     * check class object
     */
    checkClass() {
      let color = this.color !== null ? this.color : `border-${this.$theme.color.primary}`;
      return ['check', CssClasses.check, color];
    },
  },
  methods: {
    emit() {
      if (this.disabled || this.isChecked) {
        return;
      }
      this.$emit('update:modelValue', this.localValue);
    },
  },
};
</script>


<style scoped>
span.check {
  width: 18px;
  height: 18px;
  transition: border-width .15s ease-out;
}

label.checked span.check {
  border-width: 6px;
}

/*check*/
span.check:before {
  content: "";
  border: none;
  transform: scale(0);
  transition: border-width .15s ease-out;
}

label.checked span.check:before {
  transform: scale(1);
}

</style>
