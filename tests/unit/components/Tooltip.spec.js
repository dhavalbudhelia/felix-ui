import {config, shallowMount, mount} from '@vue/test-utils';
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import Button from '@/components/Button/Button.vue';
import options from "@/utils/options";

config.global.mocks = {
    $theme: options,
}

describe('Tooltip.vue', () => {
    it('shows on left side', async () => {
        const wrapper = shallowMount(Tooltip, {
            propsData: {
                position: 'is-left',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        await wrapper.vm.$nextTick();

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).toBe(true);
        expect(tooltipWrapper.text()).toEqual('Tooltip');
        expect(tooltipWrapper.classes()).toContain('fe-tooltip');
        expect(tooltipWrapper.classes()).toContain('is-left');
    });

    it('shows on right side', async () => {
        const wrapper = shallowMount(Tooltip, {
            propsData: {
                position: 'is-right',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        await wrapper.vm.$nextTick();

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).toBe(true);
        expect(tooltipWrapper.text()).toEqual('Tooltip');
        expect(tooltipWrapper.classes()).toContain('fe-tooltip');
        expect(tooltipWrapper.classes()).toContain('is-right');
    });

    it('shows on top side', async () => {
        const wrapper = shallowMount(Tooltip, {
            propsData: {
                position: 'is-top',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        await wrapper.vm.$nextTick();

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).toBe(true);
        expect(tooltipWrapper.text()).toEqual('Tooltip');
        expect(tooltipWrapper.classes()).toContain('fe-tooltip');
        expect(tooltipWrapper.classes()).toContain('is-top');
    });

    it('shows on bottom side', async () => {
        const wrapper = shallowMount(Tooltip, {
            propsData: {
                position: 'is-bottom',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        await wrapper.vm.$nextTick();

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).toBe(true);
        expect(tooltipWrapper.text()).toEqual('Tooltip');
        expect(tooltipWrapper.classes()).toContain('fe-tooltip');
        expect(tooltipWrapper.classes()).toContain('is-bottom');
    });

    it('triggers on click', async () => {
        const wrapper = mount(Tooltip, {
            global: {
                stubs: {
                    'fe-button': Button,
                }
            },
            propsData: {
                position: 'is-right',
                content: 'Tooltip',
                triggerOnClick: true,
                active: false
            },
            slots: {
                default: '<fe-button :plain="true">Show Tooltip</fe-button>'
            }
        });
        let triggerButton = wrapper.find('button');
        await triggerButton.trigger('click');
        await wrapper.setData({opened: true});

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).toBe(true);
        expect(tooltipWrapper.text()).toEqual('Tooltip');
        expect(tooltipWrapper.classes()).toContain('fe-tooltip');
        expect(tooltipWrapper.classes()).toContain('is-right');
    });
});
