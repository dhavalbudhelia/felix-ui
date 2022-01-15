<template>
  <div ref="modal"
       :class="[classObject, 'fe-modal']"
       tabindex="0"
       role="dialog"
       @keydown.esc="onEscape"
  >
    <transition name="slidedown">
      <div v-if="modelValue" class="flex justify-center mt-12" :class="size">
        <div :class="[modalClassObject, `lg:${size}`]">
          <div :class="headerClassObject">
            <div class="flex-grow">
              <slot name="header">
                {{ header }}
              </slot>
            </div>
            <div v-if="canClose" :class="closeClassObject" @click="close">
              <fe-icon icon-pack="fas" icon="times" size="is-lg"></fe-icon>
            </div>
          </div>
          <div :class="bodyClassObject">
            <slot></slot>
          </div>
          <div v-if="showFooter" :class="footerClassObject">
            <div class="flex items-end justify-end">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="modelValue" :class="backdropClassObject"></div>
    </transition>
  </div>
</template>

<script>
import FeIcon from '@/components/Icon/Icon.vue';
import SizeMixin from "../../mixins/SizeMixin.js";
import CssClasses from "./CssClasses";

export default {
  name: 'fe-modal',
  components: {
    FeIcon
  },
  mixins: [SizeMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: ''
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    canClose: {
      type: Boolean,
      default: true,
    },
    closeOnEscape: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * class names object
     */
    classObject() {
      let classes = [CssClasses.base];
      if (this.modelValue) {
        classes.push(CssClasses.general);
      } else {
        classes.push('hidden');
      }
      classes.push(this.sizeClass);
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
     * class names object for modal content container
     */
    modalClassObject() {
      return [CssClasses.container];
    },
    /**
     * header class object
     */
    headerClassObject() {
      return ['fe-modal-header', CssClasses.header];
    },
    /**
     * body class object
     */
    bodyClassObject() {
      return ['fe-modal-body', CssClasses.body];
    },
    /**
     * footer class object
     */
    footerClassObject() {
      return ['fe-modal-footer', CssClasses.footer];
    },
    /**
     * close icon class object
     */
    closeClassObject() {
      return CssClasses.close;
    },
    /**
     * backdrop class object
     */
    backdropClassObject() {
      return [CssClasses.backdrop];
    },
  },
  watch: {
    /**
     * on open set the focus on the modal
     * @param value
     */
    modelValue(value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.modal.focus();
        });
      }
    }
  },
  methods: {
    /**
     * on close emit close event
     */
    close() {
      this.$emit('update:modelValue', false);
    },
    /**
     * if modal is set to closeOnEscape, call close method
     */
    onEscape() {
      if (this.closeOnEscape) {
        this.close();
      }
    }
  },
}
</script>

<style scoped>
.fe-modal .fade-enter-active,
.fe-modal .fade-leave-active {
  transition: opacity .5s ease;
}

.fe-modal .fade-enter,
.fe-modal .fade-leave-to {
  opacity: 0;
}

.fe-modal .slidedown-enter-active,
.fe-modal .slidedown-leave-active {
  transition: margin-top .2s ease-out;
}

.fe-modal .slidedown-enter,
.fe-modal .slidedown-leave-to {
  margin-top: -10px;
}

.fe-modal .is-xs {
  @apply w-full px-4 sm:w-4/5 sm:px-0 md:w-3/5 md:px-0 lg:w-2/5 lg:px-0;
}
.fe-modal .is-sm {
  @apply w-full px-4 md:w-4/5 md:px-0 lg:w-1/2 lg:px-0;
}
.fe-modal .is-md {
  @apply w-full px-4 md:w-4/5 md:px-0 lg:w-3/5 lg:px-0;
}
.fe-modal .is-lg {
  @apply w-full px-4 lg:w-4/5 lg:px-0;
}
</style>
