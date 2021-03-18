import {config, shallowMount} from '@vue/test-utils';
import Icon from '@/components/Icon/Icon.vue';
import options from "@/utils/options";

config.global.mocks = {
    $theme: options,
}

describe('Icon.vue', () => {
    it('render icon when icon prop is supplied', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                icon: 'user',
            }
        });
        expect(wrapper.find('i').classes()).toContain('fa-user');
        expect(wrapper.find('i').classes()).toContain('fas');
    });

    it('render icon when icon and icon pack prop is supplied', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                iconPack: 'fas',
                icon: 'user',
            }
        });
        expect(wrapper.find('i').classes()).toContain('fa-user');
        expect(wrapper.find('i').classes()).toContain('fas');
    });

    it('render small size icon when icon prop is supplied', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                iconPack: 'fas',
                icon: 'user',
                size: 'is-sm'
            }
        });
        expect(wrapper.find('i').classes()).toContain('fa-user');
        expect(wrapper.find('i').classes()).toContain('fas');
    });

    it('render medium size icon when icon prop is supplied', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                iconPack: 'fas',
                icon: 'user',
                size: 'is-lg'
            }
        });
        expect(wrapper.find('i').classes()).toContain('fa-user');
        expect(wrapper.find('i').classes()).toContain('fas');
        expect(wrapper.find('i').classes()).toContain('fa-lg');
    });

    it('render large size icon when icon prop is supplied', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                iconPack: 'fas',
                icon: 'user',
                size: 'is-2x'
            }
        });
        expect(wrapper.find('i').classes()).toContain('fa-user');
        expect(wrapper.find('i').classes()).toContain('fas');
        expect(wrapper.find('i').classes()).toContain('fa-2x');
    });

    it('render extra large size icon when icon prop is supplied', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                iconPack: 'fas',
                icon: 'user',
                size: 'is-3x'
            }
        });
        expect(wrapper.find('i').classes()).toContain('fa-user');
        expect(wrapper.find('i').classes()).toContain('fas');
        expect(wrapper.find('i').classes()).toContain('fa-3x');
    });
});
