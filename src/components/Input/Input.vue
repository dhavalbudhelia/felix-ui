<template>
  <div :class="[wrapperClass]">
    <fe-icon v-if="iconBefore && type === 'text'"
             :icon-pack="iconPackBefore"
             :icon="iconBefore"
             :class="[iconClass]"
    ></fe-icon>

    <component
        :is="type === 'text' ? 'input' : 'textarea'"
        :type="type === 'text' ? 'text' : 'textarea'"
        :ref="type === 'text' ? 'input' : 'textarea'"
        :id="id"
        :name="name"
        :class="[inputObject]"
        :placeholder="placeholder"
        :value="computedValue"
        :disabled="disabled"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        :rows="rows"
    ></component>

    <fe-icon v-if="iconAfter && type === 'text'"
             :icon-pack="iconPackAfter"
             :icon="iconAfter"
             :class="[iconClass]"
    ></fe-icon>
  </div>
</template>

<script>
import IconMixin from "@/mixins/IconMixin";
import FeIcon from '@/components/Icon/Icon.vue';
import CssClasses from "./CssClasses";

export default {
  name: 'fe-input',
  emits: ['update:modelValue', 'blur', 'focus'],
  components: {
    FeIcon,
  },
  mixins: [IconMixin],
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
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'text',
      validator: function (value) {
        return ['text', 'textarea'].includes(value);
      }
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      localValue: this.modelValue
    }
  },
  computed: {
    /**
     * class object for wrapper div
     */
    wrapperClass() {
      let classes = ['fe-input-wrapper', CssClasses.base];
      if (this.disabled) {
        classes.push(CssClasses.disabled);
      } else {
        classes.push(CssClasses.general);
        classes.push(`focus-within:border-${this.$theme.color.primary}`);
        classes.push(`active:border-${this.$theme.color.primary}`);
        classes.push(`hover:border-${this.$theme.color.primary}`);
      }
      classes.push(this.colorClass);
      if (this.type === 'text') {
        classes.push(CssClasses.wrapperSizeMd);
      }
      return classes;
    },
    /**
     * class object for input
     */
    inputObject() {
      let classes = ['fe-input w-full', CssClasses.input];
      if (this.disabled) {
        classes.push(CssClasses.disabled);
      }
      if (this.iconBefore) {
        classes.push('pl-2');
      }
      if (this.iconAfter) {
        classes.push('pr-2');
      }
      classes.push(CssClasses.sizeMd);
      classes.push(this.colorClass);
      return classes;
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
     * set local value on change of the input
     */
    computedValue: {
      get() {
        return this.localValue;
      },
      set(value) {
        this.localValue = value;
        this.$emit('update:modelValue', value);
      }
    }
  },
  watch: {
    /**
     * When v-model is changed set local value.
     */
    modelValue(value) {
      this.localValue = value;
    },
  },
  methods: {
    /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
    onInput(event) {
      this.$nextTick(() => {
        this.computedValue = event.target.value;
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
