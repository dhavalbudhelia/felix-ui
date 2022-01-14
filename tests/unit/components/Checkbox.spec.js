import {config, mount} from '@vue/test-utils';
import Checkbox from '@/components/Checkbox/Checkbox.vue';
import options from "@/utils/options";

config.global.mocks = {
    $theme: options,
}

describe('Checkbox.vue', () => {
    it('render checked checkbox element', () => {
        let wrapper = mount(Checkbox, {
            propsData: {
                modelValue: true,
            },
            slots: {
                default: 'Bar'
            }
        });
        expect(wrapper.text()).toEqual('Bar');
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
    });

    it('render unchecked checkbox element', () => {
        let wrapper = mount(Checkbox, {
            propsData: {
                modelValue: false,
            },
            slots: {
                default: 'Bar'
            }
        });
        expect(wrapper.text()).toEqual('Bar');
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
    });

    it('render disabled checkbox element', () => {
        let wrapper = mount(Checkbox, {
            propsData: {
                modelValue: true,
                disabled: true
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapper.text()).toEqual('Foo');
        expect(wrapper.find('input[type="checkbox"]:disabled').exists()).toBe(true);
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
    });

    it('changes the checkbox value on click', () => {
        let wrapper = mount(Checkbox, {
            propsData: {
                modelValue: false,
            },
            slots: {
                default: 'Bar'
            }
        });
        expect(wrapper.text()).toEqual('Bar');
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
        wrapper.find('input[type="checkbox"]').setChecked();
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
        wrapper.find('input[type="checkbox"]').setChecked(false);
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
    });
});
