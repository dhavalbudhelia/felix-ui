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

<script>
import CssClasses from "./CssClasses";

export default {
  name: 'fe-spinner',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    duration: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      spinning: false,
    }
  },
  watch: {
    modelValue(value) {
      if (value) {
        this.startSpinning();
      } else {
        this.stopSpinning();
      }
    },
  },
  computed: {
    /**
     * backdrop class object
     */
    backdropClassObject() {
      return CssClasses.backdrop;
    },
    /**
     * spinner container class object
     */
    spinnerContainerClassObject() {
      return CssClasses.spinnerContainer;
    },
  },
  methods: {
    /**
     * start spinner animation
     */
    startSpinning() {
      this.spinning = true;
      this.$nextTick(() => {
        if (this.duration > 0) {
          setTimeout(()=>{
            this.stopSpinning();
          },this.duration);
        }
      });
    },
    /**
     * stop spinner animation
     */
    stopSpinning() {
      if (this.spinning) {
        this.spinning = false;
        this.$emit('update:modelValue', false);
      }
    },
  },
  mounted() {
    if (this.modelValue) {
      this.$nextTick(() => {
        this.startSpinning();
      });
    }
  },
}
</script>

