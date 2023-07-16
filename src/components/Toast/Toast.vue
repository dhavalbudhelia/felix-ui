<template>
  <transition :name="position">
    <div v-if="modelValue" ref="fetoast" :class="toastContainerClassObject">
      <div :class="toastClassObject">
        <div>
          <slot>{{ message }}</slot>
        </div>
        <slot name="close">
          <button @click="closeToast" v-if="closable" :class="closeClassObject">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent,ref, computed, onMounted, watch} from "vue";

export default defineComponent({
  name: 'FeToast',
  emits: ['update:modelValue'],
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
      validator: function (value: string) {
        return ['success', 'warning', 'error'].includes(value);
      },
    },
    position: {
      type: String,
      default: 'top-center',
      validator: function (value: string) {
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
  setup (props, {emit}) {
    const timer = ref<number|null>(null);

    /**
     * spinner container class object
     */
    const toastContainerClassObject = computed(() => {
      return ['fe-toast-wrapper absolute flex flex-col items-center justify-center z-20', props.position];
    });

    /**
     * toast class object
     */
    const toastClassObject = computed(() => {
      let classes = ['fe-toast flex flex-row justify-between items-center p-3 rounded-md shadow-md'];
      switch (props.type) {
        case 'warning':
          classes.push('bg-orange-200 text-orange-700 border border-orange-300 border-opacity-25');
          break;
        case 'error':
          classes.push('bg-red-200 text-red-700 border border-red-300 border-opacity-25');
          break;
        case 'success':
        default:
          classes.push('bg-green-200 text-green-700 border border-green-300 border-opacity-25');

      }
      return classes;
    });

    /**
     * close button class object
     */
    const closeClassObject = computed(() => {
      return 'ml-2 active:outline-none focus:outline-none grow-0 cursor-pointer text-gray-500 hover:text-gray-600';
    });

    /**
     * start spinner animation
     */
    const showToast = () => {
      //if fading automatically time out for the input event for given duration
      if (props.fadeAutomatic) {
        timer.value = setTimeout(() => {
          emit('update:modelValue', false);
        }, props.duration);
      }
    };

    /**
     * close toast
     */
    const closeToast = () => {
      if (timer.value) {
        clearTimeout(timer.value);
      }
      emit('update:modelValue', false);
    };

    onMounted(() => {
      if (props.modelValue) {
        showToast();
      }
    });

    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        showToast();
      }
    });

    return {
      timer,
      toastContainerClassObject,
      toastClassObject,
      closeClassObject,
      showToast,
      closeToast,
    }
  },
})
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
