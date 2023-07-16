import {config, mount} from '@vue/test-utils';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch.vue';
import options from "@/utils/options";

config.global.provide = {
    $theme: options,
}

describe('ToggleSwitch.vue', () => {
    it('render checked switch element', () => {
        let wrapper = mount(ToggleSwitch, {
            propsData: {
                modelValue: true,
            },
        });
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
    });

    it('render unchecked switch element', () => {
        let wrapper = mount(ToggleSwitch, {
            propsData: {
                modelValue: false,
            },
        });
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
    });

    it('render disabled checkbox element', () => {
        let wrapper = mount(ToggleSwitch, {
            propsData: {
                modelValue: true,
                disabled: true
            },
        });
        expect(wrapper.find('input[type="checkbox"]:disabled').exists()).toBe(true);
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
    });

    it('changes the switch value on click', () => {
        let wrapper = mount(ToggleSwitch, {
            propsData: {
                modelValue: false,
            },
        });
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
        wrapper.find('input[type="checkbox"]').setChecked();
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
        wrapper.find('input[type="checkbox"]').setChecked(false);
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
    });

});
