<template>
    <div class="fe-input-wrapper" :class="[controlClass, size]">
        <textarea v-if="type === 'textarea'" ref="textarea"
                  :class="[classObject, size]"
                  :placeholder="placeholder"
                  :value="computedValue"
                  :disabled="disabled"
                  @input="onInput"
                  @blur="onBlur"
                  @focus="onFocus"
        ></textarea>
        <template v-if="type === 'text'">
            <input ref="input"
                   :class="[classObject, size]"
                   :placeholder="placeholder"
                   type="text"
                   :value="computedValue"
                   :disabled="disabled"
                   :readonly="readonly"
                   @input="onInput"
                   @blur="onBlur"
                   @focus="onFocus">
            <span v-if="iconBefore" class="icon is-left">
                <Icon :icon-pack="iconPackBefore" :icon="iconBefore" :size="size"></Icon>
            </span>
            <span v-if="iconAfter" class="icon is-right">
                <Icon :icon-pack="iconPackAfter" :icon="iconAfter" :size="size"></Icon>
            </span>
        </template>
    </div>
</template>

<script>
    import Icon from '@/components/Icon/Icon.vue';
    import IconMixin from "@/mixins/IconMixin";
    import SizeMixin from "@/mixins/SizeMixin";

    export default {
        name: 'fe-input',
        components: {
            Icon,
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
        },
        data() {
            return {
                localValue: this.value
            }
        },
        computed: {
            /**
             * control class object
             */
            controlClass() {
                return {
                    'has-icon-before': this.iconBefore,
                    'has-icon-after': this.iconAfter,
                    'disabled': this.disabled,
                };
            },
            classObject() {
                return {
                    'fe-input': true,
                }
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
