<template>
    <div :class="[classObject, size]">
        <div class="timepicker-input-wrapper" @click="triggerFocused">
            <div class="input-value-wrapper">
                <div v-if="formattedTime === ''" class="timepicker-input-placeholder">
                    {{ placeholder }}
                </div>
                <div class="timepicker-display-value">{{ formattedTime }}</div>
                <input type="hidden" :id="id" :value="formattedTime"></input>
            </div>
            <div v-if="changed && clearable" @click.stop.prevent="clearValues" class="timepicker-clear">
                <fe-icon icon-pack="fas" icon="times" :size="size"></fe-icon>
            </div>
            <div class="timepicker-icon">
                <fe-icon :icon-pack="iconPack" :icon="icon" :size="size"></fe-icon>
            </div>
        </div>

        <div v-if="opened" @click.stop.prevent :class="timepickerClassObject">
            <div class="header-control fe-field has-addons">

                <div class="hours-selector">
                    <div class="hour-up" @click.prevent.stop="hourIncrement()">
                        <fe-icon icon-pack="fas" icon="chevron-up" :size="size"></fe-icon>
                    </div>
                    <div class="hour">{{ formattedHour }}</div>
                    <div class="hour-down" @click.prevent.stop="hourDecrement()">
                        <fe-icon icon-pack="fas" icon="chevron-down" :size="size"></fe-icon>
                    </div>
                </div>

                <div class="time-separator">{{ separator }}</div>
                <div class="minutes-selector">
                    <div class="minute-up" @click.prevent.stop="minuteIncrement()">
                        <fe-icon icon-pack="fas" icon="chevron-up" :size="size"></fe-icon>
                    </div>
                    <div class="minute">{{ formattedMinute }}</div>
                    <div class="minute-down" @click.prevent.stop="minuteDecrement()">
                        <fe-icon icon-pack="fas" icon="chevron-down" :size="size"></fe-icon>
                    </div>
                </div>

                <div v-if="showSeconds" class="time-separator">{{ separator }}</div>
                <div v-if="showSeconds" class="seconds-selector">
                    <div class="second-up" @click.prevent.stop="secondIncrement()">
                        <fe-icon icon-pack="fas" icon="chevron-up" :size="size"></fe-icon>
                    </div>
                    <div class="second">{{ formattedSecond }}</div>
                    <div class="second-down" @click.prevent.stop="secondDecrement()">
                        <fe-icon icon-pack="fas" icon="chevron-down" :size="size"></fe-icon>
                    </div>
                </div>

                <div v-if="hourFormat === 12" class="time-separator"></div>
                <div v-if="hourFormat === 12" class="meridiem-selector" @click.prevent.stop="toggleMeridiem()">
                    {{ meridiem }}
                </div>
            </div>
        </div>
        <div v-if="opened" @click="clickedOutside" class="mobile-device-backdrop gray-backdrop md:white-backdrop"></div>
    </div>
</template>

<script>
    import FeButton from '@/components/Button/Button.vue';
    import FeIcon from '@/components/Icon/Icon.vue';
    import FeInput from '@/components/Input/Input.vue';
    import FeSelect from '@/components/Select/Select.vue';
    import IconMixin from "@/mixins/IconMixin";
    import SizeMixin from "@/mixins/SizeMixin";

    export default {
        name: 'fe-timepicker',
        components: {
            FeButton,
            FeIcon,
            FeInput,
            FeSelect
        },
        mixins: [IconMixin, SizeMixin],
        props: {
            id: {
                type: String,
                required: false,
                default: ''
            },
            value: {
                type: String,
                required: false,
                default: '',
            },
            placeholder: {
                type: String,
                required: false,
                default: 'Select a time',
            },
            hourFormat: {
                type: Number,
                required: false,
                default: 12,
                validator: function (value) {
                    return [12, 24].includes(value);
                },
            },
            separator: {
                type: String,
                required: false,
                default: ':',
            },
            showSeconds: {
                type: Boolean,
                required: false,
                default: false,
            },
            clearable: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        data() {
            return {
                hour: this.hourFormat === 12 ? 1 : 0,
                minute: 0,
                second: 0,
                meridiem: this.hourFormat === 12 ? 'AM' : null,
                opened: false,
                changed: false,
            }
        },
        computed: {
            classObject() {
                return {
                    'fe-timepicker': true,
                }
            },
            /**
             * computed prop to display formatted time string
             */
            formattedTime() {
                let formattedTimeString = '';
                if (this.hour !== null && this.minute !== null) {
                    formattedTimeString = `${this.formattedHour}${this.separator}${this.formattedMinute}`;
                    if (this.showSeconds && this.second !== null) {
                        formattedTimeString = `${formattedTimeString}${this.separator}${this.formattedSecond}`;
                    }
                    if (this.hourFormat === 12 && this.meridiem !== null) {
                        formattedTimeString = `${formattedTimeString} ${this.meridiem}`;
                    }
                }
                return formattedTimeString;
            },
            /**
             * padded hour value
             */
            formattedHour() {
                return this._.padStart(this.hour, 2, 0);
            },
            /**
             * padded minute value
             */
            formattedMinute() {
                return this._.padStart(this.minute, 2, 0);
            },
            /**
             * padded second value
             */
            formattedSecond() {
                return this._.padStart(this.second, 2, 0);
            },
            /**
             * timepicker class object
             */
            timepickerClassObject() {
                return {
                    'timepicker': true,
                    'center-position': true,
                    'md:normal-position': true,
                    'opened': true,
                }
            },
        },
        methods: {
            /**
             * open timepicker on trigger focused
             */
            triggerFocused() {
                this.opened = true;
            },
            /**
             * increment an hour value by one
             */
            hourIncrement() {
                if (this.hourFormat === 12) {
                    this.hour = (this.hour === 12) ? 1 : (this.hour + 1);
                } else {
                    this.hour = (this.hour === 23) ? 0 : (this.hour + 1);
                }
                this.changed = true;
            },
            /**
             * decrement an hour value by one
             */
            hourDecrement() {
                if (this.hourFormat === 12) {
                    this.hour = (this.hour === 1) ? 12 : (this.hour - 1);
                } else {
                    this.hour = (this.hour === 0) ? 23 : (this.hour - 1);
                }
                this.changed = true;
            },
            /**
             * increment a minute value by one
             */
            minuteIncrement() {
                this.minute = (this.minute === 59) ? 0 : this.minute + 1;
                this.changed = true;
            },
            /**
             * decrement a minute value by one
             */
            minuteDecrement() {
                this.minute = (this.minute === 0) ? 59 : this.minute - 1;
                this.changed = true;
            },
            /**
             * increment a second value by one
             */
            secondIncrement() {
                this.second = (this.second === 59) ? 0 : this.second + 1;
                this.changed = true;
            },
            /**
             * decrement a second value by one
             */
            secondDecrement() {
                this.second = (this.second === 0) ? 59 : this.second - 1;
                this.changed = true;
            },
            /**
             * toggle meridiem value
             */
            toggleMeridiem() {
                this.meridiem = (this.meridiem === 'AM') ? 'PM' : 'AM';
                this.changed = true;
            },
            /**
             * on clear set hour, minute, second and meridiem values to their default
             */
            clearValues() {
                this.hour = (this.hourFormat === 12) ? 1 : 0;
                this.minute = 0;
                this.second = 0;
                this.meridiem = (this.hourFormat === 12) ? 'AM' : null;
                this.changed = false;
            },
            /**
             * Close dropdown if clicked outside.
             */
            clickedOutside() {
                this.opened = false;
            },
        },
    }
</script>
