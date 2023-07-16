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
    <span :class="[checkClass]"></span>
  </label>
</template>

<script lang="ts">
import {defineComponent,computed, inject} from "vue";

export default defineComponent({
  name: 'FeToggleSwitch',
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
      default: ''
    },
  },
  setup(props, {emit}) {
    const $theme = inject('$theme');

    const isChecked = computed(() => {
      return props.modelValue === props.trueValue;
    });

    /**
     * check class object
     * @return {string[]}
     */
    const checkClass = computed(() => {
      return ['check bg-white absolute inset-0 rounded-full bg-white shadow-md'];
    })


    /**
     * class names object
     */
    const classObject = computed(() => {
      let classes = ['fe-toggle-switch outline-none select-none relative inline-block shadow-inner rounded-full'];
      let checkColor = `bg-${$theme.color.tertiary}`;
      let hoverColor = `hover:bg-${$theme.color.tertiaryDark}`;
      if (props.modelValue) {
        if (props.color !== '') {
          checkColor = props.color;
          hoverColor = `hover:${checkColor}`;
        } else {
          checkColor = `bg-${$theme.color.primary}`;
          hoverColor = `hover:bg-${$theme.color.primaryDark}`;
        }
      }
      if (isChecked.value) {
        classes.push('checked');
      }
      if (props.disabled) {
        classes.push('opacity-50 cursor-not-allowed');
      } else {
        classes.push('cursor-pointer');
        classes.push(hoverColor);
      }
      classes.push(checkColor);
      return classes;
    });

    const check = () => {
      if (props.disabled) {
        return;
      }
      emit('update:modelValue', isChecked.value ? props.falseValue : props.trueValue);
    };

    return {
      isChecked,
      checkClass,
      classObject,
      check,
    }

  },
})
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
