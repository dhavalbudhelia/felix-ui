<template>
    <button type="button" :class="[classObject, cssClass]" :disabled="disabled" @click="emitClick">
        <template v-if="!iconOnly">
            <fe-icon v-if="iconBefore"
                  :class="iconClass"
                  :icon-pack="iconPackBefore"
                  :icon="iconBefore"
                  :size="size"
            ></fe-icon>
            <div class="mx-2"><slot></slot></div>
            <fe-icon v-if="iconAfter"
                  :class="iconClass"
                  :icon-pack="iconPackAfter"
                  :icon="iconAfter"
                  :size="size"
            ></fe-icon>
        </template>
        <fe-icon v-else :class="iconClass" :icon-pack="iconPack" :icon="icon" :size="size"></fe-icon>
    </button>
</template>

<script>
    import FeIcon from '@/components/Icon/Icon';
    import IconMixin from "@/mixins/IconMixin";
    import SizeMixin from "@/mixins/SizeMixin";
    import optionsDefaults from '@/utils/options';
    import CssClasses from "./CssClasses";

    export default {
        name: 'fe-button',
        components: {
            FeIcon,
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
             * class object
             */
            classObject() {
                let classes =  ['fe-button flex items-center', CssClasses.base];
                if (this.inverted) {
                    classes.push(CssClasses.inverted);
                } else if (this.plain) {
                    classes.push(CssClasses.plain);
                } else if (this.disabled) {
                    classes.push(CssClasses.disabled);
                } else {
                    classes.push(CssClasses.general);
                }
                classes.push(this.sizeClass);
                classes.push(this.colorClass);
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
             * color class object
             */
            colorClass() {
                let primary = `bg-${this.themeOptions.color.primary}`;
                let primaryDark = `bg-${this.themeOptions.color.primaryDark}`;
                if (this.inverted) {
                    primary = `bg-white`;
                    let darkInverted = `bg-${this.themeOptions.color.tertiaryDark}`;
                    primaryDark = `hover:${darkInverted} active:${darkInverted} focus:${darkInverted}`;
                } else if (this.plain) {
                    primary = `bg-white`;
                    primaryDark = `hover:bg-white active:bg-white focus:bg-white`;
                } else if (this.disabled) {
                    primary = `bg-${this.themeOptions.color.tertiary}`;
                    primaryDark = `bg-${this.themeOptions.color.tertiary}`;
                }
                return `${primary} hover:${primaryDark} active:${primaryDark} focus:${primaryDark}`;
            },
            /**
             * icon class object
             */
            iconClass() {
                return CssClasses.icon;
            },
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
