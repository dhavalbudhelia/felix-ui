<template>
  <button type="button"
          :class="[classObject, cssClass]"
          :disabled="disabled"
          @click="emitClick"
          :id="id"
          :name="name"
  >
    <template v-if="!iconOnly">
      <slot name="iconBefore"/>
      <div class="mx-2">
        <slot></slot>
      </div>
      <slot name="iconAfter"/>
    </template>
    <slot v-else/>
  </button>
</template>

<script>
import SizeMixin from "../../mixins/SizeMixin.js";
import CssClasses from "./CssClasses";

export default {
  name: 'fe-button',
  emits: ['click'],
  mixins: [SizeMixin],
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    cssClass: {
      type: String,
      default: ''
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * class object
     */
    classObject() {
      let classes = ['fe-button flex items-center', CssClasses.base];
      if (this.plain && !this.disabled) {
        classes.push(CssClasses.plain);
      } else if (this.disabled) {
        classes.push(CssClasses.disabled);
      } else {
        classes.push(CssClasses.general);
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
      let primary = `bg-${this.$theme.color.primary}`;
      let primaryDark = `bg-${this.$theme.color.primaryDark}`;
      if (this.plain) {
        primary = `bg-white`;
        primaryDark = `hover:bg-white active:bg-white focus:bg-white`;
      } else if (this.disabled) {
        primary = `bg-${this.$theme.color.tertiary}`;
        primaryDark = `bg-${this.$theme.color.tertiary}`;
      }
      return `${primary} hover:${primaryDark} focus:ring-${primary} active:${primaryDark}`;
    },
  },
  methods: {
    /**
     * emit client event
     * @param event
     */
    emitClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>
