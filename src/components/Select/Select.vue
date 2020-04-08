<template>
    <div :class="[classObject, size, cssClass]">
        <select v-model="computedValue"
                :class="selectClass"
                ref="select"
                v-bind="$attrs"
        >
            <option v-if="placeholder && (computedValue === null || computedValue === '')"
                    :value="computedValue"
                    selected
                    disabled
                    hidden
            >{{ placeholder }}
            </option>

            <option v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                    :class="optionClass"
            >{{ option.label }}
            </option>
        </select>
        <fe-icon v-if="icon"
              :class="iconClass"
              :icon="icon"
              :icon-pack="iconPack"
              :size="size"
        ></fe-icon>
        <fe-icon icon="chevron-down" icon-pack="fas" :size="size" :class="caretClass"></fe-icon>
    </div>
</template>

<script>
    import FeIcon from "../Icon/Icon";
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-select',
        components: {
            FeIcon
        },
        mixins: [SizeMixin],
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array],
                required: false,
                default: null
            },
            options: {
                type: Array
            },
            placeholder: {
                type: String,
            },
            icon: {
                type: String,
            },
            iconPack: {
                type: String,
            },
            expanded: {
                type: Boolean,
                default: false
            },
            cssClass: {
                type: String,
                required: false,
                default: ''
            },
            color: {
                type: String,
                required: false,
                default: '',
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
                selectedValue: this.value,
            };
        },
        computed: {
            computedValue: {
                get() {
                    return this.selectedValue;
                },
                set(newValue) {
                    this.selectedValue = newValue;
                    this.$emit('input', newValue);
                }
            },
            /**
             * class object
             */
            classObject() {
                let classes = ['fe-select', CssClasses.base];
                if (this.$attrs.disabled !== undefined) {
                } else {
                    classes.push(CssClasses.general);
                }
                if (this.expanded) {
                    classes.push('w-full');
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
             * select class object
             */
            selectClass() {
                let classes = ['select'];
                if (this.$attrs.disabled !== undefined) {
                    classes.push(CssClasses.disabled);
                } else {
                    classes.push(CssClasses.select);
                }
                if (this.expanded) {
                    classes.push('w-full');
                }
                if (this.icon) {
                    classes.push('pl-8');
                }
                return classes;
            },
            /**
             * option class object
             */
            optionClass() {
                if (this.$attrs.disabled !== undefined) {
                    return CssClasses.option;
                } else {
                    return '';
                }
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
            caretClass() {
                let color = this.color !== '' ? this.color : `text-${this.themeOptions.color.primary}`;
                return [CssClasses.caret, color];
            },
        },
        watch: {
            /**
             * When v-model change, set internal value.
             */
            value(value) {
                this.selectedValue = value;
            },
        }
    }
</script>

<style scoped>
    .is-xs select {
        @apply pr-6;
    }

    .is-sm select {
        @apply pr-6;
    }

    .is-md select {
        @apply pr-8;
    }

    .is-lg select {
        @apply pr-10;
    }
</style>
