<template>
    <label :class="[classObject, cssClass, size]"
           ref="label"
           :disabled="disabled"
           :tabindex="disabled ? false : 0"
           @keydown.prevent.enter.space="$refs.label.click()">
        <input v-model="computedValue"
               :id="id"
               :name="name"
               type="checkbox"
               :disabled="disabled"
               :class="inputClass"
               :value="localValue"
               :true-value="trueValue"
               :false-value="falseValue">
        <span :class="[checkClass]"></span>
    </label>
</template>

<script>
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-toggle-switch',
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
                type: [String, Number, Boolean],
                required: false,
            },
            localValue: {
                type: [String, Number, Boolean],
                required: false,
            },
            trueValue: {
                type: [String, Number, Boolean],
                required: false,
                default: true,
            },
            falseValue: {
                type: [String, Number, Boolean],
                required: false,
                default: false,
            },
            disabled: {
                type: Boolean,
                require: false,
                default: false,
            },
            cssClass: {
                type: String,
                required: false,
                default: ''
            },
            checkColorClass: {
                type: String,
                required: false,
                default: ''
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
             * set local value on change of the input
             */
            computedValue: {
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
                let classes =  ['fe-toggle-switch', CssClasses.base];
                let checkColor = `bg-${this.themeOptions.color.tertiary}`;
                let hoverColor = `hover:bg-${this.themeOptions.color.tertiaryDark}`;
                if (this.localValue) {
                    if (this.checkColorClass !== '') {
                        checkColor = this.checkColorClass;
                        hoverColor = `hover:${checkColor}`;
                    } else {
                        checkColor = `bg-${this.themeOptions.color.primary}`;
                        hoverColor = `hover:bg-${this.themeOptions.color.primaryDark}`;
                    }
                }
                if (this.disabled) {
                    classes.push(CssClasses.disabled);
                } else {
                    classes.push(CssClasses.general);
                    classes.push(hoverColor);
                }
                classes.push(this.sizeClass);
                classes.push(checkColor);
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
             * check class object
             * @return {string[]}
             */
            checkClass() {
                let checkColor = 'bg-white';
                return ['check', checkColor, CssClasses.check];
            },
            /**
             * input class object
             * @return {string[]}
             */
            inputClass() {
                return [CssClasses.input];
            },
        },
    }
</script>
