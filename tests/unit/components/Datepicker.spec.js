import {expect} from 'chai';
import {createLocalVue, mount, shallowMount} from '@vue/test-utils';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';
import Select from '@/components/Select/Select.vue';
import Datepicker from '@/components/Datepicker/Datepicker.vue';
import VueLodash from "vue-lodash";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ErDayjs from '@/plugins/dayjs';
import DatepickerRow from "@/components/Datepicker/DatepickerRow";

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(quarterOfYear);

let localVue = createLocalVue();
localVue.use(VueLodash);
localVue.use(ErDayjs, {
    dayjs: dayjs
});


describe('Datepicker.vue', () => {
    it('is called', () => {
        let wrapper = shallowMount(Datepicker, {
            localVue,
            stubs: {
                'fe-input': Input,
                'fe-select': Select,
                'fe-button': Button,
            }
        });
        expect(wrapper.name()).to.equal('fe-datepicker');
    });

    it('is vue instance', () => {
        const wrapper = shallowMount(Datepicker, {
            localVue,
            children: [Input],
            stubs: {
                'fe-input': Input,
                'fe-select': Select,
                'fe-button': Button,
            }
        });
        expect(wrapper.name()).to.equal('fe-datepicker');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('render simple datepicker', () => {
        const wrapper = mount(Datepicker, {
            localVue,
            children: [Input, Select, Button, DatepickerRow],
            stubs: {
                'fe-input': Input,
                'fe-select': Select,
                'fe-button': Button,
                'fe-datepicker-row': DatepickerRow
            }
        });
        expect(wrapper.find('input').classes()).to.include('fe-input');
        wrapper.setData({opened: true});
        let calendarWrapper = wrapper.find('div.datepicker-calendar');
        expect(calendarWrapper.find('div.datepicker-header').exists()).to.be.true;
        expect(calendarWrapper.find('div.datepicker').exists()).to.be.true;
        expect(calendarWrapper.find('div.week-label-container').exists()).to.be.true;
        expect(calendarWrapper.find('div.day-container').exists()).to.be.true;
        expect(calendarWrapper.find('div.datepicker-footer').exists()).to.be.false;
    });

    it('render datepicker with footer', () => {
        const wrapper = mount(Datepicker, {
            localVue,
            children: [Input, Select, Button, DatepickerRow],
            propsData: {
                showFooter: true
            },
            stubs: {
                'fe-input': Input,
                'fe-select': Select,
                'fe-button': Button,
                'fe-datepicker-row': DatepickerRow
            }
        });
        expect(wrapper.find('input').classes()).to.include('fe-input');
        wrapper.setData({opened: true});
        let calendarWrapper = wrapper.find('div.datepicker-calendar');
        expect(calendarWrapper.find('div.datepicker-header').exists()).to.be.true;
        expect(calendarWrapper.find('div.datepicker').exists()).to.be.true;
        expect(calendarWrapper.find('div.week-label-container').exists()).to.be.true;
        expect(calendarWrapper.find('div.day-container').exists()).to.be.true;
        expect(calendarWrapper.find('div.datepicker-footer').exists()).to.be.true;
    });

    it('render datepicker with custom date range', () => {
        let today = new Date();
        let minDate = new Date(today.getFullYear(), 0, today.getDate());
        let maxDate =new Date(today.getFullYear(), 3, today.getDate());

        const wrapper = mount(Datepicker, {
            localVue,
            children: [Input, Select, Button, DatepickerRow],
            propsData: {
                minDate: minDate,
                maxDate: maxDate
            },
            stubs: {
                'fe-input': Input,
                'fe-select': Select,
                'fe-button': Button,
                'fe-datepicker-row': DatepickerRow
            }
        });
        expect(wrapper.find('input').classes()).to.include('fe-input');
        wrapper.setData({opened: true});
        let calendarWrapper = wrapper.find('div.datepicker-calendar');
        expect(calendarWrapper.find('div.datepicker-header').exists()).to.be.true;
        expect(calendarWrapper.find('div.datepicker').exists()).to.be.true;
        expect(calendarWrapper.find('div.week-label-container').exists()).to.be.true;
        expect(calendarWrapper.find('div.day-container').exists()).to.be.true;
        expect(calendarWrapper.find('div.datepicker-footer').exists()).to.be.false;
        expect(wrapper.vm.monthNames.length).to.be.equal(4);
        let monthNames = localVue._.map(wrapper.vm.monthNames, (monthData) => {
            return monthData.label;
        });
        expect(monthNames).contain('January');
        expect(monthNames).contain('February');
        expect(monthNames).contain('March');
        expect(monthNames).contain('April');
        expect(wrapper.vm.yearNames.length).to.be.equal(1);
        let yearNames = localVue._.map(wrapper.vm.yearNames, (monthData) => {
            return monthData.label;
        });
        expect(yearNames).contain(today.getFullYear());
    });
});
