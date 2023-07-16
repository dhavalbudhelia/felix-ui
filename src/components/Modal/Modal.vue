<template>
  <div ref="modal"
       :class="[classObject, sizeClass, 'fe-modal']"
       tabindex="0"
       role="dialog"
       @keydown.esc="onEscape"
  >
    <transition name="slidedown">
      <div v-if="modelValue" class="flex justify-center mt-12" :class="size">
        <div :class="['border rounded-lg shadow-lg overflow-auto relative z-50 w-full sm:is-lg', `lg:${size}`]">
          <div class="fe-modal-header flex border-b border-gray-400 bg-gray-200 p-4">
            <div class="flex-grow">
              <slot name="header">
                {{ header }}
              </slot>
            </div>
            <div v-if="canClose" class="grow-0 cursor-pointer text-gray-500 hover:text-gray-600" @click="close">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <div class="fe-modal-body border-b border-gray-400 bg-white p-4">
            <slot></slot>
          </div>
          <div v-if="showFooter" class="fe-modal-footer bg-gray-100 p-4">
            <div class="flex items-end justify-end">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="modelValue" class="fixed absolute inset-0 bg-black opacity-75"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, nextTick, watch} from "vue";

export default defineComponent({
  name: 'FeModal',
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
    size: {
      type: String,
      default: 'is-md',
      required: false,
      validator: function (value: string) {
        return ['is-xs', 'is-sm', 'is-md', 'is-lg'].includes(value);
      },
    },
  },
  setup(props, {emit}) {
    const modal = ref(null);

    /**
     * size class object
     */
    const sizeClass = computed(() => {
      switch (props.size) {
        case 'is-xs':
          return 'text-xs';
        case 'is-sm':
          return 'text-sm';
        case 'is-md':
          return 'text-base';
        case 'is-lg':
          return 'text-lg';
        default:
          return 'text-base';
      }
    })

    /**
     * class names object
     */
    const classObject = computed(() => {
      let classes = ['outline-none'];
      if (props.modelValue) {
        classes.push('inset-0 fixed w-screen h-screen flex flex-col items-center overflow-hidden z-40');
      } else {
        classes.push('hidden');
      }
      return classes;
    });

    /**
     * on close emit close event
     */
    const close = () => {
      emit('update:modelValue', false);
    };

    /**
     * if modal is set to closeOnEscape, call close method
     */
    const onEscape = () => {
      if (props.closeOnEscape) {
        close();
      }
    };

    //on show focus the modal so we can close on escape
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        nextTick(() => {
          modal?.value.focus();
        });
      }
    });

    return {
      classObject,
      sizeClass,
      close,
      onEscape,
      modal,
    }
  },
})
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
