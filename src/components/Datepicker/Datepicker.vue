<template>
  <div :class="['fe-datepicker block leading-normal', size]">
    <FeInput :model-value="formattedDate"
             :id="id"
             :name="name"
             :readonly="!editable"
             :placeholder="placeholder"
             ref="trigger"
             :size="size"
             @change.native="onChange"
             @focus="triggerFocused"
             @blur="triggerBlurred"
    >
      <template #iconBefore>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </template>
    </FeInput>
    <div v-if="opened" @click.stop.prevent :class="calendarClassObject">
      <div v-if="showHeader" class="datepicker-header flex justify-between pb-4 border-b">
        <div class="has-addons header-control w-full flex justify-center items-center">
          <FeButton :icon-only="true"
                    :size="size"
                    @click.stop.prevent="decrementMonth"
                    :disabled="!hasPreviousMonth"
                    css-class="-mr-px rounded-r-none h-full grow-0"
                    plain
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </FeButton>
          <FeSelect v-model="month"
                    :options="monthNames"
                    @update:modelValue="emitMonthChange"
                    :size="size"
                    css-class="-mr-px rounded-r-none rounded-l-none h-full flex-grow"
                    expanded
          ></FeSelect>
          <FeSelect v-model="year"
                    :options="yearNames"
                    @update:modelValue="emitYearChange"
                    :size="size"
                    css-class="-mr-px rounded-r-none rounded-l-none h-full flex-grow"
                    expanded
          ></FeSelect>
          <FeButton :icon-only="true"
                    @click.stop.prevent="incrementMonth"
                    :disabled="!hasNextMonth"
                    :size="size"
                    css-class="rounded-l-none h-full grow-0"
                    plain
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </FeButton>
        </div>
      </div>
      <FeDatepickerRow :weeks="weeks"
                       :day-names="dayNames"
                       :selected-day="selectedDay"
                       :size="size"
                       @select="select"
      ></FeDatepickerRow>
      <div v-if="showFooter" class="datepicker-footer flex justify-between pt-4 border-t">
        <div class="text-gray-500 text-left">
          <FeButton @click.stop.prevent="selectToday"
                    :disabled="!isTodaySelectable()"
                    :size="size"
                    plain
          >
            <template #iconBefore>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </template>
            Today
          </FeButton>
        </div>
        <div class="text-gray-500 text-left">
          <FeButton @click.stop.prevent="clearDate"
                    :size="size"
                    plain
          >
            <template #iconBefore>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </template>
            Clear
          </FeButton>
        </div>
      </div>
    </div>
    <div v-if="opened" @click="clickedOutside"
         class="fixed w-full h-full top-0 left-0 md:bg-white md:opacity-0 bg-black opacity-75 z-10"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted} from 'vue';
import dayjs, {Dayjs} from 'dayjs';
import {MONTH, MONTH_DATA, WEEK} from '@/utils/date.js';
import FeDatepickerRow from '@/components/Datepicker/DatepickerRow.vue';
import FeInput from '@/components/Input/Input.vue';
import FeButton from '@/components/Button/Button.vue';
import FeSelect from '@/components/Select/Select.vue';

interface CalendarDay {
  date: any;
  unselectable?: boolean;
  previous?: boolean;
  following?: boolean;
}

export default defineComponent({
  name: 'FeDatepicker',
  emits: ['month-change', 'year-change', 'update:modelValue'],
  components: {
    FeButton,
    FeInput,
    FeDatepickerRow,
    FeSelect,
  },
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
    size: {
      type: String,
      default: 'is-md',
      validator: function (value: string) {
        return ['is-xs', 'is-sm', 'is-md', 'is-lg'].includes(value);
      },
    },
  },
  setup(props, {emit}) {
    const month = ref(parseInt(dayjs().format('M')));
    const year = ref(parseInt(dayjs().format('YYYY')));
    const opened = ref(false);
    const triggerFocus = ref(false);
    const selectedDay = ref<CalendarDay | null>(null);

    /**
     * calendar class object
     */
    const calendarClassObject = computed(() => {
      let classes = ['datepicker-calendar opened datepicker-center-position md:normal-position block z-20 mt-1 bg-white rounded border border-gray-400 shadow'];
      if (props.showFooter) {
        classes.push('has-footer');
      }
      if (props.showHeader) {
        classes.push('has-header');
      }

      switch (props.size) {
        case 'is-xs':
          classes.push('p-2');
          break;
        case 'is-sm':
          classes.push('p-2');
          break;
        case 'is-md':
          classes.push('p-3');
          break;
        case 'is-lg':
          classes.push('p-2');
          break;
        default:
          classes.push('p-3');
      }

      return classes;
    });

    /**
     * dayjs object for the first day of the current month
     * @return {*}
     */
    const firstDayOfTheCurrentMonth = computed<Dayjs>(() => {
      return dayjs(`${year.value}-${month.value}-1`, 'YYYY-M-D').startOf('month').startOf('day');
    });

    /**
     * dayjs object for the last day of the current month
     */
    const lastDayOfTheCurrentMonth = computed<Dayjs>(() => {
      return dayjs(`${year.value}-${month.value}-1`, 'YYYY-M-D').endOf('month').startOf('day');
    });

    /**
     * dayjs object for the last day of the previous month
     */
    const lastDayOfThePreviousMonth = computed<Dayjs>(() => {
      return dayjs(`${year.value}-${month.value}-1`, 'YYYY-M-D')
        .subtract(1, 'month')
        .endOf('month')
        .startOf('day');
    });

    /**
     * dayjs object for the first day of the next month
     */
    const firstDayOfTheNextMonth = computed<Dayjs>(() => {
      return dayjs(`${year.value}-${month.value}-1`, 'YYYY-M-D')
        .add(1, 'month')
        .startOf('month')
        .startOf('day');
    });

    /**
     * array of dayjs object for days
     * @return {[]}
     */
    const days = computed<Array<CalendarDay>>(() => {
      let days: Array<CalendarDay> = [];
      for (
        let day = parseInt(firstDayOfTheCurrentMonth.value.format('D'));
        day <= parseInt(lastDayOfTheCurrentMonth.value.format('D'));
        day++
      ) {
        let date = dayjs(`${year.value}-${month.value}-${day}`, 'YYYY-M-D');
        days.push({
          'date': date,
          'unselectable': !isDateSelectable(date)
        });
      }

      // Add previous days
      let currentDay = firstDayOfTheCurrentMonth.value;
      for (
        let week = WEEK.SUNDAY;
        week < firstDayOfTheCurrentMonth.value.format('d');
        week++
      ) {
        currentDay = dayjs(currentDay.subtract(1, 'days'));
        days.unshift({
          'date': currentDay,
          'unselectable': true,
          'previous': true,
        });
      }

      // Add following days
      currentDay = lastDayOfTheCurrentMonth.value;
      for (
        let week = parseInt(lastDayOfTheCurrentMonth.value.format('d')) + 1;
        week <= WEEK.SATURDAY;
        week++
      ) {
        currentDay = dayjs(currentDay.add(1, 'days'));
        days.push({
          'date': currentDay,
          'unselectable': true,
          'following': true,
        });
      }
      return days;
    });

    /**
     * chunked array of days by weeks
     * @return {Array|*}
     */
    const weeks = computed(() => {
      return days.value ? days.value.reduce((week: Array<Array<CalendarDay>>, day, i) => {
        if (i % WEEK.NO_OF_DAYS_IN_WEEK === 0) {
          week.push(days.value.slice(i, i + WEEK.NO_OF_DAYS_IN_WEEK))
        }
        return week
      }, []) : [];
    });

    /**
     * array of month data
     * @return {[]}
     */
    const monthNames = computed<Array<{ label: string, key?: string, value: number }>>(() => {
      let months = [];
      if (minDayjsDate.value !== null || maxDayjsDate.value !== null) {
        let minDayjsMonth = minDayjsDate.value !== null ? minDayjsDate.value.month() : 0;
        let maxDayjsMonth = maxDayjsDate.value !== null ? maxDayjsDate.value.month() : 0;
        months = MONTH_DATA.filter((monthData) => {
          let monthValue = monthData.value;
          let firstDay = dayjs(`${year.value}-${monthValue}-1`, 'YYYY-M-D').startOf('month');
          let lastDay = dayjs(`${year.value}-${monthValue}-1`, 'YYYY-M-D').endOf('month');
          let allow = false;
          if ((minDayjsMonth + 1) === monthValue || (maxDayjsMonth + 1) === monthValue) {
            allow = true;
          } else if (minDayjsDate.value !== null && maxDayjsDate.value !== null) {
            if (firstDay.isBetween(minDayjsDate.value, maxDayjsDate.value, null, inclusivity.value) ||
              lastDay.isBetween(minDayjsDate.value, maxDayjsDate.value, null, inclusivity.value)
            ) {
              allow = true;
            }
          } else if (minDayjsDate.value !== null) {
            allow = lastDay.isSameOrAfter(minDayjsDate.value);
          } else if (maxDayjsDate.value !== null) {
            allow = firstDay.isSameOrBefore(maxDayjsDate.value);
          }

          return allow;
        });
      } else {
        months = MONTH_DATA;
      }
      return months;
    });

    /**
     * array of year data
     * @return {[]}
     */
    const yearNames = computed<Array<{ value: number, label: number }>>(() => {
      let earliestYear = (props.minDate) ? props.minDate.getFullYear() : 1900;
      let latestYear = (props.maxDate) ? props.maxDate.getFullYear() : year.value + 5;
      let years: Array<{ value: number, label: number }> = [];
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
    });

    /**
     * dayjs object of the minimum date if set
     * @return {null|*}
     */
    const minDayjsDate = computed<Dayjs | null>(() => {
      if (props.minDate instanceof Date) {
        return dayjs(
          `${props.minDate.getFullYear()}-${props.minDate.getMonth() + 1}-${props.minDate.getDate()}`,
          'YYYY-M-D'
        ).startOf('day');
      }
      return null;
    });

    /**
     * dayjs object of the maximum date if set
     * @return {null|*}
     */
    const maxDayjsDate = computed<Dayjs | null>(() => {
      if (props.maxDate instanceof Date) {
        return dayjs(
          `${props.maxDate.getFullYear()}-${props.maxDate.getMonth() + 1}-${props.maxDate.getDate()}`,
          'YYYY-M-D'
        ).endOf('day');
      }
      return null;
    });

    /**
     * check if previous month is not disabled
     * @return {boolean|*}
     */
    const hasPreviousMonth = computed<boolean>(() => {
      return !minDayjsDate.value ||
        (
          lastDayOfThePreviousMonth.value &&
          lastDayOfThePreviousMonth.value?.isSameOrAfter(minDayjsDate.value)
        );
    });

    /**
     * check if next month is not disabled
     * @return {boolean|*}
     */
    const hasNextMonth = computed<boolean>(() => {
      return !maxDayjsDate.value || firstDayOfTheNextMonth.value?.isSameOrBefore(maxDayjsDate.value);
    });

    /**
     * return inclusivity syntax for dayjs object
     * @return {string}
     */
    const inclusivity = computed(() => {
      return props.inclusive ? '[]' : '()';
    });

    /**
     * a formatted date is date is selected
     * @return {string}
     */
    const formattedDate = computed(() => {
      return selectedDay.value ? selectedDay.value.date.format(props.displayFormat) : '';
    });

    /**
     * open datepicker dropdown on focus
     */
    const triggerFocused = () => {
      triggerFocus.value = true;
      opened.value = true;
    };

    /**
     * mark trigger blurred
     */
    const triggerBlurred = () => {
      triggerFocus.value = false;
    };

    /**
     * close datepicker dropdown
     */
    const closeCalendar = () => {
      opened.value = false;
    };

    /**
     * if clicked anywhere else other than datepicker dropdown
     */
    const clickedOutside = () => {
      if (!triggerFocus.value) {
        closeCalendar();
      }
    };

    /**
     * emit month select box change event
     */
    const emitMonthChange = () => {
      emit('month-change');
    };

    /**
     * emit year select box change event
     */
    const emitYearChange = () => {
      //force change to a valid month if selected month is not available in the newly selected year
      let firstMonthInThisYear = monthNames.value[0].value;
      let lastMonthInThisYear = monthNames.value[monthNames.value.length - 1].value;
      if (month.value < firstMonthInThisYear) {
        month.value = firstMonthInThisYear;
      } else if (month.value > lastMonthInThisYear) {
        month.value = lastMonthInThisYear;
      }
      emit('year-change');
    };

    /**
     * go to previous month
     */
    const decrementMonth = () => {
      if (month.value === MONTH.JANUARY) {
        month.value = MONTH.DECEMBER;
        year.value--;
        emitYearChange();
      } else {
        month.value--;
      }
      emitMonthChange();
    };

    /**
     * got to next month
     */
    const incrementMonth = () => {
      if (month.value === MONTH.DECEMBER) {
        month.value = MONTH.JANUARY;
        year.value++;
        emitYearChange();
      } else {
        month.value++;
      }
      emitMonthChange();
    };

    /**
     * select day and close datepicker dropdown
     * @param day
     */
    const select = (day: CalendarDay) => {
      selectedDay.value = day;
      month.value = parseInt(day.date.format('M'));
      year.value = parseInt(day.date.format('YYYY'));
      emit('update:modelValue', day.date.format(props.inputFormat));
      closeCalendar();
    };

    /**
     * quick select today's date
     */
    const selectToday = () => {
      select({
        'date': dayjs()
      });
    };

    /**
     * check if today's date is not disabled
     * @return {boolean}
     */
    const isTodaySelectable = () => {
      let today = dayjs();
      let selectable = false;
      if (minDayjsDate.value === null && maxDayjsDate.value === null) {
        selectable = true;
      } else if (minDayjsDate.value !== null && maxDayjsDate.value !== null) {
        selectable = today.isBetween(minDayjsDate.value, maxDayjsDate.value, null, inclusivity.value);
      } else if (minDayjsDate.value !== null) {
        selectable = today.isSameOrAfter(minDayjsDate.value);
      } else if (maxDayjsDate.value !== null) {
        selectable = today.isSameOrBefore(maxDayjsDate.value);
      }
      return selectable;
    };

    /**
     * clear selected date
     */
    const clearDate = () => {
      selectedDay.value = null;
      month.value = parseInt(dayjs().format('M'));
      year.value = parseInt(dayjs().format('YYYY'));
      emit('update:modelValue', '');
      closeCalendar();
    };

    /**
     * check if supplied date is not disabled
     * @param date
     * @return {boolean}
     */
    const isDateSelectable = (date) => {
      let selectable = false;
      let currentMonth = parseInt(date.format('M'));
      let isDateInCurrentMonth = (currentMonth === month.value);
      if (minDayjsDate.value === null && maxDayjsDate.value === null) {
        selectable = true;
      } else if (isDateInCurrentMonth) {
        if (minDayjsDate.value !== null && maxDayjsDate.value !== null) {
          selectable = date.isBetween(minDayjsDate.value, maxDayjsDate.value, null, inclusivity.value);
        } else if (minDayjsDate.value !== null) {
          selectable = date.isSameOrAfter(minDayjsDate.value);
        } else if (maxDayjsDate.value !== null) {
          selectable = date.isSameOrBefore(maxDayjsDate.value);
        }
      }
      return selectable;
    };

    /**
     * on change of the editable date select the date if valid otherwise clear the date
     * @param event
     */
    const onChange = (event) => {
      let parsedDate = dayjs(event.target.value, props.displayFormat);
      if (parsedDate.isValid() && isDateSelectable(parsedDate)) {
        select({
          'date': parsedDate
        });
      } else {
        clearDate();
      }
    };

    onMounted(() => {
      //set minimum month and year allowed
      if (props.minDate) {
        year.value = (year.value < props.minDate.getFullYear()) ? props.minDate.getFullYear() : year.value;
        let minDateMonth = props.minDate.getMonth() + 1;
        if (year.value === props.minDate.getFullYear() && month.value < minDateMonth) {
          month.value = minDateMonth;
        }
      }
      //set maximum month and year allowed
      if (props.maxDate) {
        year.value = (year.value > props.maxDate.getFullYear()) ? props.maxDate.getFullYear() : year.value;
        let maxDateMonth = props.maxDate.getMonth() + 1;
        if (year.value === props.maxDate.getFullYear() && month.value > maxDateMonth) {
          month.value = maxDateMonth;
        }
      }
      if (props.modelValue !== '') {
        let parsedDate = dayjs(props.modelValue, props.inputFormat);
        if (parsedDate.isValid() && isDateSelectable(parsedDate)) {
          select({
            'date': parsedDate,
            'unselectable': false
          });
        }
      }
    });

    return {
      month,
      year,
      opened,
      triggerFocus,
      selectedDay,
      calendarClassObject,
      firstDayOfTheCurrentMonth,
      lastDayOfTheCurrentMonth,
      lastDayOfThePreviousMonth,
      firstDayOfTheNextMonth,
      days,
      weeks,
      monthNames,
      yearNames,
      minDayjsDate,
      maxDayjsDate,
      hasPreviousMonth,
      hasNextMonth,
      inclusivity,
      formattedDate,
      triggerFocused,
      triggerBlurred,
      closeCalendar,
      clickedOutside,
      emitMonthChange,
      emitYearChange,
      decrementMonth,
      incrementMonth,
      select,
      selectToday,
      isTodaySelectable,
      clearDate,
      isDateSelectable,
      onChange,
    }
  },
})
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
