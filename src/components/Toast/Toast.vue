<template>
  <div v-if="show" ref="fetoast" :class="toastContainerClassObject">
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
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    duration: {
      type: Number,
      required: false,
      default: 4000,
    },
    type: {
      type: String,
      required: false,
      default: 'success',
      validator: function (value) {
        return ['success', 'warning', 'error'].includes(value);
      },
    },
    position: {
      type: String,
      required: false,
      default: 'top-center',
      validator: function (value) {
        return ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].includes(value);
      },
    },
    closable: {
      type: Boolean,
      required: false,
      default: false,
    },
    message: {
      type: String,
      required: false,
      default: '',
    },
    fadeAutomatic: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  watch: {
    value(value) {
      if (value) {
        this.showToast();
      } else {
        setTimeout(() => {
          this.removeToastFromBody();
        }, 300);
      }
    },
  },
  computed: {
    /**
     * spinner container class object
     */
    toastContainerClassObject() {
      let classes = [CssClasses.toastContainer, this.position];
      if (this.value) {
        classes.push(CssClasses.show);
      } else {
        classes.push(CssClasses.hidden);
      }
      return classes;
    },
    /**
     * toast class object
     */
    toastClassObject() {
      let classes = [CssClasses.toast];
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
      this.show = true;
      this.$nextTick(() => {
        this.insertToastToBody();
        //if fading automatically time out for the input event for given duration
        if (this.fadeAutomatic) {
          setTimeout(() => {
            this.$emit('input', false);
          }, this.duration);
        }
      });
    },
    /**
     * stop spinner animation
     */
    closeToast() {
      this.$emit('input', false);
      this.removeToastFromBody();
      this.show = true;
    },
    /**
     * insert spinner div element to the body
     */
    insertToastToBody() {
      let body = document.body;
      body.insertBefore(this.$refs.fetoast, body.firstChild);
    },
    /**
     * remove added spinner div element from the body
     */
    removeToastFromBody() {
      //remove the toast dom element if its available
      if (this.$refs.fetoast) {
        let body = document.body;
        body.removeChild(this.$refs.fetoast);
      }
    },
  },
  mounted() {
    //if activated on mount force show the toast
    if (this.value) {
      this.$nextTick(() => {
        this.showToast();
      });
    }
  },
}
</script>
