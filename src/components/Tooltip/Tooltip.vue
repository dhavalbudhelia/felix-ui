<template>
  <div :class="wrapperClassObject"
       ref="fetooltip_trigger"
       @mouseenter="hovered(true)"
       @mouseleave="hovered(false)"
  >
    <transition name="tooltip-fade">
      <div v-if="opened" :class="[contentClassObject, position]"
           ref="fetooltip"
           v-html="content"
           :style="style"
      ></div>
    </transition>
    <span @click="onTrigger"><slot/></span>
    <div v-if="opened && triggerOnClick"
         @click="clickedOutside"
         class="inset-0 fixed w-screen h-screen"
    ></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, nextTick, onMounted} from "vue";

export default defineComponent({
  name: 'FeTooltip',
  emits: ['opened-change'],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'is-right',
      validator: function (value: string) {
        return ['is-left', 'is-top', 'is-right', 'is-bottom'].includes(value);
      },
    },
    wrap: {
      type: Boolean,
      default: true,
    },
    triggerOnClick: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  setup(props, {emit}) {
    const opened = ref(false);
    const tooltipPosition = ref({
      left: 0,
      top: 0,
    });
    const isHovered = ref(false);
    const fetooltip_trigger = ref(null);
    const fetooltip = ref(null);

    /**
     * tooltip wrapper class
     */
    const wrapperClassObject = computed(() => {
      return 'inline-flex';
    });

    /**
     * content class object
     */
    const contentClassObject = computed(() => {
      let classes = ['fe-tooltip absolute block bg-black text-white text-center shadow px-2 py-1 rounded w-auto z-20 whitespace-normal opacity-75'];
      if (!props.wrap) {
        classes.push('whitespace-nowrap');
      }
      return classes;
    });

    /**
     * style object for ref tooltip
     */
    const style = computed(() => {
      return {
        left: `${tooltipPosition.value.left}px`,
        top: `${tooltipPosition.value.top}px`,
      };
    });

    /**
     * on show tooltip insert the body of the tooltip and position it
     */
    const showTooltip = () => {
      setTimeout(() => {
        if (isHovered.value) {
          opened.value = true;
          emit('opened-change', true);
          nextTick(() => {
            positionTooltip();
          });
        }
      }, props.delay);
    };

    /**
     * on hide tooltip remove tooltip ref from the body
     */
    const hideTooltip = () => {
      opened.value = false;
      emit('opened-change', false);
    };

    /**
     * show tooltip on hover if tooltip is not set to trigger on click
     */
    const hovered = (enter) => {
      isHovered.value = enter;
      if (!props.triggerOnClick) {
        if (enter && !opened.value) {
          showTooltip();
        } else if (!enter && opened.value) {
          hideTooltip();
        }
      }
    };

    /**
     * toggle tooltip on click if tooltip is set to trigger on click
     */
    const onTrigger = () => {
      if (props.triggerOnClick) {
        if (!opened.value) {
          showTooltip();
        } else {
          hideTooltip();
        }
      }
    };

    /**
     * after adding tooltip to the dom position it as per the property
     */
    const positionTooltip = () => {
      if (fetooltip_trigger.value && fetooltip.value) {
        let triggerDomRect = fetooltip_trigger.value?.getBoundingClientRect();
        let triggerElementHeight = triggerDomRect.height;
        let triggerElementWidth = triggerDomRect.width;
        let tooltipDomRect = fetooltip.value?.getBoundingClientRect();
        let tooltipHeight = tooltipDomRect.height;
        let tooltipWidth = tooltipDomRect.width;
        if (props.position === 'is-left') {
          tooltipPosition.value.left = triggerDomRect.left - (tooltipWidth + 5);
          tooltipPosition.value.top = triggerDomRect.top + (triggerElementHeight / 2) - (tooltipHeight / 2);
        } else if (props.position === 'is-right') {
          tooltipPosition.value.left = triggerDomRect.left + (triggerElementWidth + 5);
          tooltipPosition.value.top = triggerDomRect.top + (triggerElementHeight / 2) - (tooltipHeight / 2);
        } else if (props.position === 'is-bottom') {
          tooltipPosition.value.left = triggerDomRect.left + (triggerElementWidth / 2) - (tooltipWidth / 2);
          tooltipPosition.value.top = triggerDomRect.top + (triggerElementHeight + 5);
        } else if (props.position === 'is-top') {
          tooltipPosition.value.left = triggerDomRect.left + (triggerElementWidth / 2) - (tooltipWidth / 2);
          tooltipPosition.value.top = triggerDomRect.top - (tooltipHeight + 5);
        }
      }
    };

    /**
     * Close dropdown if clicked outside.
     */
    const clickedOutside = () => {
      if (props.triggerOnClick) {
        hideTooltip();
      }
    };

    onMounted(() => {
      opened.value = props.active;
      emit('opened-change', props.active);
      if (opened.value) {
        nextTick(() => {
          positionTooltip();
        });
      }
    });

    return {
      opened,
      tooltipPosition,
      isHovered,
      fetooltip_trigger,
      fetooltip,
      wrapperClassObject,
      contentClassObject,
      style,
      showTooltip,
      hideTooltip,
      hovered,
      onTrigger,
      positionTooltip,
      clickedOutside,
    }
  },
})
</script>

<style scoped>
/*transitions*/
.tooltip-fade-enter-active, .tooltip-fade-leave-active {
  transition: opacity .2s;
}

.tooltip-fade-enter, .tooltip-fade-leave-to {
  opacity: 0;
}

/*size*/
.fe-tooltip {
  width: 180px;
}

/*Triangle*/
.fe-tooltip:before {
  content: '';
  border: 5px solid transparent;
  position: absolute;
  display: block;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
}

/*position*/
.fe-tooltip.is-left:before {
  border-left: 5px solid black;
  top: calc(50% - 5px);
  left: calc(100%);
}

.fe-tooltip.is-right:before {
  border-right: 5px solid black;
  top: calc(50% - 5px);
  right: calc(100%);
}

.fe-tooltip.is-bottom:before {
  border-bottom: 5px solid black;
  bottom: calc(100%);
  left: 50%;
}

.fe-tooltip.is-top:before {
  border-top: 5px solid black;
  top: calc(100%);
  left: 50%;
}

</style>
