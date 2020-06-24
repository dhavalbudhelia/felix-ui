<template>
    <div :class="[wrapperClass]">
        <input :id="id"
               :name="name"
               :class="[inputObject]"
               :placeholder="placeholder"
               type="text"
               :value="value"
               :disabled="disabled"
               @blur="onBlur"
               @focus="onFocus">
        <div v-if="!disabled" class="flex flex-row right-0 absolute items-center h-full">
            <div :class="caretDownClass" @click.stop="decrement()">
                <fe-icon icon="minus" icon-pack="fas" :size="size"></fe-icon>
            </div>
            <div :class="caretUpClass" @click.stop="increment()">
                <fe-icon icon="plus" icon-pack="fas" :size="size"></fe-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import FeIcon from "../Icon/Icon";
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-numeric-input',
        components: {
            FeIcon
        },
        mixins: [SizeMixin],
        props: {
            id: {
                type: String,
                required: false,
                default: null,
            },
            name: {
                type: String,
                required: false,
                default: null,
            },
            value: {
                type: [Number,String],
                default: null
            },
            placeholder: {
                type: String,
            },
            step: {
                type: Number,
                default: 1,
                required: false,
            },
            minValue: {
                type: Number,
                default: null,
                required: false,
            },
            maxValue: {
                type: Number,
                default: null,
                required: false,
            },
            disabled: {
                type: Boolean,
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
             * class object for wrapper div
             */
            wrapperClass() {
                let classes =  ['fe-numeric-input-wrapper', CssClasses.base];
                if (this.disabled) {
                    classes.push(CssClasses.disabled);
                } else {
                    classes.push(CssClasses.general);
                    classes.push(`focus-within:border-${this.themeOptions.color.primary} active:border-${this.themeOptions.color.primary}`);
                }
                classes.push(this.colorClass);
                if (this.type === 'text') {
                    switch (this.size) {
                        case 'is-xs':
                            classes.push(CssClasses.wrapperSizeXs);
                            break;
                        case 'is-sm':
                            classes.push(CssClasses.wrapperSizeSm);
                            break;
                        case 'is-md':
                            classes.push(CssClasses.wrapperSizeMd);
                            break;
                        case 'is-lg':
                            classes.push(CssClasses.wrapperSizeLg);
                            break;
                        default:
                            classes.push(CssClasses.wrapperSizeMd);
                    }
                }
                return classes;
            },
            /**
             * class object for input
             */
            inputObject() {
                let classes =  ['fe-numeric-input w-full', CssClasses.input];
                if (this.disabled) {
                    classes.push(CssClasses.disabled);
                }
                classes.push(this.sizeClass);
                classes.push(this.colorClass);
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
             * color class object
             */
            colorClass() {
                let primary = '';
                if (this.disabled) {
                    primary = `bg-${this.themeOptions.color.tertiary}`;
                } else {
                    primary = `bg-white`;
                }
                return `${primary}`;
            },
            /**
             * icon class object
             */
            iconClass() {
                return CssClasses.icon;
            },
            /**
             * caret class object
             */
            caretDownClass() {
                return CssClasses.caretDown;
            },
            /**
             * caret class object
             */
            caretUpClass() {
                return CssClasses.caretUp;
            },
        },
        methods: {
            decrement() {
                if (this._.isNaN(parseFloat(this.value))) {
                    this.$emit('input', 0);
                } else if (this.minValue === null || (parseFloat(this.value) - this.step) >= this.minValue) {
                    this.$emit('input', (parseFloat(this.value) - this.step));
                }
            },
            increment() {
                if (this._.isNaN(parseFloat(this.value))) {
                    this.$emit('input', 0);
                } else if (this.maxValue === null || (parseFloat(this.value) + this.step) <= this.maxValue) {
                    this.$emit('input', (parseFloat(this.value) + this.step));
                }
            },
            /**
             * emit blur event
             * @param $event
             */
            onBlur($event) {
                this.$emit('blur', $event);
            },
            /**
             * emit focus event
             * @param $event
             */
            onFocus($event) {
                this.$emit('focus', $event);
            },
        }
    }
</script>

<style scoped>

</style>
