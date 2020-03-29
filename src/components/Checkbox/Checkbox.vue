<template>
    <label :class="[classObject, cssClass]"
           ref="label"
           :disabled="disabled"
           :tabindex="disabled ? false : 0"
           @keydown.prevent.enter.space="$refs.label.click()">
        <input v-model="computedValue"
               type="checkbox"
               :disabled="disabled"
               :name="name"
               :class="inputClass"
               :value="localValue"
               :true-value="trueValue"
               :false-value="falseValue">
        <span :class="[checkClass, checkColorClass]"></span>
        <span class="control-label pl-2"><slot/></span>
    </label>
</template>

<script>
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-checkbox',
        mixins: [SizeMixin],
        props: {
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
                required: false,
            },
            name: {
                type: String,
                required: false,
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
            options: {
                type: Object,
                required: false,
                default: function () {
                    return optionsDefaults.options;
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
             * @return {{"fe-checkbox": boolean}}
             */
            classObject() {
                let classes =  ['fe-checkbox flex items-center', CssClasses.base];
                if (this.disabled) {
                    classes.push(CssClasses.disabled);
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
             * check class object
             * @return {string[]}
             */
            checkClass() {
                let color = this.checkColorClass !== '' ? this.checkColorClass : `text-${this.options.color.primary}`;
                return ['check', `${color}`, `hover:${color}`];
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


<style scoped>
    .check {
        content: "";
        transition: all .15s ease-out;
    }

    .check:before {
        font-family: "Font Awesome 5 Free";
        content: "\f0c8";
        transform: scale(0);
        transition: all .15s ease-out;
    }

    input[type=checkbox]:checked + .check:before {
        content: "\f14a";
        font-weight: 900;
        transform: scale(1);
    }
</style>
