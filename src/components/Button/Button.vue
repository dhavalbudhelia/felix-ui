<template>
    <button type="button" :class="[classObject, size, cssClass]" :disabled="disabled" @click="emitClick">
        <template v-if="!iconOnly">
            <span v-if="iconBefore" class="icon">
                <Icon :icon-pack="iconPackBefore" :icon="iconBefore" :size="size"></Icon>
            </span>
            <span><slot></slot></span>
            <span v-if="iconAfter" class="icon">
                <Icon :icon-pack="iconPackAfter" :icon="iconAfter" :size="size"></Icon>
            </span>
        </template>
        <template v-else>
            <span class="icon">
                <Icon :icon-pack="iconPack" :icon="icon" :size="size"></Icon>
            </span>
        </template>
    </button>
</template>

<script>
    import Icon from '@/components/Icon/Icon';
    import IconMixin from "@/mixins/IconMixin";
    import SizeMixin from "@/mixins/SizeMixin";

    export default {
        name: 'fe-button',
        components: {
            Icon,
        },
        mixins: [IconMixin, SizeMixin],
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            inverted: {
                type: Boolean,
                default: false,
            },
            plain: {
                type: Boolean,
                default: false,
            },
            cssClass: {
                type: String,
                required: false,
                default: ''
            }
        },
        computed: {
            /**
             * class object
             */
            classObject() {
                return {
                    'fe-button': true,
                    'inverted': this.inverted,
                    'plain': this.plain,
                };
            }
        },
        methods: {
            /**
             * emit client event
             * @param event
             */
            emitClick(event) {
                this.$emit('click', event);
            }
        }
    }
</script>
