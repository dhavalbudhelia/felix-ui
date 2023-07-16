import {config, mount} from '@vue/test-utils';
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import options from "@/utils/options";
import {afterEach, beforeEach, vi} from 'vitest';

config.global.provide = {
    $theme: options,
}

describe('Tooltip.vue', () => {
    const transitionStub = () => ({
        render: function () {
            return this.$options._renderChildren
        }
    });

    beforeEach(() => {
        // tell vitest we use mocked time
        vi.useFakeTimers()
    })

    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers()
    });

    it('shows on left side', async () => {
        const wrapper = mount(Tooltip, {
            propsData: {
                position: 'is-left',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<button type="button">Show Tooltip</button>'
            },
        });
        await wrapper.vm.$nextTick();

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).toBe(true);
        expect(tooltipWrapper.text()).toEqual('Tooltip');
        expect(tooltipWrapper.classes()).toContain('fe-tooltip');
        expect(tooltipWrapper.classes()).toContain('is-left');
    });

    it('shows on right side', async () => {
        const wrapper = mount(Tooltip, {
            propsData: {
                position: 'is-right',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<button type="button">Show Tooltip</button>'
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
        const wrapper = mount(Tooltip, {
            propsData: {
                position: 'is-top',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<button type="button">Show Tooltip</button>'
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
        const wrapper = mount(Tooltip, {
            propsData: {
                position: 'is-bottom',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<button type="button">Show Tooltip</button>'
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
            propsData: {
                position: 'is-right',
                content: 'Tooltip',
                triggerOnClick: true,
                active: false
            },
            slots: {
                default: '<button type="button">Show Tooltip</button>'
            },
            stubs: {
                transition: transitionStub()
            },
        });
        let triggerButton = wrapper.find('button');
        await triggerButton.trigger('click');
        wrapper.vm.hovered(true);
        wrapper.vm.onTrigger();
        vi.runAllTimers()
        await wrapper.vm.$nextTick();
        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).toBe(true);
        expect(tooltipWrapper.text()).toEqual('Tooltip');
        expect(tooltipWrapper.classes()).toContain('fe-tooltip');
        expect(tooltipWrapper.classes()).toContain('is-right');
    });
});
