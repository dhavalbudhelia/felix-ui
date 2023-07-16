<template>
  <div :class="[datepickerClassObject]">
    <div class="week-label-container flex">
      <div v-for="dayName in dayNames" :class="weekLabelClassObject">{{ dayName }}</div>
    </div>
    <div v-for="days in weeks" class="flex day-container">
      <div v-for="(day, key) in days"
           :key="key"
           @click="emitSelect(day)"
           :class="dayClassObject(day)"
      >{{ day.date.format('D') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, inject} from "vue";
import dayjs from 'dayjs';

export default defineComponent({
  name: 'FeDatepickerRow',
  emits: ['select'],
  props: {
    weeks: {
      type: Array,
      default: () => [],
    },
    dayNames: {
      type: Array,
      required: false,
    },
    selectedDay: {
      type: Object,
      default: () => {},
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
    const $theme = inject('$theme');

    const datepickerClassObject = computed(() => {
      return ['datepicker w-full bg-white', props.size];
    });

    const weekLabelClassObject = computed(() => {
      let classes = ['week-label font-medium flex-1 text-center align-middle'];
      switch (props.size) {
        case 'is-xs':
          classes.push('text-xs py-1 px-2');
          break;
        case 'is-sm':
          classes.push('text-sm py-1 px-2');
          break;
        case 'is-md':
          classes.push('text-base py-2 px-3');
          break;
        case 'is-lg':
          classes.push('text-lg py-2 px-3');
          break;
        default:
          classes.push('text-base py-2 px-3');
      }
      return classes;
    });

    /**
     * check if the supplied day is selected
     */
    const isDaySelected = (day) => {
      return props.selectedDay !== null && day.date.isSame(props.selectedDay.date.format('YYYY-MM-DD'));
    };

    /**
     * check if the supplied day is today
     */
    const isDayIsToday = (day) => {
      return day.date.isSame(dayjs().format('YYYY-MM-DD'));
    };

    /**
     * class object
     * @param day
     */
    const dayClassObject = (day) => {
      let classes = ['day font-thin border rounded-full flex-1 text-center align-middle'];
      if (day.previous) {
        classes.push('previous');
      }
      if (day.following) {
        classes.push('following');
      }
      if (day.unselectable) {
        classes.push('unselectable');
        if (!isDaySelected(day)) {
          classes.push('text-gray-500');
        }
      }
      if (isDaySelected(day)) {
        classes.push('selected');
        classes.push('text-white cursor-pointer border-blue-600');
        let primary = `bg-${$theme.color.primary} border-${$theme.color.primary}`;
        classes.push(primary);
      } else if (isDayIsToday(day)) {
        classes.push('today');
      } else {
        classes.push('border-white');
      }
      classes.push(hoverClassObject(day));
      switch (props.size) {
        case 'is-xs':
          classes.push('text-xs py-1 px-2');
          break;
        case 'is-sm':
          classes.push('text-sm py-1 px-2');
          break;
        case 'is-md':
          classes.push('text-base py-2 px-3');
          break;
        case 'is-lg':
          classes.push('text-lg py-2 px-3');
          break;
        default:
          classes.push('text-base py-2 px-3');
      }
      return classes;
    };

    /**
     * return hover classes for supplied day
     */
    const hoverClassObject = (day) => {
      let classes = '';
      if (!isDaySelected(day) && !day.unselectable && !isDayIsToday(day)) {
        classes = 'hover:bg-gray-300 hover:cursor-pointer hover:border-gray-300';
      } else if (isDayIsToday(day) && !isDaySelected(day)) {
        classes = `border-${$theme.color.primary}`;
        if (!day.unselectable) {
          classes = classes + ' hover:bg-gray-300 hover:cursor-pointer';
        }
      }
      return classes;
    };

    /**
     * emit select day event to the parent component
     * @param day
     */
    const emitSelect = (day) => {
      if (!day.unselectable) {
        emit('select', day);
      }
    };


    return {
      datepickerClassObject,
      weekLabelClassObject,
      isDaySelected,
      isDayIsToday,
      dayClassObject,
      hoverClassObject,
      emitSelect,
    }
  },
})
</script>