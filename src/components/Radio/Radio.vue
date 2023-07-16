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
         @click.prevent="emitClicked"
  >
    <span :class="[checkClass, color]"></span>
    <span class="pl-2"><slot/></span>
  </label>
</template>

<script lang="ts">
import {defineComponent,computed, inject} from "vue";

export default defineComponent({
  name: 'FeRadio',
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
  setup(props, {emit}) {
    const $theme = inject('$theme');

    const isChecked = computed(() => {
      return props.modelValue === props.localValue;
    });

    /**
     * class names object
     */
    const classObject = computed(() => {
      let classes = ['flex items-center outline-none items-center align-middle select-none pr-4'];
      if (isChecked.value) {
        classes.push('checked');
      }
      if (props.disabled) {
        classes.push('opacity-50 cursor-not-allowed');
      }
      if (props.vertical) {
        classes.push('cursor-pointer flex pb-2');
      } else {
        classes.push('cursor-pointer inline-flex');
      }
      return classes;
    });

    /**
     * check class object
     */
    const checkClass = computed(() => {
      let color = props.color !== null ? props.color : `border-${$theme.color.primary}`;
      return ['check flex items-center justify-center flex-shrink-0 border-2 border-solid rounded-full', color];
    });

    const emitClicked = () => {
      if (!props.disabled && !isChecked.value) {
        emit('update:modelValue', props.localValue);
      }
    }

    return {
      isChecked,
      classObject,
      checkClass,
      emitClicked,
    }
  },
});
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
