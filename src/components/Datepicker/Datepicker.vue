<template>
  <div :class="[classObject, size]">
    <fe-input :model-value="formattedDate"
              :id="id"
              :name="name"
              :readonly="!editable"
              :placeholder="placeholder"
              ref="trigger"
              :size="size"
              @change.native="onChange"
              @focus="triggerFocused"
              @blur="triggerBlurred"
              icon-before="calendar-alt"
              icon-pack-before="far"
    ></fe-input>
    <div v-if="opened" @click.stop.prevent :class="calendarClassObject">
      <div v-if="showHeader" :class="headerClassObject">
        <div class="has-addons" :class="[headerControlClassObject, addonsClassObject]">
          <fe-button :icon-only="true"
                     :size="size"
                     @click.stop.prevent="decrementMonth"
                     :disabled="!hasPreviousMonth"
                     icon-pack="fas"
                     icon="chevron-left"
                     css-class="-mr-px rounded-r-none h-full grow-0"
                     plain
          ></fe-button>
          <fe-select v-model="month"
                     :options="monthNames"
                     @update:modelValue="emitMonthChange"
                     :size="size"
                     css-class="-mr-px rounded-r-none rounded-l-none h-full flex-grow"
                     expanded
          ></fe-select>
          <fe-select v-model="year"
                     :options="yearNames"
                     @update:modelValue="emitYearChange"
                     :size="size"
                     css-class="-mr-px rounded-r-none rounded-l-none h-full flex-grow"
                     expanded
          ></fe-select>
          <fe-button :icon-only="true"
                     @click.stop.prevent="incrementMonth"
                     :disabled="!hasNextMonth"
                     icon-pack="fas"
                     icon="chevron-right"
                     :size="size"
                     css-class="rounded-l-none h-full grow-0"
                     plain
          ></fe-button>
        </div>
      </div>
      <fe-datepicker-row :weeks="weeks"
                         :day-names="dayNames"
                         :selected-day="selectedDay"
                         :size="size"
                         @select="select"
      ></fe-datepicker-row>
      <div v-if="showFooter" :class="footerClassObject">
        <div class="text-gray-500 text-left">
          <fe-button @click.stop.prevent="selectToday"
                     icon-pack-before="fas"
                     icon-before="calendar-day"
                     :disabled="!isTodaySelectable()"
                     :size="size"
                     plain
          >Today
          </fe-button>
        </div>
        <div class="text-gray-500 text-left">
          <fe-button @click.stop.prevent="clearDate"
                     icon-pack-before="far"
                     icon-before="times-circle"
                     :size="size"
                     plain
          >Clear
          </fe-button>
        </div>
      </div>
    </div>
    <div v-if="opened" @click="clickedOutside" :class="backdropClassObject"></div>
  </div>
</template>

<script>
import {MONTH, MONTH_DATA, WEEK} from "@/utils/date";
import FeDatepickerRow from "@/components/Datepicker/DatepickerRow.vue";
import FeInput from "@/components/Input/Input.vue";
import FeButton from "@/components/Button/Button.vue";
import FeSelect from '@/components/Select/Select.vue';
import SizeMixin from "../../mixins/SizeMixin.js";
import CssClasses from "./CssClasses";

export default {
  name: 'fe-datepicker',
  emits: ['month-change', 'year-change', 'update:modelValue'],
  components: {
    FeButton,
    FeInput,
    FeDatepickerRow,
    FeSelect,
  },
  mixins: [SizeMixin],
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Click to select...',
    },
    modelValue: {
      type: String,
      default: '',
    },
    displayIcon: {
      type: Boolean,
      default: true,
    },
    dayNames: {
      type: Array,
      default: function () {
        return [
          'Su',
          'M',
          'Tu',
          'W',
          'Th',
          'F',
          'S'
        ];
      },
    },
    minDate: {
      type: Date,
      default: null,
    },
    maxDate: {
      type: Date,
      default: null,
    },
    inclusive: {
      type: Boolean,
      default: true,
    },
    inputFormat: {
      type: String,
      default: 'YYYY-M-D',
    },
    displayFormat: {
      type: String,
      default: 'D/MM/YYYY',
    },
    editable: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      month: parseInt(this.$dayjs().format('M')),
      year: parseInt(this.$dayjs().format('YYYY')),
      opened: false,
      triggerFocus: false,
      selectedDay: null,
    }
  },
  computed: {
    /**
     * class names object
     */
    classObject() {
      return ['fe-datepicker', CssClasses.base];
    },
    /**
     * calendar class object
     */
    calendarClassObject() {
      let classes = ['datepicker-calendar opened datepicker-center-position md:normal-position', CssClasses.calendar];
      if (this.showFooter) {
        classes.push('has-footer');
      }
      if (this.showHeader) {
        classes.push('has-header');
      }

      switch (this.size) {
        case 'is-xs':
          classes.push(CssClasses.calendarXs);
          break;
        case 'is-sm':
          classes.push(CssClasses.calendarSm);
          break;
        case 'is-md':
          classes.push(CssClasses.calendarMd);
          break;
        case 'is-lg':
          classes.push(CssClasses.calendarLg);
          break;
        default:
          classes.push(CssClasses.calendarMd);
      }

      return classes;
    },
    /**
     * header class object
     */
    headerClassObject() {
      return ['datepicker-header', CssClasses.header];
    },
    /**
     * header control class object
     */
    headerControlClassObject() {
      return ['header-control', CssClasses.headerControl];
    },
    /**
     * addons class object
     */
    addonsClassObject() {
      return ['flex justify-center items-center'];
    },
    /**
     * footer class object
     */
    footerClassObject() {
      return ['datepicker-footer', CssClasses.footer];
    },
    /**
     * backdrop class object
     */
    backdropClassObject() {
      return CssClasses.backdrop;
    },
    /**
     * dayjs object for the first day of the current month
     * @return {*}
     */
    firstDayOfTheCurrentMonth() {
      return this.$dayjs(`${this.year}-${this.month}-1`, 'YYYY-M-D').startOf('month').startOf('day');
    },
    /**
     * dayjs object for the last day of the current month
     */
    lastDayOfTheCurrentMonth() {
      return this.$dayjs(`${this.year}-${this.month}-1`, 'YYYY-M-D').endOf('month').startOf('day');
    },
    /**
     * dayjs object for the last day of the previous month
     */
    lastDayOfThePreviousMonth() {
      return this.$dayjs(`${this.year}-${this.month}-1`, 'YYYY-M-D')
          .subtract(1, 'month')
          .endOf('month')
          .startOf('day');
    },
    /**
     * dayjs object for the first day of the next month
     */
    firstDayOfTheNextMonth() {
      return this.$dayjs(`${this.year}-${this.month}-1`, 'YYYY-M-D')
          .add(1, 'month')
          .startOf('month')
          .startOf('day');
    },
    /**
     * array of dayjs object for days
     * @return {[]}
     */
    days() {
      let days = [];
      for(let day = this.firstDayOfTheCurrentMonth.format('D'); day <= parseInt(this.lastDayOfTheCurrentMonth.format('D')); day++){
        let date = this.$dayjs(`${this.year}-${this.month}-${day}`, 'YYYY-M-D');
        days.push({
          'date': date,
          'unselectable': !this.isDateSelectable(date)
        });
      }

      // Add previous days
      let currentDay = this.firstDayOfTheCurrentMonth;
      for(let week = WEEK.SUNDAY; week < this.firstDayOfTheCurrentMonth.format('d'); week++){
        currentDay = this.$dayjs(currentDay.subtract(1, 'days'));
        days.unshift({
          'date': currentDay,
          'unselectable': true,
          'previous': true,
        });
      }

      // Add following days
      currentDay = this.lastDayOfTheCurrentMonth;
      for(let week = parseInt(this.lastDayOfTheCurrentMonth.format('d')) + 1; week <= WEEK.SATURDAY; week++){
        currentDay = this.$dayjs(currentDay.add(1, 'days'));
        days.push({
          'date': currentDay,
          'unselectable': true,
          'following': true,
        });
      }
      return days;
    },
    /**
     * chunked array of days by weeks
     * @return {Array|*}
     */
    weeks() {
      return this.days.reduce((week, day, i) => {
        if (i % WEEK.NO_OF_DAYS_IN_WEEK === 0) {
          week.push(this.days.slice(i, i + WEEK.NO_OF_DAYS_IN_WEEK))
        }
        return week
      }, []);
    },
    /**
     * array of month data
     * @return {[]}
     */
    monthNames() {
      let months = [];
      if (this.minDayjsDate !== null || this.maxDayjsDate !== null) {
        let minDayjsMonth = this.minDayjsDate !== null ? this.minDayjsDate.month() : null;
        let maxDayjsMonth = this.maxDayjsDate !== null ? this.maxDayjsDate.month() : null;
        months = MONTH_DATA.filter((monthData) => {
          let monthValue = monthData.value;
          let firstDay = this.$dayjs(`${this.year}-${monthValue}-1`, 'YYYY-M-D').startOf('month');
          let lastDay = this.$dayjs(`${this.year}-${monthValue}-1`, 'YYYY-M-D').endOf('month');
          let allow = false;
          if ((minDayjsMonth + 1) === monthValue || (maxDayjsMonth + 1) === monthValue) {
            allow = true;
          } else if (this.minDayjsDate !== null && this.maxDayjsDate !== null) {
            if (firstDay.isBetween(this.minDayjsDate, this.maxDayjsDate, null, this.inclusivity) ||
                lastDay.isBetween(this.minDayjsDate, this.maxDayjsDate, null, this.inclusivity)
            ) {
              allow = true;
            }
          } else if (this.minDayjsDate !== null) {
            allow = lastDay.isSameOrAfter(this.minDayjsDate);
          } else if (this.maxDayjsDate !== null) {
            allow = firstDay.isSameOrBefore(this.maxDayjsDate);
          }

          return allow;
        });
      } else {
        months = MONTH_DATA;
      }
      return months;
    },
    /**
     * array of year data
     * @return {[]}
     */
    yearNames() {
      let earliestYear = (this.minDate) ? this.minDate.getFullYear() : 1900;
      let latestYear = (this.maxDate) ? this.maxDate.getFullYear() : this.year + 5;
      let years = [];
      if (earliestYear === latestYear) {
        years.push({
          value: earliestYear,
          label: earliestYear,
        });
      } else {
        for (let year = earliestYear; year <= latestYear; year++) {
          years.push({
            value: year,
            label: year,
          });
        }
      }
      return years;
    },
    /**
     * dayjs object of the minimum date if set
     * @return {null|*}
     */
    minDayjsDate() {
      if (this.minDate instanceof Date) {
        return this.$dayjs(
            `${this.minDate.getFullYear()}-${this.minDate.getMonth() + 1}-${this.minDate.getDate()}`,
            'YYYY-M-D'
        ).startOf('day');
      }
      return null;
    },
    /**
     * dayjs object of the maximum date if set
     * @return {null|*}
     */
    maxDayjsDate() {
      if (this.maxDate instanceof Date) {
        return this.$dayjs(
            `${this.maxDate.getFullYear()}-${this.maxDate.getMonth() + 1}-${this.maxDate.getDate()}`,
            'YYYY-M-D'
        ).endOf('day');
      }
      return null;
    },
    /**
     * check if previous month is not disabled
     * @return {boolean|*}
     */
    hasPreviousMonth() {
      return this.minDayjsDate === null || this.lastDayOfThePreviousMonth.isSameOrAfter(this.minDayjsDate);
    },
    /**
     * check if next month is not disabled
     * @return {boolean|*}
     */
    hasNextMonth() {
      return this.maxDayjsDate === null || this.firstDayOfTheNextMonth.isSameOrBefore(this.maxDayjsDate);
    },
    /**
     * return inclusivity syntax for dayjs object
     * @return {string}
     */
    inclusivity() {
      return this.inclusive ? '[]' : '()';
    },
    /**
     * a formatted date is date is selected
     * @return {string}
     */
    formattedDate() {
      return this.selectedDay !== null ? this.selectedDay.date.format(this.displayFormat) : '';
    }
  },
  methods: {
    /**
     * open datepicker dropdown on focus
     */
    triggerFocused() {
      this.triggerFocus = true;
      this.opened = true;
    },
    /**
     * mark trigger blurred
     */
    triggerBlurred() {
      this.triggerFocus = false;
    },
    /**
     * close datepicker dropdown
     */
    closeCalendar() {
      this.opened = false;
    },
    /**
     * if clicked anywhere else other than datepicker dropdown
     */
    clickedOutside() {
      if (!this.triggerFocus) {
        this.closeCalendar();
      }
    },
    /**
     * emit month select box change event
     */
    emitMonthChange() {
      this.$emit('month-change');
    },
    /**
     * emit year select box change event
     */
    emitYearChange() {
      //force change to a valid month if selected month is not available in the newly selected year
      let firstMonthInThisYear = this.monthNames[0].value;
      let lastMonthInThisYear = this.monthNames[this.monthNames.length - 1].value;
      if (this.month < firstMonthInThisYear) {
        this.month = firstMonthInThisYear;
      } else if (this.month > lastMonthInThisYear) {
        this.month = lastMonthInThisYear;
      }
      this.$emit('year-change');
    },
    /**
     * go to previous month
     */
    decrementMonth() {
      if (this.month === MONTH.JANUARY) {
        this.month = MONTH.DECEMBER;
        this.year--;
        this.emitYearChange();
      } else {
        this.month--;
      }
      this.emitMonthChange();
    },
    /**
     * got to next month
     */
    incrementMonth() {
      if (this.month === MONTH.DECEMBER) {
        this.month = MONTH.JANUARY;
        this.year++;
        this.emitYearChange();
      } else {
        this.month++;
      }
      this.emitMonthChange();
    },
    /**
     * select day and close datepicker dropdown
     * @param day
     */
    select(day) {
      this.selectedDay = day;
      this.month = parseInt(day.date.format('M'));
      this.year = parseInt(day.date.format('YYYY'));
      this.$emit('update:modelValue', day.date.format(this.inputFormat));
      this.closeCalendar();
    },
    /**
     * quick select today's date
     */
    selectToday() {
      this.select({
        'date': this.$dayjs()
      });
    },
    /**
     * check if today's date is not disabled
     * @return {boolean}
     */
    isTodaySelectable() {
      let today = this.$dayjs();
      let selectable = false;
      if (this.minDayjsDate === null && this.maxDayjsDate === null) {
        selectable = true;
      } else if (this.minDayjsDate !== null && this.maxDayjsDate !== null) {
        selectable = today.isBetween(this.minDayjsDate, this.maxDayjsDate, null, this.inclusivity);
      } else if (this.minDayjsDate !== null) {
        selectable = today.isSameOrAfter(this.minDayjsDate);
      } else if (this.maxDayjsDate !== null) {
        selectable = today.isSameOrBefore(this.maxDayjsDate);
      }
      return selectable;
    },
    /**
     * clear selected date
     */
    clearDate() {
      this.selectedDay = null;
      this.month = parseInt(this.$dayjs().format('M'));
      this.year = parseInt(this.$dayjs().format('YYYY'));
      this.$emit('update:modelValue', '');
      this.closeCalendar();
    },
    /**
     * check if supplied date is not disabled
     * @param date
     * @return {boolean}
     */
    isDateSelectable(date) {
      let selectable = false;
      let month = parseInt(date.format('M'));
      let isDateInCurrentMonth = (month === this.month);
      if (this.minDayjsDate === null && this.maxDayjsDate === null) {
        selectable = true;
      } else if (isDateInCurrentMonth) {
        if (this.minDayjsDate !== null && this.maxDayjsDate !== null) {
          selectable = date.isBetween(this.minDayjsDate, this.maxDayjsDate, null, this.inclusivity);
        } else if (this.minDayjsDate !== null) {
          selectable = date.isSameOrAfter(this.minDayjsDate);
        } else if (this.maxDayjsDate !== null) {
          selectable = date.isSameOrBefore(this.maxDayjsDate);
        }
      }
      return selectable;
    },
    /**
     * on change of the editable date select the date if valid otherwise clear the date
     * @param event
     */
    onChange(event) {
      let parsedDate = this.$dayjs(event.target.value, this.displayFormat);
      if (parsedDate.isValid() && this.isDateSelectable(parsedDate)) {
        this.select({
          'date': parsedDate
        });
      } else {
        this.clearDate();
        this.$refs.trigger.localValue = this.formattedDate;
      }
    },
  },
  mounted() {
    //set minimum month and year allowed
    if (this.minDate) {
      this.year = (this.year < this.minDate.getFullYear()) ? this.minDate.getFullYear() : this.year;
      let minDateMonth = this.minDate.getMonth() + 1;
      if (this.year === this.minDate.getFullYear() && this.month < minDateMonth) {
        this.month = minDateMonth;
      }
    }
    //set maximum month and year allowed
    if (this.maxDate) {
      this.year = (this.year > this.maxDate.getFullYear()) ? this.maxDate.getFullYear() : this.year;
      let maxDateMonth = this.maxDate.getMonth() + 1;
      if (this.year === this.maxDate.getFullYear() && this.month > maxDateMonth) {
        this.month = maxDateMonth;
      }
    }
    if (this.modelValue !== '') {
      let parsedDate = this.$dayjs(this.modelValue, this.inputFormat);
      if (parsedDate.isValid() && this.isDateSelectable(parsedDate)) {
        this.select({
          'date': parsedDate,
          'unselectable': false
        });
      }
    }
  },
}
</script>

<style scoped>
/*min width*/
.fe-datepicker.is-xs .datepicker-calendar {
  min-width: 15.5rem;
}

.fe-datepicker.is-sm .datepicker-calendar {
  min-width: 16.5rem;
}

.fe-datepicker.is-md .datepicker-calendar {
  min-width: 21rem;
}

.fe-datepicker.is-lg .datepicker-calendar {
  min-width: 21.5rem;
}

/*min height*/
.fe-datepicker .is-xs.datepicker {
  min-height: 13rem;
}

.fe-datepicker .is-sm.datepicker {
  min-height: 14rem;
}

.fe-datepicker .is-md.datepicker {
  min-height: 19rem;
}

.fe-datepicker .is-lg.datepicker {
  min-height: 20rem;
}

.fe-datepicker.is-xs .header-control button {
  padding-right: 0.35rem;
  padding-left: 0.35rem;
}

.fe-datepicker.is-sm .header-control button {
  padding-right: 0.45rem;
  padding-left: 0.45rem;
}

.fe-datepicker.is-md .header-control button {
  padding-right: 0.7rem;
  padding-left: 0.7rem;
}

.fe-datepicker.is-lg .header-control button {
  padding-right: 0.45rem;
  padding-left: 0.45rem;
}

@media (min-width: 768px) {
  .fe-datepicker .md\:normal-position {
    position: absolute;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    -webkit-transform: none;
    transform: none;
  }
}

.datepicker-center-position {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.fe-datepicker .day {
  font-feature-settings: "tnum";
}

</style>
