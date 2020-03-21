<template>
    <div :class="[classObject, size]" @mouseover="hovered(true)" @mouseout="hovered(false)">
        <div class="dropdown-trigger" @click="toggleTrigger">
            <slot name="trigger">
                <Button :size="size" icon-pack-after="fas" :disabled="disabled" icon-after="caret-down">
                    <template v-if="selectedItem">{{ selectedItem }}</template>
                    <template v-else>{{ triggerButtonText }}</template>
                </Button>
            </slot>
        </div>
        <transition name="fade">
            <div v-if="opened || hoverable" :class="dropDownMenuClassObject">
                <div class="dropdown-content">
                    <a v-for="item in items"
                       :key="item"
                       @click="selectItem(item)"
                       class="dropdown-item"
                    >
                        <slot name="item" :item="item">{{ item }}</slot>
                    </a>
                </div>
            </div>
        </transition>
        <div v-if="opened && !hoverable" @click="clickedOutside" class="mobile-device-backdrop gray-backdrop md:white-backdrop"></div>
    </div>
</template>

<script>
    import Button from '@/components/Button/Button.vue';
    import SizeMixin from "@/mixins/SizeMixin";

    export default {
        name: 'fe-dropdown',
        mixins: [SizeMixin],
        components: {
            Button
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
            }
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
                return {
                    'fe-dropdown': true,
                    'opened': this.opened,
                    'hoverable': this.hoverable,
                    'disabled': this.disabled,
                }
            },
            /**
             * class names object for dropdown menu
             */
            dropDownMenuClassObject() {
                return {
                    'dropdown-menu': true,
                    'center-position': true,
                    'md:normal-position': true,
                }
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
