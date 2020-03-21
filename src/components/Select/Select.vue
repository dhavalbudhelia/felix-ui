<template>
    <div :class="[classObject, size, cssClass]">
        <select v-model="computedValue"
                class="select"
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
            >{{ option.label }}
            </option>
        </select>
        <div v-if="icon" class="icon is-left">
            <Icon :icon="icon" :icon-pack="iconPack" :size="size"></Icon>
        </div>
    </div>
</template>

<script>
    import Icon from "../Icon/Icon";
    import SizeMixin from "@/mixins/SizeMixin";

    export default {
        name: 'fe-select',
        components: {Icon},
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
            }
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
            classObject() {
                return {
                    'fe-select': true,
                    'is-full-width': this.expanded,
                    'has-icon-before': this.icon,
                };
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
