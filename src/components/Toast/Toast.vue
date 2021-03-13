<template>
  <transition :name="position">
    <div v-if="modelValue" ref="fetoast" :class="toastContainerClassObject">
      <div :class="toastClassObject">
        <div>
          <slot>{{ message }}</slot>
        </div>
        <slot name="close">
          <button @click="closeToast" v-if="closable" :class="closeClassObject">
            <fe-icon icon-pack="fas" icon="times" size="is-sm"></fe-icon>
          </button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import CssClasses from "@/components/Toast/CssClasses";
import FeIcon from '@/components/Icon/Icon.vue';

export default {
  name: 'fe-toast',
  components: {
    FeIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 4000,
    },
    type: {
      type: String,
      default: 'success',
      validator: function (value) {
        return ['success', 'warning', 'error'].includes(value);
      },
    },
    position: {
      type: String,
      default: 'top-center',
      validator: function (value) {
        return ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].includes(value);
      },
    },
    closable: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    fadeAutomatic: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      timer: null,
    }
  },
  watch: {
    modelValue(value) {
      if (value) {
        this.showToast();
      }
    },
  },
  computed: {
    /**
     * spinner container class object
     */
    toastContainerClassObject() {
      return ['fe-toast-wrapper', CssClasses.toastContainer, this.position];
    },
    /**
     * toast class object
     */
    toastClassObject() {
      let classes = ['fe-toast', CssClasses.toast];
      switch (this.type) {
        case 'warning':
          classes.push(CssClasses.warning);
          break;
        case 'error':
          classes.push(CssClasses.error);
          break;
        case 'success':
        default:
          classes.push(CssClasses.success);

      }
      return classes;
    },
    /**
     * close button class object
     */
    closeClassObject() {
      return CssClasses.close;
    },
  },
  methods: {
    /**
     * start spinner animation
     */
    showToast() {
      //if fading automatically time out for the input event for given duration
      if (this.fadeAutomatic) {
        this.timer = setTimeout(() => {
          this.$emit('update:modelValue', false);
        }, this.duration);
      }
    },
    /**
     * close toast
     */
    closeToast() {
      clearTimeout(this.timer);
      this.$emit('update:modelValue', false);
    },
  },
  mounted() {
    //if activated on mount force show the toast
    if (this.modelValue) {
      this.showToast();
    }
  },
}
</script>

<style scoped>
.fe-toast-wrapper.top-center,
.fe-toast-wrapper.top-left,
.fe-toast-wrapper.top-right {
  top: 25px;
}

.fe-toast-wrapper.bottom-left,
.fe-toast-wrapper.bottom-center,
.fe-toast-wrapper.bottom-right {
  bottom: 25px;
}

.fe-toast-wrapper.top-left,
.fe-toast-wrapper.bottom-left {
  left: 25px;
}

.fe-toast-wrapper.top-right,
.fe-toast-wrapper.bottom-right {
  right: 25px;
}

.fe-toast-wrapper.top-center,
.fe-toast-wrapper.bottom-center {
  @apply inset-x-0;
}

.top-left-enter-active,
.top-left-leave-active,
.top-center-enter-active,
.top-center-leave-active,
.top-right-enter-active,
.top-right-leave-active,
.bottom-left-enter-active,
.bottom-left-leave-active,
.bottom-center-enter-active,
.bottom-center-leave-active,
.bottom-right-enter-active,
.bottom-right-leave-active {
  @apply transition-all;
}

.top-left-enter-from,
.top-left-leave-to,
.top-center-enter-from,
.top-center-leave-to,
.top-right-enter-from,
.top-right-leave-to {
  transform: translateY(-25px);
  @apply opacity-0;
}

.top-center-enter-to,
.top-center-leave-from,
.top-left-enter-to,
.top-left-leave-from,
.top-right-enter-to,
.top-right-leave-from{
  transform: translateY(2px);
  @apply opacity-100;
}

.bottom-left-enter-from,
.bottom-left-leave-to,
.bottom-center-enter-from,
.bottom-center-leave-to,
.bottom-right-enter-from,
.bottom-right-leave-to {
  transform: translateY(25px);
  @apply opacity-0;
}

.bottom-center-enter-to,
.bottom-center-leave-from,
.bottom-left-enter-to,
.bottom-left-leave-from,
.bottom-right-enter-to,
.bottom-right-leave-from {
  transform: translateY(-2px);
  @apply opacity-100;
}

</style>
