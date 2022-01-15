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
    <fe-icon v-if="icon"
             :class="iconClass"
             :icon="icon"
             :icon-pack="iconPack"
    ></fe-icon>
    <fe-icon icon="chevron-down" icon-pack="fas" :class="caretClass"></fe-icon>
  </div>
</template>

<script>
import FeIcon from "@/components/Icon/Icon.vue";
import CssClasses from "./CssClasses";

export default {
  name: 'fe-select',
  emits: ['update:modelValue'],
  components: {
    FeIcon
  },
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
    icon: {
      type: String,
    },
    iconPack: {
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
      if (this.icon) {
        classes.push('pl-8');
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
     * icon class object
     */
    iconClass() {
      return CssClasses.icon;
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
