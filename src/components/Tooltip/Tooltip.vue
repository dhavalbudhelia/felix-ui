<template>
    <div class="fe-tooltip-container"
         ref="ertooltip_trigger"
         @mouseenter="hovered(true)"
         @mouseleave="hovered(false)"
    >
        <transition name="tooltip-fade">
            <div v-show="opened" :class="[contentClassObject, position, size]"
                 ref="ertooltip"
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
            }
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
             * content class object
             */
            contentClassObject() {
                return {
                    'fe-tooltip': true,
                    'wrap': this.wrap,
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
                    this.insertTooltipToBody(this.$refs.ertooltip);
                    this.positionTooltip();
                });
            },
            /**
             * on hide tooltip remove tooltip ref from the body
             */
            hideTooltip() {
                this.opened = false;
                if (this.$refs.ertooltip) {
                    this.removeTooltipFromBody(this.$refs.ertooltip);
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
                let triggerDomRect = this.$refs.ertooltip_trigger.getBoundingClientRect();
                let triggerElementHeight = triggerDomRect.height;
                let triggerElementWidth = triggerDomRect.width;
                let tooltipDomRect = this.$refs.ertooltip.getBoundingClientRect();
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
                    this.insertTooltipToBody(this.$refs.ertooltip);
                    this.positionTooltip();
                });
            }
        }
    }
</script>
