import {config, shallowMount} from '@vue/test-utils';
import Button from '@/components/Button/Button.vue';
import options from "@/utils/options";

config.global.mocks = {
    $theme: options,
}

describe('Button.vue', () => {
    it('render simple button', () => {
        const wrapper = shallowMount(Button);
        expect(wrapper.find('button').classes()).toContain('fe-button');
    });

    it('render button with a fontawesome icon on left', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'Foo',
                iconBefore: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n' +
                    '</svg>',
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('Foo');
        expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('render button with a fontawesome icon on right', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'Foo',
                iconAfter: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n' +
                    '</svg>',
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('Foo');
        expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('render button with a fontawesome icon on left and right', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'Foo',
                iconBefore: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n' +
                    '</svg>',
                iconAfter: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n' +
                    '</svg>',
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('Foo');
        expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('render a fontawesome icon only button', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                iconOnly: true,
            },
            slots: {
                default: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n' +
                    '</svg>',
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('');
        expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('render inverted button', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                inverted: true,
            },
            slots: {
                default: 'Foo',
                iconBefore: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n' +
                    '</svg>',
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('Foo');
        expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('render disabled button', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                disabled: true,
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button:disabled').exists()).toBe(true);
        expect(wrapper.find('button:not([disabled])').exists()).toBe(false);
    });
});
