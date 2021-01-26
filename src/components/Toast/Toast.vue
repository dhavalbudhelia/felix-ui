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
    appendTo: {
      type: String,
      required: false,
      default: '',
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
      timer: null,
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
      let classes = ['fe-toast-wrapper', CssClasses.toastContainer, this.position];
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
      this.show = true;
      this.$nextTick(() => {
        this.insertToastToBody();
        //if fading automatically time out for the input event for given duration
        if (this.fadeAutomatic) {
          this.timer = setTimeout(() => {
            this.$emit('input', false);
          }, this.duration);
        }
      });
    },
    /**
     * close toast
     */
    closeToast() {
        clearTimeout(this.timer);
        this.removeToastFromBody();
        this.show = false;
        this.$emit('input', false);
    },
    /**
     * insert toast div element to the body
     */
    insertToastToBody() {
      let parent = this.appendTo !== '' ? document.getElementById(this.appendTo) : document.body;
      parent.insertBefore(this.$refs.fetoast, parent.firstChild);
    },
    /**
     * remove added toast div element from the body
     */
    removeToastFromBody() {
      //remove the toast dom element if its available
      if (this.$refs.fetoast && this.$refs.fetoast.parentNode) {
        this.$refs.fetoast.parentNode.removeChild(this.$refs.fetoast);
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

<style scoped>
.fe-toast-wrapper.top-left {
  left: 25px;
}
.fe-toast-wrapper.top-center {
  @apply inset-x-0;
}
.fe-toast-wrapper.top-right {
  right: 25px;
}
.fe-toast-wrapper.bottom-left {
  left: 25px;
  bottom: 25px;
}
.fe-toast-wrapper.bottom-center {
  @apply inset-x-0;
}
.fe-toast-wrapper.bottom-right {
  right: 25px;
  bottom: 25px;
}

.fe-toast-wrapper.top-center.show,
.fe-toast-wrapper.top-left.show,
.fe-toast-wrapper.top-right.show {
   top: 25px;
   @apply opacity-100;
   animation: fadeintop .5s;
 }
.fe-toast-wrapper.top-center.hide,
.fe-toast-wrapper.top-left.hide,
.fe-toast-wrapper.top-right.hide {
   @apply top-0;
   @apply opacity-0;
   animation: fadeouttop .3s;
}

.fe-toast-wrapper.bottom-center.show,
.fe-toast-wrapper.bottom-left.show,
.fe-toast-wrapper.bottom-right.show {
   bottom: 25px;
   @apply opacity-100;
   animation: fadeinbottom .5s;
}

.fe-toast-wrapper.bottom-center.hide,
.fe-toast-wrapper.bottom-left.hide,
.fe-toast-wrapper.bottom-right.hide {
     @apply bottom-0;
     @apply opacity-0;
     animation: fadeoutbottom .3s;
}

/*Top keyframes*/
@-webkit-keyframes fadeintop {
  from {
    @apply top-0;
    @apply opacity-0;
  }
  to {
    top: 25px;
    @apply opacity-100;
  }
}

@keyframes fadeintop {
  from {
    @apply top-0;
    @apply opacity-0;
  }
  to {
    top: 25px;
    @apply opacity-100;
  }
}

@-webkit-keyframes fadeouttop {
  from {
    top: 25px;
    @apply opacity-100;
  }
  to {
    @apply top-0;
    @apply opacity-0;
  }
}

@keyframes fadeouttop {
  from {
    top: 25px;
    @apply opacity-100;
  }
  to {
    @apply top-0;
    @apply opacity-0;
  }
}

/*Bottom keyframes*/
@-webkit-keyframes fadeinbottom {
  from {
    @apply bottom-0;
    @apply opacity-0;
  }
  to {
    bottom: 25px;
    @apply opacity-100;
  }
}

@keyframes fadeinbottom {
  from {
    @apply bottom-0;
    @apply opacity-0;
  }
  to {
    bottom: 25px;
    @apply opacity-100;
  }
}

@-webkit-keyframes fadeoutbottom {
  from {
    bottom: 25px;
    @apply opacity-100;
  }
  to {
    @apply bottom-0;
    @apply opacity-0;
  }
}

@keyframes fadeoutbottom {
  from {
    bottom: 25px;
    @apply opacity-100;
  }
  to {
    @apply bottom-0;
    @apply opacity-0;
  }
}

</style>
