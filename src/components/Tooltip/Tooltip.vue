<template>
    <div :class="wrapperClassObject"
         ref="fetooltip_trigger"
         @mouseenter="hovered(true)"
         @mouseleave="hovered(false)"
    >
        <transition name="tooltip-fade">
            <div v-if="opened" :class="[contentClassObject, position, size]"
                 ref="fetooltip"
                 v-html="content"
                 :style="style"
            ></div>
        </transition>
        <span @click="onTrigger"><slot></slot></span>
        <div v-if="opened && triggerOnClick"
             @click="clickedOutside"
             class="mobile-device-backdrop"
        ></div>
    </div>
</template>

<script>
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-tooltip',
        mixins: [SizeMixin],
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
                if (this.wrap) {
                    classes.push(CssClasses.wrap);
                } else {
                    classes.push(CssClasses.general);
                }
                classes.push(this.sizeClass);
                return classes;
            },
            /**
             * size class object
             */
            sizeClass() {
                switch (this.size) {
                    case 'is-xs':
                        return CssClasses.sizeXs;
                    case 'is-sm':
                        return CssClasses.sizeSm;
                    case 'is-md':
                        return CssClasses.sizeMd;
                    case 'is-lg':
                        return CssClasses.sizeLg;
                    default:
                        return CssClasses.sizeMd;
                }
            },
            /**
             * style object for ref tooltip
             */
            style() {
                return {
                    left: `${this.tooltipPosition.left}px`,
                    top: `${this.tooltipPosition.top}px`,
                    transitionDelay: `${this.delay}ms`,
                };
            },
        },
        methods: {
            /**
             * on show tooltip insert the body of the tooltip and position it
             */
            showTooltip() {
                this.opened = true;
                this.$nextTick(() => {
                    this.insertTooltipToBody(this.$refs.fetooltip);
                    this.positionTooltip();
                });
            },
            /**
             * on hide tooltip remove tooltip ref from the body
             */
            hideTooltip() {
                this.opened = false;
                if (this.$refs.fetooltip) {
                    this.removeTooltipFromBody(this.$refs.fetooltip);
                }
            },
            /**
             * show tooltip on hover if tooltip is not set to trigger on click
             */
            hovered(enter) {
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
             * insert tooltip to the dom
             */
            insertTooltipToBody(element, parent) {
                let body = parent ? parent : document.body;
                body.insertBefore(element, body.firstChild);
            },
            /**
             * remove tooltip from the dom
             */
            removeTooltipFromBody(element, parent) {
                let body = parent ? parent : document.body;
                body.removeChild(element);
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
                    this.insertTooltipToBody(this.$refs.fetooltip);
                    this.positionTooltip();
                });
            }
        }
    }
</script>

<style scoped>
    /*size*/
    .is-xs {
        width: 80px;
    }

    .is-sm {
        width: 120px;
    }

    .is-md {
        width: 180px;
    }

    .is-lg {
        width: 240px;
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
    .is-left:before {
        border-left: 5px solid black;
        top: calc(50% - 5px);
        left: calc(100%);
    }

    .is-right:before {
        border-right: 5px solid black;
        top: calc(50% - 5px);
        right: calc(100%);
    }

    .is-bottom:before {
        border-bottom: 5px solid black;
        bottom: calc(100%);
        left: 50%;
    }

    .is-top:before {
        border-top: 5px solid black;
        top: calc(100%);
        left: 50%;
    }

    .tooltip-fade-enter-active, .tooltip-fade-leave-active {
        transition: opacity .2s;
    }

    .tooltip-fade-enter, .tooltip-fade-leave-to {
        opacity: 0;
    }
</style>
