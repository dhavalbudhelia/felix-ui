import {config, mount} from '@vue/test-utils';
import Select from '@/components/Select/Select.vue';
import options from "@/utils/options";

config.global.provide = {
    $theme: options,
}

describe('Select.vue', () => {
    it('render simple select', () => {
        const wrapper = mount(Select);
        expect(wrapper.find('select').classes()).toContain('select');
    });

    it('render simple select', () => {
        const wrapper = mount(Select, {
            propsData: {
                options: [
                    {
                        value: 'Foo',
                        label: 'Foo',
                    },
                    {
                        value: 'Bar',
                        label: 'Bar',
                    },
                    {
                        value: 'Boop',
                        label: 'Boop',
                    },
                    {
                        value: 'Cake',
                        label: 'Cake',
                    },
                ],
            },
        });
        expect(wrapper.find('select').classes()).toContain('select');
    });

    it('render disabled select', () => {
        const wrapper = mount(Select, {
            attrs: {
                disabled: true
            }
        });
        expect(wrapper.find('select').classes()).toContain('select');
        expect(wrapper.find('select:disabled').exists()).toBe(true);
        expect(wrapper.find('select:not([disabled])').exists()).toBe(false);
    });

    it('render expanded select', () => {
        const wrapper = mount(Select, {
            attrs: {
                expanded: true
            }
        });
        expect(wrapper.find('select').classes()).toContain('select');
        expect(wrapper.find('div.fe-select').classes()).toContain('w-full');
    });
});
