<template>
    <div :class="[wrapperClass]">
        <textarea v-if="type === 'textarea'" ref="textarea"
                  :class="[inputObject]"
                  :placeholder="placeholder"
                  :value="computedValue"
                  :disabled="disabled"
                  @input="onInput"
                  @blur="onBlur"
                  @focus="onFocus"
        ></textarea>
        <template v-if="type === 'text'">
            <div v-if="iconBefore">
                <fe-icon :icon-pack="iconPackBefore"
                      :icon="iconBefore"
                      :size="size"
                      :class="[iconClass]"
                ></fe-icon>
            </div>
            <input ref="input"
                   :class="[inputObject]"
                   :placeholder="placeholder"
                   type="text"
                   :value="computedValue"
                   :disabled="disabled"
                   :readonly="readonly"
                   @input="onInput"
                   @blur="onBlur"
                   @focus="onFocus">
            <div v-if="iconAfter">
                <fe-icon :icon-pack="iconPackAfter"
                      :icon="iconAfter"
                      :size="size"
                      :class="[iconClass]"
                ></fe-icon>
            </div>
        </template>
    </div>
</template>

<script>
    import IconMixin from "@/mixins/IconMixin";
    import SizeMixin from "@/mixins/SizeMixin";
    import FeIcon from '@/components/Icon/Icon.vue';
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-input',
        components: {
            FeIcon,
        },
        mixins: [IconMixin, SizeMixin],
        props: {
            value: {
                type: [String, Number],
                default: null
            },
            type: {
                type: String,
                default: 'text',
                validator: function (value) {
                    return ['text', 'textarea'].includes(value);
                }
            },
            placeholder: {
                type: String,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            readonly: {
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
        data() {
            return {
                localValue: this.value
            }
        },
        computed: {
            /**
             * class object for wrapper div
             */
            wrapperClass() {
                let classes =  ['fe-input-wrapper', CssClasses.base];
                if (this.disabled) {
                    classes.push(CssClasses.disabled);
                } else {
                    classes.push(CssClasses.general);
                    classes.push(`focus-within:border-${this.themeOptions.color.primary} active:border-${this.themeOptions.color.primary}`);
                }
                classes.push(this.colorClass);
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
                return classes;
            },
            /**
             * class object for input
             */
            inputObject() {
                let classes =  ['fe-input w-full', CssClasses.input];
                if (this.disabled) {
                    classes.push(CssClasses.disabled);
                }
                if (this.iconBefore) {
                    classes.push('pl-2');
                }
                if (this.iconAfter) {
                    classes.push('pr-2');
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
             * set local value on change of the input
             */
            computedValue: {
                get() {
                    return this.localValue;
                },
                set(value) {
                    this.localValue = value;
                    this.$emit('input', value);
                }
            }
        },
        watch: {
            /**
             * When v-model is changed set local value.
             */
            value(value) {
                this.localValue = value;
            },
        },
        methods: {
            /**
             * Input's 'input' event listener, 'nextTick' is used to prevent event firing
             * before ui update, helps when using masks (Cleavejs and potentially others).
             */
            onInput(event) {
                this.$nextTick(() => {
                    this.computedValue = event.target.value;
                });
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
