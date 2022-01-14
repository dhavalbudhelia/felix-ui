import {config, mount} from '@vue/test-utils';
import Spinner from '@/components/Spinner/Spinner.vue';
import options from "@/utils/options";

config.global.mocks = {
    $theme: options,
}

describe('Spinner.vue', () => {
    it('shows spinner', async () => {
        const wrapper = mount(Spinner, {
            propsData: {
                modelValue: true,
            },
        });
        await wrapper.setData({spinning: true});
        let spinnerWrapper = wrapper.find('div.fe-spinner');
        expect(spinnerWrapper.isVisible()).toBe(true);
    });

    it('hides spinner', async () => {
        const wrapper = mount(Spinner, {
            propsData: {
                modelValue: true,
            },
        });
        await wrapper.setData({spinning: true});
        let spinnerWrapper = wrapper.find('div.fe-spinner');
        expect(spinnerWrapper.isVisible()).toBe(true);
        await wrapper.setProps({ modelValue: false });
        expect(wrapper.find('div.fe-spinner').exists()).toBe(false);
    });

    it('shows custom spinner', async () => {
        const wrapper = mount(Spinner, {
            propsData: {
                modelValue: true,
            },
            slots: {
                default: '<i class="custom-spinner fas fa-4x fa-spinner text-red-500 opacity-100"></i>'
            },
        });
        await wrapper.setData({spinning: true});
        let spinnerWrapper = wrapper.find('div.fe-spinner');
        expect(spinnerWrapper.isVisible()).toBe(true);
        expect(wrapper.find('.custom-spinner').exists()).toBe(true);
    });
});
