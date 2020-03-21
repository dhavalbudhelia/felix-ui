<template>
    <div ref="modal"
         :class="classObject"
         tabindex="0"
         role="dialog"
         @keydown.esc="onEscape"
    >
        <transition name="fade">
            <div v-if="opened" :class="[modalClassObject, `lg:${size}`]">
                <div class="fe-modal-header">
                    <div class="header">
                        <slot name="header">
                            {{header}}
                        </slot>
                    </div>
                    <div v-if="canClose" class="close" @click="close">
                        <Icon icon-pack="fas" icon="times" size="is-lg"></Icon>
                    </div>
                </div>
                <div class="fe-modal-body">
                    <slot></slot>
                </div>
                <div v-if="showFooter" class="fe-modal-footer">
                    <div class="footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </transition>
        <div v-if="opened" class="backdrop"></div>
    </div>
</template>

<script>
    import Icon from '@/components/Icon/Icon.vue';
    import SizeMixin from "@/mixins/SizeMixin";

    export default {
        name: 'fe-modal',
        components: {Icon},
        mixins: [SizeMixin],
        props: {
            value: {
                type: Boolean,
                required: false,
                default: false
            },
            header: {
                type: String,
                required: false,
                default: ''
            },
            showFooter: {
                type: Boolean,
                required: false,
                default: true
            },
            canClose: {
                type: Boolean,
                required: false,
                default: true,
            },
            closeOnEscape: {
                type: Boolean,
                required: false,
                default: false,
            }
        },
        computed: {
            /**
             * compute opened value and on set emit input event
             */
            opened: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            },
            /**
             * class names object
             */
            classObject() {
                return {
                    'fe-modal': true,
                    'opened': this.opened,
                }
            },
            /**
             * class names object for modal content container
             */
            modalClassObject() {
                return {
                    'fe-modal-container': true,
                    'sm:is-lg': true,
                }
            },
        },
        watch: {
            /**
             * on open set the focus on the modal
             * @param value
             */
            opened(value) {
                if (value) {
                    this.$nextTick(() => {
                        this.$refs.modal.focus();
                    });
                }
            }
        },
        methods: {
            /**
             * on close emit close event
             */
            close() {
                this.opened = false;
                this.$emit('close');
            },
            /**
             * if modal is set to closeOnEscape, call close method
             */
            onEscape() {
                if (this.closeOnEscape) {
                    this.close();
                }
            }
        },
    }
</script>
