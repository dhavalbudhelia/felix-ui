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
            propsData: {
                iconPackBefore: 'fas',
                iconBefore: 'user',
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('Foo');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().icon).toEqual('user');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().iconPack).toEqual('fas');
    });

    it('render button with a fontawesome icon on right', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                iconPackAfter: 'fas',
                iconAfter: 'user',
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('Foo');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().icon).toEqual('user');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().iconPack).toEqual('fas');
    });

    it('render button with a fontawesome icon on left and right', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                iconPackBefore: 'fas',
                iconBefore: 'globe-americas',
                iconPackAfter: 'fas',
                iconAfter: 'user',
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('Foo');
        expect(wrapper.findAllComponents({name: 'fe-icon'})[0].props().icon).toEqual('globe-americas');
        expect(wrapper.findAllComponents({name: 'fe-icon'})[0].props().iconPack).toEqual('fas');
        expect(wrapper.findAllComponents({name: 'fe-icon'})[1].props().icon).toEqual('user');
        expect(wrapper.findAllComponents({name: 'fe-icon'})[1].props().iconPack).toEqual('fas');
    });

    it('render a fontawesome icon only button', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                iconPack: 'fas',
                icon: 'globe-americas',
                iconOnly: true,
            },
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().icon).toEqual('globe-americas');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().iconPack).toEqual('fas');
    });

    it('render inverted button', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                iconPackBefore: 'fas',
                iconBefore: 'globe-americas',
                inverted: true,
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapper.find('button').classes()).toContain('fe-button');
        expect(wrapper.find('button').text()).toContain('Foo');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().icon).toEqual('globe-americas');
        expect(wrapper.findComponent({name: 'fe-icon'}).props().iconPack).toEqual('fas');
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
