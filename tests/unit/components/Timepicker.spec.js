import {expect} from 'chai';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import Timepicker from '@/components/Timepicker/Timepicker.vue';
import VueLodash from "vue-lodash";

let localVue = createLocalVue();
localVue.use(VueLodash);

describe('Timepicker.vue', () => {
    it('is called', () => {
        let wrapper = shallowMount(Timepicker, {
            localVue,
        });
        expect(wrapper.name()).to.equal('fe-timepicker');
    });

    it('is vue instance', () => {
        let wrapper = shallowMount(Timepicker, {
            localVue,
        });
        expect(wrapper.name()).to.equal('fe-timepicker');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('render simple timepicker', () => {
        let wrapper = shallowMount(Timepicker, {
            localVue,
        });
        expect(wrapper.find('div.fe-timepicker').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker-input-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).to.be.false;
        wrapper.setData({opened: true});
        expect(wrapper.find('div.fe-timepicker').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker-input-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).to.be.true;
        let timepickerWrapper = wrapper.find('div.fe-timepicker div.timepicker');
        expect(timepickerWrapper.find('div.hours-selector').exists()).to.be.true;
        expect(timepickerWrapper.find('div.minutes-selector').exists()).to.be.true;
        expect(timepickerWrapper.find('div.seconds-selector').exists()).to.be.false;
        expect(timepickerWrapper.find('div.meridiem-selector').exists()).to.be.true;

        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal('AM');

        //test hours selector
        let hoursSelector = timepickerWrapper.find('div.hours-selector');
        let hoursUp = hoursSelector.find('div.hour-up');
        let hoursDown = hoursSelector.find('div.hour-down');

        hoursUp.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(2);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal('AM');

        hoursDown.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal('AM');

        hoursDown.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(12);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal('AM');
        hoursUp.trigger('click');

        //test minutes selector
        let minutesSelector = timepickerWrapper.find('div.minutes-selector');
        let minutesUp = minutesSelector.find('div.minute-up');
        let minutesDown = minutesSelector.find('div.minute-down');

        minutesUp.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(1);
        expect(wrapper.vm.meridiem).to.be.equal('AM');

        minutesDown.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal('AM');

        minutesDown.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(59);
        expect(wrapper.vm.meridiem).to.be.equal('AM');
        minutesUp.trigger('click');
    });

    it('render timepicker with seconds', () => {
        let wrapper = shallowMount(Timepicker, {
            localVue,
            propsData: {
                showSeconds: true
            },
        });
        expect(wrapper.find('div.fe-timepicker').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker-input-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).to.be.false;
        wrapper.setData({opened: true});
        expect(wrapper.find('div.fe-timepicker').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker-input-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).to.be.true;
        let timepickerWrapper = wrapper.find('div.fe-timepicker div.timepicker');
        expect(timepickerWrapper.find('div.hours-selector').exists()).to.be.true;
        expect(timepickerWrapper.find('div.minutes-selector').exists()).to.be.true;
        expect(timepickerWrapper.find('div.seconds-selector').exists()).to.be.true;
        expect(timepickerWrapper.find('div.meridiem-selector').exists()).to.be.true;

        //test seconds selector
        let secondsSelector = timepickerWrapper.find('div.seconds-selector');
        let secondsUp = secondsSelector.find('div.second-up');
        let secondsDown = secondsSelector.find('div.second-down');

        secondsUp.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.second).to.be.equal(1);
        expect(wrapper.vm.meridiem).to.be.equal('AM');

        secondsDown.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.second).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal('AM');

        secondsDown.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.second).to.be.equal(59);
        expect(wrapper.vm.meridiem).to.be.equal('AM');
    });

    it('render timepicker with 24 hours format', () => {
        let wrapper = shallowMount(Timepicker, {
            localVue,
            propsData: {
                hourFormat: 24
            },
        });
        expect(wrapper.find('div.fe-timepicker').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker-input-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).to.be.false;
        wrapper.setData({opened: true});
        expect(wrapper.find('div.fe-timepicker').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker-input-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.fe-timepicker div.timepicker').exists()).to.be.true;
        let timepickerWrapper = wrapper.find('div.fe-timepicker div.timepicker');
        expect(timepickerWrapper.find('div.hours-selector').exists()).to.be.true;
        expect(timepickerWrapper.find('div.minutes-selector').exists()).to.be.true;
        expect(timepickerWrapper.find('div.seconds-selector').exists()).to.be.false;
        expect(timepickerWrapper.find('div.meridiem-selector').exists()).to.be.false;

        expect(wrapper.vm.hour).to.be.equal(0);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal(null);

        //test hours selector
        let hoursSelector = timepickerWrapper.find('div.hours-selector');
        let hoursUp = hoursSelector.find('div.hour-up');
        let hoursDown = hoursSelector.find('div.hour-down');

        hoursUp.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(1);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal(null);

        hoursDown.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(0);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal(null);

        hoursDown.trigger('click');
        expect(wrapper.vm.hour).to.be.equal(23);
        expect(wrapper.vm.minute).to.be.equal(0);
        expect(wrapper.vm.meridiem).to.be.equal(null);
        hoursUp.trigger('click');
    });
});
