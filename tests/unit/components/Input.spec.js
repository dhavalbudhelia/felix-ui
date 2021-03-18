import {config, shallowMount} from '@vue/test-utils';
import Input from '@/components/Input/Input.vue';
import options from "@/utils/options";

config.global.mocks = {
    $theme: options,
}

describe('Input.vue', () => {
    it('render simple input', () => {
        const wrapper = shallowMount(Input);
        expect(wrapper.find('input').classes()).toContain('fe-input');
    });

    it('render simple input with icon on left', () => {
        const wrapper = shallowMount(Input, {
            propsData: {
                iconPackBefore: 'fas',
                iconBefore: 'user',
            },
        });
        expect(wrapper.find('input').classes()).toContain('fe-input');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().icon).toEqual('user');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().iconPack).toEqual('fas');
    });

    it('render disabled input', () => {
        const wrapper = shallowMount(Input, {
            attrs: {
                disabled: true
            }
        });
        expect(wrapper.find('input').classes()).toContain('fe-input');
        expect(wrapper.find('input:disabled').exists()).toBe(true);
        expect(wrapper.find('input:not([disabled])').exists()).toBe(false);
    });

    it('render simple textarea', () => {
        const wrapper = shallowMount(Input, {
            propsData: {
                type: 'textarea',
            },
        });
        expect(wrapper.find('textarea').classes()).toContain('fe-input');
    });
});
