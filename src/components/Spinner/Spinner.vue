<template>
  <transition name="tooltip-fade">
    <div v-if="spinning" :class="backdropClassObject" ref="fespinner">
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
  props: {
    value: {
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
    value(value) {
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
        this.insertSpinnerToBody();
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
        this.removeSpinnerFromBody();
        this.$emit('input', false);
      }
    },
    /**
     * insert spinner div element to the body
     */
    insertSpinnerToBody() {
      let body = document.body;
      body.insertBefore(this.$refs.fespinner, body.firstChild);
    },
    /**
     * remove added spinner div element from the body
     */
    removeSpinnerFromBody() {
      if (this.$refs.fespinner) {
        let body = document.body;
        body.removeChild(this.$refs.fespinner);
      }
    },
  },
  mounted() {
    if (this.value) {
      this.$nextTick(() => {
        this.startSpinning();
      });
    }
  },
}
</script>

