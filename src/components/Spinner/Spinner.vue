<template>
  <transition name="tooltip-fade">
    <div v-if="spinning" :class="backdropClassObject">
      <div :class="spinnerContainerClassObject">
        <slot>
          <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
          <svg class="h-20 w-20 text-white" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                <path d="M36 18c0-9.94-8.06-18-18-18"></path>
              </g>
            </g>
          </svg>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent,ref, computed, nextTick, onMounted, watch} from "vue";

export default defineComponent({
  name: 'FeSpinner',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  setup(props, {emit}) {
    const spinning = ref(false);

    /**
     * backdrop class object
     */
    const backdropClassObject = computed(() => {
      return 'fixed w-screen h-screen overflow-x-auto flex justify-center z-10 bg-gray-600 bg-opacity-25';
    });

    /**
     * spinner container class object
     */
    const spinnerContainerClassObject = computed(() => {
      return 'fe-spinner animate-spin self-center items-center z-20';
    });

    /**
     * start spinner animation
     */
    const startSpinning = () => {
      spinning.value = true;
      nextTick(() => {
        if (props.duration > 0) {
          setTimeout(()=>{
            stopSpinning();
          },props.duration);
        }
      });
    };

    /**
     * stop spinner animation
     */
    const stopSpinning = () => {
      if (spinning.value) {
        spinning.value = false;
        emit('update:modelValue', false);
      }
    };

    onMounted(() => {
      if (props.modelValue) {
        nextTick(() => {
          startSpinning();
        });
      }
    });

    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        startSpinning();
      } else {
        stopSpinning();
      }
    });

    return {
      spinning,
      backdropClassObject,
      spinnerContainerClassObject,
      startSpinning,
      stopSpinning,
    }
  },
})
</script>

