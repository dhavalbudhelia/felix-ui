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
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div :class="timePickerIconClassObject">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <div v-if="opened" @click.stop.prevent :class="timepickerClassObject">
      <div class="has-addons" :class="addonsClassObject">
        <div class="hours-selector" :class="hoursMinutesSecondsSelectorClassObject">
          <div class="hour-up" :class="upDownIconsClassObject" @click.prevent.stop="hourIncrement()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <div class="hour" :class="formattedValueClassObject">{{ formattedHour }}</div>
          <div class="hour-down" :class="upDownIconsClassObject" @click.prevent.stop="hourDecrement()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div :class="timeSeparatorClassObject">{{ separator }}</div>
        <div class="minutes-selector" :class="hoursMinutesSecondsSelectorClassObject">
          <div class="minute-up" :class="upDownIconsClassObject" @click.prevent.stop="minuteIncrement()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <div class="minute" :class="formattedValueClassObject">{{ formattedMinute }}</div>
          <div class="minute-down" :class="upDownIconsClassObject" @click.prevent.stop="minuteDecrement()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div v-if="showSeconds" :class="timeSeparatorClassObject">{{ separator }}</div>
        <div v-if="showSeconds" class="seconds-selector" :class="hoursMinutesSecondsSelectorClassObject">
          <div class="second-up" :class="upDownIconsClassObject" @click.prevent.stop="secondIncrement()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <div class="second" :class="formattedValueClassObject">{{ formattedSecond }}</div>
          <div class="second-down" :class="upDownIconsClassObject" @click.prevent.stop="secondDecrement()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
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

<script lang="ts">
import {defineComponent,ref, onMounted, computed} from "vue";

export default defineComponent({
  name: 'FeTimepicker',
  emits: ['update:modelValue'],
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Select a time',
    },
    hourFormat: {
      type: Number,
      default: 12,
      validator: function (value: number) {
        return [12, 24].includes(value);
      },
    },
    separator: {
      type: String,
      default: ':',
    },
    showSeconds: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'is-md',
      validator: function (value: string) {
        return ['is-xs', 'is-sm', 'is-md', 'is-lg'].includes(value);
      },
    },
  },
  setup(props, {emit}) {
    const hour = ref(1);
    const minute = ref(0);
    const second = ref(0);
    const meridiem = ref(props.hourFormat === 12 ? 'AM' : null);
    const opened = ref(false);
    const changed = ref(false);

    onMounted(() => {
      hour.value = props.hourFormat === 12 ? 1 : 0
      decodeValue();
    });

    /**
     * timepicker wrapper class object
     */
    const classObject = computed(() => {
      let classes = ['fe-timepicker outline-none leading-normal block'];
      switch (props.size) {
        case 'is-xs':
          classes.push('w-32');
          break;
        case 'is-sm':
          classes.push('w-40');
          break;
        case 'is-md':
          classes.push('w-48');
          break;
        case 'is-lg':
          classes.push('w-56');
          break;
        default:
          classes.push('w-48');
      }
      return classes;
    });

    /**
     * addons class object
     */
    const addonsClassObject = computed(() => {
      return ['flex justify-center items-center'];
    });

    /**
     * timepicker class object
     */
    const timepickerClassObject = computed(() => {
      return [
        'p-2 px-4 select-none z-20 mt-1 bg-white rounded border border-gray-400 shadow',
        'timepicker',
        'timepicker-center-position',
        'md:normal-position'
      ];
    });

    /**
     * placeholder wrapper class object
     */
    const placeholderWrapperClassObject = computed(() => {
      let classes = ['timepicker-placeholder-wrapper border rounded flex flex-nowrap items-center cursor-pointer border-gray-400 hover:border-gray-500'];
      switch (props.size) {
        case 'is-xs':
          classes.push('h-6 text-xs');
          break;
        case 'is-sm':
          classes.push('h-6 text-sm');
          break;
        case 'is-md':
          classes.push('h-8 text-base');
          break;
        case 'is-lg':
          classes.push('h-10 text-lg');
          break;
        default:
          classes.push('h-8 text-base');
      }
      return classes;
    });

    /**
     * placeholder value wrapper class object
     */
    const placeholderValueWrapperClassObject = computed(() => {
      return 'flex-1 appearance-none outline-none flex flex-nowrap items-center';
    });

    /**
     * clear icon class object
     */
    const clearClassObject = computed(() => {
      let classes = ['flex items-center justify-center cursor-pointer h-full text-gray-500 hover:text-gray-600'];
      switch (props.size) {
        case 'is-xs':
          classes.push('w-4');
          break;
        case 'is-sm':
          classes.push('w-5');
          break;
        case 'is-md':
          classes.push('w-6');
          break;
        case 'is-lg':
          classes.push('w-8');
          break;
        default:
          classes.push('w-6');
      }
      return classes;
    });

    /**
     * time separator class object
     */
    const timeSeparatorClassObject = computed(() => {
      return 'px-2 font-bold text-lg text-gray-500';
    });

    /**
     * selectors class object
     */
    const hoursMinutesSecondsSelectorClassObject = computed(() => {
      let classes = ['flex flex-col font-bold'];
      switch (props.size) {
        case 'is-xs':
          classes.push('px-0 text-sm');
          break;
        case 'is-sm':
          classes.push('px-1 text-base');
          break;
        case 'is-md':
          classes.push('px-2 text-lg');
          break;
        case 'is-lg':
          classes.push('px-3 text-xl');
          break;
        default:
          classes.push('px-2 text-lg');
      }
      return classes;
    });

    /**
     * formatted display value class object
     */
    const formattedValueClassObject = computed(() => {
      let classes = ['py-1'];
      switch (props.size) {
        case 'is-xs':
          classes.push('py-0');
          break;
        case 'is-sm':
          classes.push('py-0');
          break;
        case 'is-lg':
          classes.push('py-2');
          break;
      }
      return classes;
    });

    /**
     * chevron up and down class object
     */
    const upDownIconsClassObject = computed(() => {
      return 'text-gray-500 text-center hover:text-gray-800 hover:cursor-pointer';
    });

    /**
     * timepicker icon class object
     */
    const timePickerIconClassObject = computed(() => {
      let classes = ['flex items-center justify-center border-l border-gray-300 h-full'];
      switch (props.size) {
        case 'is-xs':
          classes.push('w-5');
          break;
        case 'is-sm':
          classes.push('w-6');
          break;
        case 'is-md':
          classes.push('w-8');
          break;
        case 'is-lg':
          classes.push('w-10');
          break;
        default:
          classes.push('w-8');
      }
      return classes;
    });

    /**
     * backdrop class object
     */
    const backdropClassObject = computed(() => {
      return 'fixed w-full h-full top-0 left-0 z-10 md:bg-white md:opacity-0 bg-black opacity-75';
    });

    /**
     * meridiem class object
     */
    const meridiemSelectorClassObject = computed(() => {
      return 'inline-block border rounded outline-none select-none font-bold text-right p-1 w-10 tracking-widest hover:bg-gray-200 hover:cursor-pointer';
    });

    /**
     * computed prop to display formatted time string
     */
    const formattedTime = computed(() => {
      let formattedTimeString = '';
      if (hour.value !== null && minute.value !== null) {
        formattedTimeString = `${formattedHour.value}${props.separator}${formattedMinute.value}`;
        if (props.showSeconds && second.value !== null) {
          formattedTimeString = `${formattedTimeString}${props.separator}${formattedSecond.value}`;
        }
        if (props.hourFormat === 12 && meridiem.value !== null) {
          formattedTimeString = `${formattedTimeString} ${meridiem.value}`;
        }
      }
      return formattedTimeString;
    });

    /**
     * padded hour value
     */
    const formattedHour = computed(() => {
      return hour.value.toString().padStart(2, '0');
    });

    /**
     * padded minute value
     */
    const formattedMinute = computed(() => {
      return minute.value.toString().padStart(2, '0');
    });

    /**
     * padded second value
     */
    const formattedSecond = computed(() => {
      return second.value.toString().padStart(2, '0');
    });

    /**
     * open timepicker on trigger focused
     */
    const triggerFocused = () => {
      opened.value = true;
    };

    /**
     * increment an hour value by one
     */
    const hourIncrement = () => {
      if (props.hourFormat === 12) {
        hour.value = (hour.value === 12) ? 1 : (hour.value + 1);
      } else {
        hour.value = (hour.value === 23) ? 0 : (hour.value + 1);
      }
      emit('update:modelValue', formattedTime.value);
      changed.value = true;
    };

    /**
     * decrement an hour value by one
     */
    const hourDecrement = () => {
      if (props.hourFormat === 12) {
        hour.value = (hour.value === 1) ? 12 : (hour.value - 1);
      } else {
        hour.value = (hour.value === 0) ? 23 : (hour.value - 1);
      }
      emit('update:modelValue', formattedTime.value);
      changed.value = true;
    };

    /**
     * increment a minute value by one
     */
    const minuteIncrement = () => {
      minute.value = (minute.value === 59) ? 0 : minute.value + 1;
      emit('update:modelValue', formattedTime.value);
      changed.value = true;
    };

    /**
     * decrement a minute value by one
     */
    const minuteDecrement = () => {
      minute.value = (minute.value === 0) ? 59 : minute.value - 1;
      emit('update:modelValue', formattedTime.value);
      changed.value = true;
    };

    /**
     * increment a second value by one
     */
    const secondIncrement = () => {
      second.value = (second.value === 59) ? 0 : second.value + 1;
      emit('update:modelValue', formattedTime.value);
      changed.value = true;
    };

    /**
     * decrement a second value by one
     */
    const secondDecrement = () => {
      second.value = (second.value === 0) ? 59 : second.value - 1;
      emit('update:modelValue', formattedTime.value);
      changed.value = true;
    };

    /**
     * toggle meridiem value
     */
    const toggleMeridiem = () => {
      meridiem.value = (meridiem.value === 'AM') ? 'PM' : 'AM';
      emit('update:modelValue', formattedTime.value);
      changed.value = true;
    };

    /**
     * on clear set hour, minute, second and meridiem values to their default
     */
    const clearValues = () => {
      hour.value = (props.hourFormat === 12) ? 1 : 0;
      minute.value = 0;
      second.value = 0;
      meridiem.value = (props.hourFormat === 12) ? 'AM' : '';
      emit('update:modelValue', formattedTime.value);
      changed.value = false;
    };

    /**
     * Close dropdown if clicked outside.
     */
    const clickedOutside = () => {
      opened.value = false;
    };

    /**
     * decode initial value on mounted and initialise hour/minute/seconds/meridiem values
     */
    const decodeValue = () => {
      let parts = props.modelValue.split(props.separator);
      if (props.modelValue !== '' && parts.length > 1) {
        hour.value = parseInt(parts[0]);
        if (parts.length === 3 && props.showSeconds) {
          minute.value = parseInt(parts[1]);
          let secondsAndMeridiem = parts[2].split(' ');
          second.value = (secondsAndMeridiem.length >= 1) ? parseInt(secondsAndMeridiem[0]) : second.value;
          meridiem.value = (secondsAndMeridiem.length === 2) ? secondsAndMeridiem[1].toUpperCase() : meridiem.value;
        } else if (parts.length === 2) {
          let minutedAndMeridiem = parts[1].split(' ');
          minute.value = (minutedAndMeridiem.length >= 1) ? parseInt(minutedAndMeridiem[0]) : minute.value;
          meridiem.value = (minutedAndMeridiem.length === 2) ? minutedAndMeridiem[1].toUpperCase() : meridiem.value;
        }
        if (Number.isNaN(hour.value)) {
          hour.value = props.hourFormat === 12 ? 1 : 0;
        } else {
          hour.value = (props.hourFormat === 12 && hour.value > 12) ? 12 : hour.value;
          hour.value = (props.hourFormat === 24 && hour.value > 23) ? 23 : hour.value;
          hour.value = (hour.value < 1 && props.hourFormat === 12) ? 1 : hour.value;
          hour.value = (hour.value < 0 && props.hourFormat === 24) ? 0 : hour.value;
        }
        if (Number.isNaN(minute.value)) {
          minute.value = 0;
        } else {
          minute.value = (minute.value > 59) ? 59 : minute.value;
          minute.value = (minute.value < 1) ? 0 : minute.value;
        }

        if (Number.isNaN(second.value)) {
          second.value = 0;
        } else {
          second.value = (second.value > 59) ? 59 : second.value;
          second.value = (second.value < 0) ? 0 : second.value;
        }

        if (meridiem.value !== 'AM' && meridiem.value !== 'PM') {
          meridiem.value = props.hourFormat === 12 ? 'AM' : '';
        }
      } else {
        emit('update:modelValue', formattedTime.value);
      }
    };

    return {
      hour,
      minute,
      second,
      meridiem,
      opened,
      changed,
      classObject,
      addonsClassObject,
      timepickerClassObject,
      placeholderWrapperClassObject,
      placeholderValueWrapperClassObject,
      clearClassObject,
      timeSeparatorClassObject,
      hoursMinutesSecondsSelectorClassObject,
      formattedValueClassObject,
      upDownIconsClassObject,
      timePickerIconClassObject,
      backdropClassObject,
      meridiemSelectorClassObject,
      formattedTime,
      formattedHour,
      formattedMinute,
      formattedSecond,
      triggerFocused,
      hourIncrement,
      hourDecrement,
      minuteIncrement,
      minuteDecrement,
      secondIncrement,
      secondDecrement,
      toggleMeridiem,
      clearValues,
      clickedOutside,
      decodeValue,
    }
  },
})
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
