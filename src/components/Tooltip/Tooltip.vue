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

<script>
import CssClasses from "./CssClasses";

export default {
  name: 'fe-tooltip',
  emits: ['opened-change'],
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    content: {
      type: String,
      required: false,
      default: '',
    },
    position: {
      type: String,
      required: false,
      default: 'is-right',
      validator: function (value) {
        return ['is-left', 'is-top', 'is-right', 'is-bottom'].includes(value);
      },
    },
    wrap: {
      type: Boolean,
      required: false,
      default: true,
    },
    triggerOnClick: {
      type: Boolean,
      required: false,
      default: false,
    },
    delay: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      opened: false,
      tooltipPosition: {
        left: 0,
        top: 0,
      },
      isHovered: false,
    }
  },
  watch: {
    /**
     * Emit event when opened value is changed.
     */
    opened(value) {
      this.$emit('opened-change', value);
    }
  },
  computed: {
    /**
     * tooltip wrapper class
     */
    wrapperClassObject() {
      return CssClasses.container;
    },
    /**
     * content class object
     */
    contentClassObject() {
      let classes = ['fe-tooltip', CssClasses.base];
      if (!this.wrap) {
        classes.push(CssClasses.general);
      }
      return classes;
    },
    /**
     * style object for ref tooltip
     */
    style() {
      return {
        left: `${this.tooltipPosition.left}px`,
        top: `${this.tooltipPosition.top}px`,
      };
    },
  },
  methods: {
    /**
     * on show tooltip insert the body of the tooltip and position it
     */
    showTooltip() {
      setTimeout(() => {
        if (this.isHovered) {
          this.opened = true;
          this.$nextTick(() => {
            this.positionTooltip();
          });
        }
      },this.delay);
    },
    /**
     * on hide tooltip remove tooltip ref from the body
     */
    hideTooltip() {
      this.opened = false;
    },
    /**
     * show tooltip on hover if tooltip is not set to trigger on click
     */
    hovered(enter) {
      this.isHovered = enter;
      if (!this.triggerOnClick) {
        if (enter && !this.opened) {
          this.showTooltip();
        } else if (!enter && this.opened) {
          this.hideTooltip();
        }
      }
    },
    /**
     * toggle tooltip on click if tooltip is set to trigger on click
     */
    onTrigger() {
      if (this.triggerOnClick) {
        if (!this.opened) {
          this.showTooltip();
        } else {
          this.hideTooltip();
        }
      }
    },
    /**
     * after adding tooltip to the dom position it as per the property
     */
    positionTooltip() {
      let triggerDomRect = this.$refs.fetooltip_trigger.getBoundingClientRect();
      let triggerElementHeight = triggerDomRect.height;
      let triggerElementWidth = triggerDomRect.width;
      let tooltipDomRect = this.$refs.fetooltip.getBoundingClientRect();
      let tooltipHeight = tooltipDomRect.height;
      let tooltipWidth = tooltipDomRect.width;

      if (this.position === 'is-left') {
        this.tooltipPosition.left = triggerDomRect.left - (tooltipWidth + 5);
        this.tooltipPosition.top = triggerDomRect.top + (triggerElementHeight / 2) - (tooltipHeight / 2);
      } else if (this.position === 'is-right') {
        this.tooltipPosition.left = triggerDomRect.left + (triggerElementWidth + 5);
        this.tooltipPosition.top = triggerDomRect.top + (triggerElementHeight / 2) - (tooltipHeight / 2);
      } else if (this.position === 'is-bottom') {
        this.tooltipPosition.left = triggerDomRect.left + (triggerElementWidth / 2) - (tooltipWidth / 2);
        this.tooltipPosition.top = triggerDomRect.top + (triggerElementHeight + 5);
      } else if (this.position === 'is-top') {
        this.tooltipPosition.left = triggerDomRect.left + (triggerElementWidth / 2) - (tooltipWidth / 2);
        this.tooltipPosition.top = triggerDomRect.top - (tooltipHeight + 5);
      }
    },
    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside() {
      if (this.triggerOnClick) {
        this.hideTooltip();
      }
    },
  },
  mounted() {
    this.opened = this.active;
    if (this.opened) {
      this.$nextTick(() => {
        this.positionTooltip();
      });
    }
  }
}
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
