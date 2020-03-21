<template>
    <label :class="[classObject, size]"
           ref="label"
           :disabled="disabled"
           :tabindex="disabled ? false : 0"
           @keydown.prevent.enter.space="$refs.label.click()">
        <input v-model="computedValue"
               type="checkbox"
               :disabled="disabled"
               :name="name"
               :value="localValue"
               :true-value="trueValue"
               :false-value="falseValue">
        <span class="check"></span>
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
    import SizeMixin from "@/mixins/SizeMixin";

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
                return {
                    'fe-checkbox': true
                }
            },
        },
    }
</script>
