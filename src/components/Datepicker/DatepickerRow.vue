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

<script>
import CssClasses from "./CssClasses";

export default {
  name: 'fe-datepicker-row',
  emits: ['select'],
  props: {
    weeks: {
      type: Array,
      required: false,
      default: [],
    },
    dayNames: {
      type: Array,
      required: true,
    },
    selectedDay: {
      type: Object,
      required: false,
      default: null,
    },
    size: {
      type: String,
      default: 'is-md',
      required: false,
      validator: function (value) {
        return ['is-xs', 'is-sm', 'is-md', 'is-lg'].includes(value);
      },
    },
  },
  computed: {
    datepickerClassObject() {
      return ['datepicker', CssClasses.row, this.size];
    },
    weekLabelClassObject() {
      let classes = ['week-label font-medium', CssClasses.dayWeekCell];
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.dayXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.daySm);
          break;
        case 'is-md':
          classes.push(CssClasses.dayMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.dayLg);
          break;
        default:
          classes.push(CssClasses.dayMd);
      }
      return classes;
    },
  },
  methods: {
    /**
     * check if the supplied day is selected
     */
    isDaySelected(day) {
      return this.selectedDay !== null && day.date.isSame(this.selectedDay.date.format('YYYY-MM-DD'));
    },
    /**
     * check if the supplied day is today
     */
    isDayIsToday(day) {
      return day.date.isSame(this.$dayjs().format('YYYY-MM-DD'));
    },
    /**
     * class object
     * @param day
     */
    dayClassObject(day) {
      let classes = ['day', CssClasses.day, CssClasses.dayWeekCell];
      if (day.previous) {
        classes.push('previous');
      }
      if (day.following) {
        classes.push('following');
      }
      if (day.unselectable) {
        classes.push('unselectable');
        if (!this.isDaySelected(day)) {
          classes.push('text-gray-500');
        }
      }
      if (this.isDaySelected(day)) {
        classes.push('selected');
        classes.push(CssClasses.selectedDay);
        let primary = `bg-${this.$theme.color.primary} border-${this.$theme.color.primary}`;
        classes.push(primary);
      }
      if (this.isDayIsToday(day)) {
        classes.push('today');
      }
      classes.push(this.hoverClassObject(day));
      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.dayXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.daySm);
          break;
        case 'is-md':
          classes.push(CssClasses.dayMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.dayLg);
          break;
        default:
          classes.push(CssClasses.dayMd);
      }
      return classes;
    },
    /**
     * return hover classes for supplied day
     */
    hoverClassObject(day) {
      let classes = '';
      if (!this.isDaySelected(day) && !day.unselectable && !this.isDayIsToday(day)) {
        classes = CssClasses.dayHover;
      } else if (this.isDayIsToday(day) && !this.isDaySelected(day)) {
        classes = `border-${this.$theme.color.primary}`;
        if (!day.unselectable) {
          classes = classes + ' hover:bg-gray-300 hover:cursor-pointer';
        }
      }
      return classes;
    },
    /**
     * emit select day event to the parent component
     * @param day
     */
    emitSelect(day) {
      if (!day.unselectable) {
        this.$emit('select', day);
      }
    }
  },
}
</script>
