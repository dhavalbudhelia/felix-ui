<template>
    <label :class="[classObject, size, cssClass]"
           ref="label"
           :disabled="disabled"
           :tabindex="disabled ? false : 0"
           @keydown.prevent.enter.space="$refs.label.click()">
        <input v-model="computedValue"
               :id="id"
               :name="name"
               type="radio"
               :disabled="disabled"
               :class="inputClass"
               :value="localValue"/>
        <span :class="[checkClass, checkColorClass]"></span>
        <span class="control-label pl-2"><slot/></span>
    </label>
</template>

<script>
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-radio',
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
                type: [String, Number, Object],
                required: true,
            },
            localValue: {
                type: [String, Number, Object],
                required: true,
            },
            disabled: {
                type: Boolean,
                required: false,
                'default': false,
            },
            vertical: {
                type: Boolean,
                required: false,
                default: false
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
        data() {
            return {
                newValue: this.value
            };
        },
        computed: {
            /**
             * set local value on change of the input
             */
            computedValue: {
                get() {
                    return this.newValue;
                },
                set(value) {
                    this.newValue = value;
                    this.$emit('input', value);
                }
            },
            /**
             * class names object
             */
            classObject() {
                let classes = ['fe-radio flex items-center', CssClasses.base];
                if (this.disabled) {
                    classes.push(CssClasses.disabled);
                }
                if (this.vertical) {
                    classes.push(CssClasses.vertical);
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
             */
            checkClass() {
                let color = '';
                if (this.localValue) {
                    color = this.checkColorClass !== '' ? this.checkColorClass : `border-${this.themeOptions.color.primary}`;
                }
                return ['check', CssClasses.check, color];
            },
            /**
             * input class object
             * @return {string[]}
             */
            inputClass() {
                return [CssClasses.input];
            },
        },
        watch: {
            /**
             * When v-model change, set internal value.
             */
            value(value) {
                this.newValue = value;
                this.$emit('input', value);
            },
        }
    };
</script>

<style scoped>
    /*size*/
    .is-xs input[type=radio] + .check {
        width: 14px;
        height: 14px;
    }

    .is-xs input[type=radio]:checked + .check {
        border-width: 4px;
    }

    .is-sm input[type=radio] + .check {
        width: 16px;
        height: 16px;
    }

    .is-sm input[type=radio]:checked + .check {
        border-width: 5px;
    }

    .is-md input[type=radio] + .check {
        width: 18px;
        height: 18px;
    }

    .is-md input[type=radio]:checked + .check {
        border-width: 6px;
    }

    .is-lg input[type=radio] + .check {
        width: 20px;
        height: 20px;
    }

    .is-lg input[type=radio]:checked + .check {
        border-width: 7px;
    }

    /*check*/
    .check {
        transition: border-width .15s ease-out;
    }

    .check:before {
        content: "";
        border: none;
        transform: scale(0);
        transition: border-width .15s ease-out;
    }

    input[type=radio]:checked + .check:before {
        transform: scale(1);
    }
</style>
