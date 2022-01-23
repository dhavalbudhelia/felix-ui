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

    it.only('render simple input with icon on left', () => {
        const wrapper = shallowMount(Input, {
            slots: {
                iconBefore: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n' +
                    '</svg>',
            }
        });
        expect(wrapper.find('input').classes()).toContain('fe-input');
        expect(wrapper.find('svg').exists()).toBe(true);
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
