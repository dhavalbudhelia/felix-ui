import {config, mount} from '@vue/test-utils';
import Datepicker from '@/components/Datepicker/Datepicker.vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import options from '@/utils/options';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(quarterOfYear);

config.global.provide = {
  $theme: options,
  $dayjs: dayjs,
}

describe('Datepicker.vue', () => {

  const setup = async (options = {}) => {
    const compOptions = {
      ...options,
      ...{}
    };
    return mount(Datepicker, compOptions);
  }

  it('render simple datepicker', async () => {
    const wrapper = await setup();
    expect(wrapper.find('input').classes()).toContain('fe-input');
    await wrapper.vm.triggerFocused();
    let calendarWrapper = wrapper.find('div.datepicker-calendar');
    expect(calendarWrapper.find('div.datepicker-header').exists()).toBe(true);
    expect(calendarWrapper.find('div.datepicker').exists()).toBe(true);
    expect(calendarWrapper.find('div.week-label-container').exists()).toBe(true);
    expect(calendarWrapper.find('div.day-container').exists()).toBe(true);
    expect(calendarWrapper.find('div.datepicker-footer').exists()).toBe(false);
  });

  it('render datepicker with footer', async () => {
    const wrapper = await setup({
      propsData: {
        showFooter: true
      },
    });
    expect(wrapper.find('input').classes()).toContain('fe-input');
    await wrapper.vm.triggerFocused();
    await wrapper.vm.$nextTick();
    let calendarWrapper = wrapper.find('div.datepicker-calendar');
    expect(calendarWrapper.find('div.datepicker-header').exists()).toBe(true);
    expect(calendarWrapper.find('div.datepicker').exists()).toBe(true);
    expect(calendarWrapper.find('div.week-label-container').exists()).toBe(true);
    expect(calendarWrapper.find('div.day-container').exists()).toBe(true);
    expect(calendarWrapper.find('div.datepicker-footer').exists()).toBe(true);
  });

  it('render datepicker with custom date range', async () => {
    let today = new Date();
    let minDate = new Date(today.getFullYear(), 0, today.getDate());
    let maxDate = new Date(today.getFullYear(), 3, today.getDate());

    const wrapper = await setup({
      propsData: {
        minDate: minDate,
        maxDate: maxDate
      },
    });
    expect(wrapper.find('input').classes()).toContain('fe-input');
    await wrapper.vm.triggerFocused();
    await wrapper.vm.$nextTick();
    let calendarWrapper = wrapper.find('div.datepicker-calendar');
    expect(calendarWrapper.find('div.datepicker-header').exists()).toBe(true);
    expect(calendarWrapper.find('div.datepicker').exists()).toBe(true);
    expect(calendarWrapper.find('div.week-label-container').exists()).toBe(true);
    expect(calendarWrapper.find('div.day-container').exists()).toBe(true);
    expect(calendarWrapper.find('div.datepicker-footer').exists()).toBe(false);
    expect(wrapper.vm.monthNames.length).toEqual(4);
    let monthNames = wrapper.vm.monthNames.map((monthData) => {
      return monthData.label;
    });
    expect(monthNames).toContain('January');
    expect(monthNames).toContain('February');
    expect(monthNames).toContain('March');
    expect(monthNames).toContain('April');
    expect(wrapper.vm.yearNames.length).toEqual(1);
    let yearNames = wrapper.vm.yearNames.map((monthData) => {
      return monthData.label;
    });
    expect(yearNames).toContain(today.getFullYear());
  });
});
