<template>
  <div :class="[classObject, cssClass]">
    <select v-model="selectedValue"
            :id="id"
            :name="name"
            :class="selectClass"
            ref="select"
            v-bind="$attrs"
    >
      <option v-if="placeholder && (selectedValue === null || selectedValue === '')"
              :value="selectedValue"
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

<script lang="ts">
import {defineComponent,ref, computed, inject, watch} from "vue";

export default defineComponent({
  name: 'FeSelect',
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
  setup(props, {emit, attrs}) {
    const $theme = inject('$theme');
    const selectedValue = ref(props.modelValue);

    /**
     * class object
     */
    const classObject = computed(() => {
      let classes = ['fe-select inline-flex max-w-full relative text-left h-8'];
      if (attrs.disabled === undefined || !attrs.disabled) {
        classes.push('appearance-none bg-white border border-solid border-gray-400 rounded shadow-none text-gray-600 hover:border-gray-500');
      }
      if (props.expanded) {
        classes.push('w-full');
      }
      return classes;
    });

    /**
     * select class object
     */
    const selectClass = computed(() => {
      let classes = ['select'];
      if (attrs.disabled !== undefined) {
        classes.push('appearance-none outline-none pl-2 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-600');
      } else {
        classes.push('appearance-none outline-none rounded pl-2 cursor-pointer bg-white items-center max-w-full h-full hover:border-gray-500 hover:text-gray-700 focus:shadow active:shadow');
      }
      if (props.expanded) {
        classes.push('w-full');
      }
      classes.push('pr-8');
      return classes;
    });

    /**
     * option class object
     */
    const optionClass = computed(() => {
      if (attrs.disabled !== undefined) {
        return 'whitespace-pre min-h-full';
      } else {
        return '';
      }
    });

    /**
     * caret class object
     */
    const caretClass = computed(() => {
      let color = props.color !== '' ? props.color : `text-${$theme.color.primary}`;
      return ['inline-flex items-center h-full pr-2 right-0 absolute pointer-events-none', color];
    });

    watch(() => selectedValue.value, (newValue) => {
      emit('update:modelValue', newValue);
    });

    return {
      selectedValue,
      classObject,
      selectClass,
      optionClass,
      caretClass,
    }
  },
})
</script>
