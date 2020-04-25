<template>
    <div ref="modal"
         :class="[classObject, 'fe-modal']"
         tabindex="0"
         role="dialog"
         @keydown.esc="onEscape"
    >
        <div v-if="opened" :class="[modalClassObject, `lg:${size}`]">
            <div :class="headerClassObject">
                <div class="flex-grow">
                    <slot name="header">
                        {{header}}
                    </slot>
                </div>
                <div v-if="canClose" :class="closeClassObject" @click="close">
                    <fe-icon icon-pack="fas" icon="times" size="is-lg"></fe-icon>
                </div>
            </div>
            <div :class="bodyClassObject">
                <slot></slot>
            </div>
            <div v-if="showFooter" :class="footerClassObject">
                <div class="flex items-end justify-end">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="opened" :class="backdropClassObject"></div>
        </transition>
    </div>
</template>

<script>
    import FeIcon from '@/components/Icon/Icon.vue';
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-modal',
        components: {
            FeIcon
        },
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
            },
            themeOptions: {
                type: Object,
                required: false,
                default: function () {
                    return optionsDefaults.themeOptions;
                },
            },
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
                let classes = [CssClasses.base];
                if (this.opened) {
                    classes.push(CssClasses.general);
                } else {
                    classes.push('hidden');
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
             * class names object for modal content container
             */
            modalClassObject() {
                return [CssClasses.container];
            },
            /**
             * header class object
             */
            headerClassObject() {
                return ['fe-modal-header', CssClasses.header];
            },
            /**
             * body class object
             */
            bodyClassObject() {
                return ['fe-modal-body', CssClasses.body];
            },
            /**
             * footer class object
             */
            footerClassObject() {
                return ['fe-modal-footer', CssClasses.footer];
            },
            /**
             * close icon class object
             */
            closeClassObject() {
                return CssClasses.close;
            },
            /**
             * backdrop class object
             */
            backdropClassObject() {
                return [CssClasses.backdrop];
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
