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

<style scoped>
    /*size*/
    .is-xs {
        width: 36px;
        height: 18px;
    }
    .is-xs input[type=checkbox] + .check {
        height: 12px;
        width: 12px;
    }
    .is-xs input[type=checkbox]:checked + .check {
        -webkit-transform: translateX(18px);
        -ms-transform: translateX(18px);
        transform: translateX(18px);
    }

    .is-sm {
        width: 44px;
        height: 22px;
    }
    .is-sm input[type=checkbox] + .check {
        height: 16px;
        width: 16px;
    }
    .is-sm input[type=checkbox]:checked + .check {
        -webkit-transform: translateX(22px);
        -ms-transform: translateX(22px);
        transform: translateX(22px);
    }

    .is-md {
        width: 52px;
        height: 26px;
    }
    .is-md input[type=checkbox] + .check {
        height: 20px;
        width: 20px;
    }
    .is-md input[type=checkbox]:checked + .check {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .is-lg {
        width: 60px;
        height: 30px;
    }
    .is-lg input[type=checkbox] + .check {
        height: 24px;
        width: 24px;
    }
    .is-lg input[type=checkbox]:checked + .check {
        -webkit-transform: translateX(30px);
        -ms-transform: translateX(30px);
        transform: translateX(30px);
    }

    /*check*/
    .check {
        -webkit-transition: .3s;
        transition: .3s;
        left: 3px;
        top: 3px;
    }

    .check:before {
        content: "";
        -webkit-transition: .3s;
        transition: .3s;
    }
</style>
