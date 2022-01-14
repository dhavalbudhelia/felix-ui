import {config, shallowMount} from '@vue/test-utils';
import Timepicker from '@/components/Timepicker/Timepicker.vue';
import options from "@/utils/options";

config.global.mocks = {
    $theme: options,
}

describe('Timepicker.vue', () => {
    it('render simple timepicker', async () => {
        let wrapper = shallowMount(Timepicker);
        expect(wrapper.find('div.fe-timepicker').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker-placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).toBe(false);
        wrapper.setData({opened: true});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-timepicker').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker-placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).toBe(true);
        let timepickerWrapper = wrapper.find('div.fe-timepicker div.timepicker');
        expect(timepickerWrapper.find('div.hours-selector').exists()).toBe(true);
        expect(timepickerWrapper.find('div.minutes-selector').exists()).toBe(true);
        expect(timepickerWrapper.find('div.seconds-selector').exists()).toBe(false);
        expect(timepickerWrapper.find('div.meridiem-selector').exists()).toBe(true);

        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual('AM');

        //test hours selector
        let hoursSelector = timepickerWrapper.find('div.hours-selector');
        let hoursUp = hoursSelector.find('div.hour-up');
        let hoursDown = hoursSelector.find('div.hour-down');

        hoursUp.trigger('click');
        expect(wrapper.vm.hour).toEqual(2);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual('AM');

        hoursDown.trigger('click');
        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual('AM');

        hoursDown.trigger('click');
        expect(wrapper.vm.hour).toEqual(12);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual('AM');
        hoursUp.trigger('click');

        //test minutes selector
        let minutesSelector = timepickerWrapper.find('div.minutes-selector');
        let minutesUp = minutesSelector.find('div.minute-up');
        let minutesDown = minutesSelector.find('div.minute-down');

        minutesUp.trigger('click');
        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(1);
        expect(wrapper.vm.meridiem).toEqual('AM');

        minutesDown.trigger('click');
        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual('AM');

        minutesDown.trigger('click');
        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(59);
        expect(wrapper.vm.meridiem).toEqual('AM');
        minutesUp.trigger('click');
    });

    it('render timepicker with seconds', async () => {
        let wrapper = shallowMount(Timepicker, {
            propsData: {
                showSeconds: true
            },
        });
        expect(wrapper.find('div.fe-timepicker').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker-placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).toBe(false);
        await wrapper.setData({opened: true});
        expect(wrapper.find('div.fe-timepicker').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker-placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).toBe(true);
        let timepickerWrapper = wrapper.find('div.fe-timepicker div.timepicker');
        expect(timepickerWrapper.find('div.hours-selector').exists()).toBe(true);
        expect(timepickerWrapper.find('div.minutes-selector').exists()).toBe(true);
        expect(timepickerWrapper.find('div.seconds-selector').exists()).toBe(true);
        expect(timepickerWrapper.find('div.meridiem-selector').exists()).toBe(true);

        //test seconds selector
        let secondsSelector = timepickerWrapper.find('div.seconds-selector');
        let secondsUp = secondsSelector.find('div.second-up');
        let secondsDown = secondsSelector.find('div.second-down');

        await secondsUp.trigger('click');
        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.second).toEqual(1);
        expect(wrapper.vm.meridiem).toEqual('AM');

        await secondsDown.trigger('click');
        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.second).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual('AM');

        await secondsDown.trigger('click');
        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.second).toEqual(59);
        expect(wrapper.vm.meridiem).toEqual('AM');
    });

    it('render timepicker with 24 hours format', async () => {
        let wrapper = shallowMount(Timepicker, {
            propsData: {
                hourFormat: 24
            },
        });
        expect(wrapper.find('div.fe-timepicker').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker-placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).toBe(false);
        await wrapper.setData({opened: true});
        expect(wrapper.find('div.fe-timepicker').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker-placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).toBe(true);
        let timepickerWrapper = wrapper.find('div.fe-timepicker div.timepicker');
        expect(timepickerWrapper.find('div.hours-selector').exists()).toBe(true);
        expect(timepickerWrapper.find('div.minutes-selector').exists()).toBe(true);
        expect(timepickerWrapper.find('div.seconds-selector').exists()).toBe(false);
        expect(timepickerWrapper.find('div.meridiem-selector').exists()).toBe(false);

        expect(wrapper.vm.hour).toEqual(0);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual(null);

        //test hours selector
        let hoursSelector = timepickerWrapper.find('div.hours-selector');
        let hoursUp = hoursSelector.find('div.hour-up');
        let hoursDown = hoursSelector.find('div.hour-down');

        await hoursUp.trigger('click');
        expect(wrapper.vm.hour).toEqual(1);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual(null);

        await hoursDown.trigger('click');
        expect(wrapper.vm.hour).toEqual(0);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual(null);

        await hoursDown.trigger('click');
        expect(wrapper.vm.hour).toEqual(23);
        expect(wrapper.vm.minute).toEqual(0);
        expect(wrapper.vm.meridiem).toEqual(null);
        await hoursUp.trigger('click');
    });
});
