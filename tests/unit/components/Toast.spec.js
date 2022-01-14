import {config, mount} from '@vue/test-utils';
import Toast from '@/components/Toast/Toast.vue';
import options from "@/utils/options";

config.global.mocks = {
    $theme: options,
}

describe('Toast.vue', () => {
    it('shows toast', async () => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
            },
        });
        await wrapper.vm.$nextTick();
        let toastWrapper = wrapper.find('div.fe-toast-wrapper');
        expect(toastWrapper.isVisible()).toBe(true);
        expect(wrapper.find('div.fe-toast-wrapper').isVisible()).toBe(true);
        let toast = wrapper.find('div.fe-toast');
        expect(toast.isVisible()).toBe(true);
    });

    it('shows toast with close button', async () => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
                closable: true,
            },
        });
        await wrapper.vm.$nextTick();
        let toastCloseButton = wrapper.find('button');
        expect(toastCloseButton.isVisible()).toBe(true);
        await toastCloseButton.trigger('click');
        expect(wrapper.emitted()['update:modelValue'].length).toEqual(1);
    });

    it('hides toast', async (done) => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
            },
        });
        await wrapper.vm.$nextTick();
        let toastWrapper = wrapper.find('div.fe-toast-wrapper');
        expect(toastWrapper.isVisible()).toBe(true);
        await wrapper.setProps({ modelValue: false });
        setTimeout(() => {
            expect(wrapper.find('div.fe-toast-wrapper').exists()).toBe(false);
            done()
        }, 250);
    });

    it('position toast to top left', async () => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
                position: 'top-left',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-toast-wrapper.top-left').exists()).toBe(true);
    });

    it('position toast to top center', async () => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
                position: 'top-center',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-toast-wrapper.top-center').exists()).toBe(true);
    });

    it('position toast to top right', async () => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
                position: 'top-right',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-toast-wrapper.top-right').exists()).toBe(true);
    });

    it('position toast to bottom left', async () => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
                position: 'bottom-left',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-toast-wrapper.bottom-left').exists()).toBe(true);
    });

    it('position toast to bottom center', async () => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
                position: 'bottom-center',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-toast-wrapper.bottom-center').exists()).toBe(true);
    });

    it('position toast to bottom right', async () => {
        const wrapper = mount(Toast, {
            propsData: {
                modelValue: true,
                position: 'bottom-right',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-toast-wrapper.bottom-right').exists()).toBe(true);
    });
});
