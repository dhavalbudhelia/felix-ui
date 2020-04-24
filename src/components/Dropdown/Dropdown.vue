<template>
    <div :class="[classObject, size]" @mouseover="hovered(true)" @mouseout="hovered(false)">
        <div class="dropdown-trigger" @click="toggleTrigger">
            <slot name="trigger">
                <fe-button :size="size" icon-pack-after="fas" :disabled="disabled" icon-after="caret-down">
                    <template v-if="selectedItem">{{ selectedItem }}</template>
                    <template v-else>{{ triggerButtonText }}</template>
                </fe-button>
            </slot>
        </div>
        <transition name="fade">
            <div v-if="opened || hoverable" :class="dropDownMenuClassObject">
                <div :class="contentClassObject">
                    <a v-for="item in items"
                       :key="item"
                       @click="selectItem(item)"
                       :class="itemClassObject"
                    ><slot name="item" :item="item">{{ item }}</slot></a>
                </div>
            </div>
        </transition>
        <div v-if="opened && !hoverable" @click="clickedOutside" :class="backdropClassObject"></div>
    </div>
</template>

<script>
    import FeButton from "@/components/Button/Button.vue";
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-dropdown',
        mixins: [SizeMixin],
        components: {
            FeButton,
        },
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array],
                default: null
            },
            triggerButtonText: {
                type: String,
                default: 'Dropdown'
            },
            items: {
                type: Array,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            hoverable: {
                type: Boolean,
                default: false
            },
            themeOptions: {
                type: Object,
                required: false,
                default: function () {
                    return optionsDefaults.themeOptions;
                },
            },
        },
        data() {
            return {
                opened: false,
                selectedItem: this.value,
            }
        },
        watch: {
            /**
             * When v-model is changed set the new selected item.
             */
            value(value) {
                this.selectedItem = value;
            },
            /**
             * Emit event when opened value is changed.
             */
            opened(value) {
                this.$emit('opened-change', value);
            }
        },
        computed: {
            /**
             * class names object form dropdown wrapper
             */
            classObject() {
                let classes = ['fe-dropdown', CssClasses.base];
                if (this.opened) {
                    classes.push('opened')
                }
                classes.push(this.sizeClass);
                return classes;
            },
            /**
             * class names object for dropdown menu
             */
            dropDownMenuClassObject() {
                let classes = ['dropdown-menu'];
                if (this.opened) {
                    classes.push(CssClasses.menu);
                    if (this.hoverable) {
                        classes.push('md:normal-position');
                    } else {
                        classes.push('center-position md:normal-position');
                    }
                } else {
                    classes.push('hidden');
                }
                return classes;
            },
            /**
             * content class object
             */
            contentClassObject() {
                return ['dropdown-content', CssClasses.content];
            },
            /**
             * item class object
             */
            itemClassObject() {
                return ['dropdown-item', CssClasses.item];
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
             * backdrop class object
             */
            backdropClassObject() {
                return CssClasses.backdrop;
            },
        },
        methods: {
            /**
             * toggle triggering
             */
            toggleTrigger() {
                if (this.hoverable || this.disabled) {
                    return;
                }
                if (!this.opened) {
                    // if not opened, toggle after clickOutside event
                    // this fixes toggling programmatic
                    this.$nextTick(() => {
                        this.opened = !this.opened;
                    });
                } else {
                    this.opened = !this.opened;
                }
            },
            /**
             * Close dropdown if clicked outside.
             */
            clickedOutside() {
                this.opened = (!this.hoverable) ? false : this.opened;
            },
            /**
             * select item and close the dropdown
             * @param value
             */
            selectItem(value) {
                if (this.selectedItem !== value) {
                    this.$emit('change', value);
                    this.selectedItem = value;
                }
                this.$emit('input', value);
                this.opened = false;
            },
            /**
             * toggle dropdown on hover of the trigger if hoverable setting is set
             * @param enter
             */
            hovered(enter) {
                if (this.hoverable) {
                    if (enter && !this.opened) {
                        this.opened = true;
                    } else if (!enter && this.opened) {
                        this.opened = false;
                    }
                }
            },
        },
    }
</script>

<style>
    @media (min-width: 768px) {
        .fe-dropdown .dropdown-menu.md\:normal-position {
            position: absolute;
            top: auto;
            right: auto;
            bottom: auto;
            left: auto;
            -webkit-transform: none;
            transform: none;
        }
    }

    .fe-dropdown .center-position {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .fe-dropdown .fade-enter-active, .fe-dropdown .fade-leave-active {
        transition: opacity .5s ease;
    }

    .fe-dropdown .fade-enter, .fe-dropdown .fade-leave-to {
        opacity: 0;
    }
</style>
