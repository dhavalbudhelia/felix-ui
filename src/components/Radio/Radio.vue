<template>
    <label :class="[classObject, size]"
           ref="label"
           :disabled="disabled"
           :tabindex="disabled ? false : 0"
           @keydown.prevent.enter.space="$refs.label.click()">
        <input v-model="computedValue"
               type="radio"
               :disabled="disabled"
               :name="name"
               :value="localValue"/>
        <span class="check"></span>
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
    import SizeMixin from "@/mixins/SizeMixin";

    export default {
        name: 'fe-radio',
        mixins: [SizeMixin],
        props: {
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
            name: {
                type: String,
                required: false,
            },
            vertical: {
                type: Boolean,
                required: false,
                default: false
            }
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
                return {
                    'fe-radio': true,
                    'is-vertical': this.vertical,
                }
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
