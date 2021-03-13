<template>
  <div :class="[classObject, size]">
    <div :class="placeholderWrapperClassObject" @click="triggerFocused">
      <div :class="placeholderValueWrapperClassObject">
        <div v-if="formattedTime === ''"
             class="timepicker-input-placeholder px-2 text-gray-600"
        >{{ placeholder }}
        </div>
        <div class="timepicker-display-value px-2">{{ formattedTime }}</div>
        <input class="hidden" type="hidden" :id="id" :name="name" :value="formattedTime"/>
      </div>
      <div v-if="changed && clearable" @click.stop.prevent="clearValues" :class="clearClassObject">
        <fe-icon icon-pack="fas" icon="times" :size="size"></fe-icon>
      </div>
      <div :class="timePickerIconClassObject">
        <fe-icon :icon-pack="iconPack" :icon="icon" :size="size"></fe-icon>
      </div>
    </div>

    <div v-if="opened" @click.stop.prevent :class="timepickerClassObject">
      <div class="has-addons" :class="addonsClassObject">
        <div class="hours-selector" :class="hoursMinutesSecondsSelectorClassObject">
          <div class="hour-up" :class="upDownIconsClassObject" @click.prevent.stop="hourIncrement()">
            <fe-icon icon-pack="fas" icon="chevron-up" :size="size"></fe-icon>
          </div>
          <div class="hour" :class="formattedValueClassObject">{{ formattedHour }}</div>
          <div class="hour-down" :class="upDownIconsClassObject" @click.prevent.stop="hourDecrement()">
            <fe-icon icon-pack="fas" icon="chevron-down" :size="size"></fe-icon>
          </div>
        </div>

        <div :class="timeSeparatorClassObject">{{ separator }}</div>
        <div class="minutes-selector" :class="hoursMinutesSecondsSelectorClassObject">
          <div class="minute-up" :class="upDownIconsClassObject" @click.prevent.stop="minuteIncrement()">
            <fe-icon icon-pack="fas" icon="chevron-up" :size="size"></fe-icon>
          </div>
          <div class="minute" :class="formattedValueClassObject">{{ formattedMinute }}</div>
          <div class="minute-down" :class="upDownIconsClassObject" @click.prevent.stop="minuteDecrement()">
            <fe-icon icon-pack="fas" icon="chevron-down" :size="size"></fe-icon>
          </div>
        </div>

        <div v-if="showSeconds" :class="timeSeparatorClassObject">{{ separator }}</div>
        <div v-if="showSeconds" class="seconds-selector" :class="hoursMinutesSecondsSelectorClassObject">
          <div class="second-up" :class="upDownIconsClassObject" @click.prevent.stop="secondIncrement()">
            <fe-icon icon-pack="fas" icon="chevron-up" :size="size"></fe-icon>
          </div>
          <div class="second" :class="formattedValueClassObject">{{ formattedSecond }}</div>
          <div class="second-down" :class="upDownIconsClassObject" @click.prevent.stop="secondDecrement()">
            <fe-icon icon-pack="fas" icon="chevron-down" :size="size"></fe-icon>
          </div>
        </div>

        <div v-if="hourFormat === 12" :class="timeSeparatorClassObject"></div>
        <div v-if="hourFormat === 12" class="meridiem-selector" :class="meridiemSelectorClassObject"
             @click.prevent.stop="toggleMeridiem()">
          {{ meridiem }}
        </div>
      </div>
    </div>
    <div v-if="opened" @click="clickedOutside" :class="backdropClassObject"></div>
  </div>
</template>

<script>
import FeButton from '@/components/Button/Button.vue';
import FeIcon from '@/components/Icon/Icon.vue';
import FeInput from '@/components/Input/Input.vue';
import FeSelect from '@/components/Select/Select.vue';
import IconMixin from "@/mixins/IconMixin";
import SizeMixin from "@/mixins/SizeMixin";
import CssClasses from "./CssClasses";

export default {
  name: 'fe-timepicker',
  components: {
    FeButton,
    FeIcon,
    FeInput,
    FeSelect
  },
  mixins: [IconMixin, SizeMixin],
  emits: ['update:modelValue'],
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
    modelValue: {
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
    /**
     * timepicker wrapper class object
     */
    classObject() {
      let classes = ['fe-timepicker', CssClasses.base];
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.sizeXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.sizeSm);
          break;
        case 'is-md':
          classes.push(CssClasses.sizeMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.sizeLg);
          break;
        default:
          classes.push(CssClasses.sizeMd);
      }
      return classes;
    },
    /**
     * addons class object
     */
    addonsClassObject() {
      return ['flex justify-center items-center'];
    },
    /**
     * timepicker class object
     */
    timepickerClassObject() {
      return [CssClasses.timepicker, 'timepicker', 'timepicker-center-position', 'md:normal-position'];
    },
    /**
     * placeholder wrapper class object
     */
    placeholderWrapperClassObject() {
      let classes = ['timepicker-placeholder-wrapper', CssClasses.placeholderWrapper];
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.placeholderWrapperXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.placeholderWrapperSm);
          break;
        case 'is-md':
          classes.push(CssClasses.placeholderWrapperMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.placeholderWrapperLg);
          break;
        default:
          classes.push(CssClasses.placeholderWrapperMd);
      }
      return classes;
    },
    /**
     * placeholder value wrapper class object
     */
    placeholderValueWrapperClassObject() {
      return CssClasses.placeholderValueWrapper;
    },
    /**
     * clear icon class object
     */
    clearClassObject() {
      let classes = [CssClasses.clear];
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.clearXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.clearSm);
          break;
        case 'is-md':
          classes.push(CssClasses.clearMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.clearLg);
          break;
        default:
          classes.push(CssClasses.clearMd);
      }
      return classes;
    },
    /**
     * time separator class object
     */
    timeSeparatorClassObject() {
      return CssClasses.timeSeparator;
    },
    /**
     * selectors class object
     */
    hoursMinutesSecondsSelectorClassObject() {
      let classes = [CssClasses.hoursMinutesSecondsSelector];
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.hmsSelectorXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.hmsSelectorSm);
          break;
        case 'is-md':
          classes.push(CssClasses.hmsSelectorMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.hmsSelectorLg);
          break;
        default:
          classes.push(CssClasses.hmsSelectorMd);
      }
      return classes;
    },
    /**
     * formatted display value class object
     */
    formattedValueClassObject() {
      let classes = [];
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.formattedValueXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.formattedValueSm);
          break;
        case 'is-md':
          classes.push(CssClasses.formattedValueMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.formattedValueLg);
          break;
        default:
          classes.push(CssClasses.formattedValueMd);
      }
      return classes;
    },
    /**
     * chevron up and down class object
     */
    upDownIconsClassObject() {
      return CssClasses.upDownIcons;
    },
    /**
     * timepicker icon class object
     */
    timePickerIconClassObject() {
      let classes = [CssClasses.caret];
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.caretXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.caretSm);
          break;
        case 'is-md':
          classes.push(CssClasses.caretMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.caretLg);
          break;
        default:
          classes.push(CssClasses.caretMd);
      }
      return classes;
    },
    /**
     * backdrop class object
     */
    backdropClassObject() {
      return CssClasses.backdrop;
    },
    /**
     * meridiem class object
     */
    meridiemSelectorClassObject() {
      return CssClasses.meridiemSelector;
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
      return this.hour.toString().padStart(2, '0');
    },
    /**
     * padded minute value
     */
    formattedMinute() {
      return this.minute.toString().padStart(2, '0');
    },
    /**
     * padded second value
     */
    formattedSecond() {
      return this.second.toString().padStart(2, '0');
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
      this.$emit('update:modelValue', this.formattedTime);
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
      this.$emit('update:modelValue', this.formattedTime);
      this.changed = true;
    },
    /**
     * increment a minute value by one
     */
    minuteIncrement() {
      this.minute = (this.minute === 59) ? 0 : this.minute + 1;
      this.$emit('update:modelValue', this.formattedTime);
      this.changed = true;
    },
    /**
     * decrement a minute value by one
     */
    minuteDecrement() {
      this.minute = (this.minute === 0) ? 59 : this.minute - 1;
      this.$emit('update:modelValue', this.formattedTime);
      this.changed = true;
    },
    /**
     * increment a second value by one
     */
    secondIncrement() {
      this.second = (this.second === 59) ? 0 : this.second + 1;
      this.$emit('update:modelValue', this.formattedTime);
      this.changed = true;
    },
    /**
     * decrement a second value by one
     */
    secondDecrement() {
      this.second = (this.second === 0) ? 59 : this.second - 1;
      this.$emit('update:modelValue', this.formattedTime);
      this.changed = true;
    },
    /**
     * toggle meridiem value
     */
    toggleMeridiem() {
      this.meridiem = (this.meridiem === 'AM') ? 'PM' : 'AM';
      this.$emit('update:modelValue', this.formattedTime);
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
      this.$emit('update:modelValue', this.formattedTime);
      this.changed = false;
    },
    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside() {
      this.opened = false;
    },
    /**
     * decode initial value on mounted and initialise hour/minute/seconds/meridiem values
     */
    decodeValue() {
      let parts = this.modelValue.split(this.separator);
      if (this.modelValue !== '' && parts.length > 1) {
        this.hour = parseInt(parts[0]);
        if (parts.length === 3 && this.showSeconds) {
          this.minute = parseInt(parts[1]);
          let secondsAndMeridiem = parts[2].split(' ');
          this.second = (secondsAndMeridiem.length >= 1) ? parseInt(secondsAndMeridiem[0]) : this.second;
          this.meridiem = (secondsAndMeridiem.length === 2) ? secondsAndMeridiem[1].toUpperCase() : this.meridiem;
        } else if (parts.length === 2) {
          let minutedAndMeridiem = parts[1].split(' ');
          this.minute = (minutedAndMeridiem.length >= 1) ? parseInt(minutedAndMeridiem[0]) : this.minute;
          this.meridiem = (minutedAndMeridiem.length === 2) ? minutedAndMeridiem[1].toUpperCase() : this.meridiem;
        }
        if (Number.isNaN(this.hour)) {
          this.hour = this.hourFormat === 12 ? 1 : 0;
        } else {
          this.hour = (this.hourFormat === 12 && this.hour > 12) ? 12 : this.hour;
          this.hour = (this.hourFormat === 24 && this.hour > 23) ? 23 : this.hour;
          this.hour = (this.hour < 1 && this.hourFormat === 12) ? 1 : this.hour;
          this.hour = (this.hour < 0 && this.hourFormat === 24) ? 0 : this.hour;
        }
        if (Number.isNaN(this.minute)) {
          this.minute = 0;
        } else {
          this.minute = (this.minute > 59) ? 59 : this.minute;
          this.minute = (this.minute < 1) ? 0 : this.minute;
        }

        if (Number.isNaN(this.second)) {
          this.second = 0;
        } else {
          this.second = (this.second > 59) ? 59 : this.second;
          this.second = (this.second < 0) ? 0 : this.second;
        }

        if (this.meridiem !== 'AM' && this.meridiem !== 'PM') {
          this.meridiem = this.hourFormat === 12 ? 'AM' : null;
        }
      } else {
        this.$emit('update:modelValue', this.formattedTime);
      }
    },
  },
  mounted() {
    this.decodeValue();
  },
}
</script>

<style scoped>
.timepicker {
  min-width: 8rem;
}

.timepicker-input-placeholder, .timepicker-display-value {
  font-variant-numeric: tabular-nums;
}

.fe-timepicker .hour, .fe-timepicker .minute, .fe-timepicker .second {
  font-variant-numeric: tabular-nums;
}

@media (min-width: 768px) {
  .fe-timepicker .md\:normal-position {
    position: absolute;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    -webkit-transform: none;
    transform: none;
  }
}

.timepicker-center-position {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

</style>
