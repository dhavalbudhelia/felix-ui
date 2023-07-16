import {config,shallowMount, mount} from '@vue/test-utils';
import Modal from '@/components/Modal/Modal.vue';
import options from "@/utils/options";

config.global.provide = {
    $theme: options,
}

describe('Modal.vue', () => {
    it('render default modal', async () => {
        const wrapper = mount(Modal, {
            propsData: {
                modelValue: true
            },
        });
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(true);
        wrapper.setProps({modelValue: false});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(false);
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(false);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(false);
    });

    it('render modal with no footer', async () => {
        const wrapper = shallowMount(Modal, {
            propsData: {
                modelValue: true,
                showFooter: false,
            },
        });
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(false);
        wrapper.setProps({modelValue: false});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(false);
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(false);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(false);
    });

    it('render modal with custom footer slot', async () => {
        const wrapper = mount(Modal, {
            propsData: {
                modelValue: true,
            },
            slots: {
                footer: '<template #footer><span>Custom Footer Content</span></template>'
            }
        });
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-footer').text()).toEqual('Custom Footer Content');
        wrapper.setProps({modelValue: false});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(false);
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(false);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(false);
    });

    it('render modal with custom header slot', async () => {
        const wrapper = mount(Modal, {
            propsData: {
                modelValue: true,
            },
            slots: {
                header: '<template #header><span>Custom Header Content</span></template>'
            }
        });
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-header').text()).toEqual('Custom Header Content');
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(true);
        wrapper.setProps({modelValue: false});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(false);
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(false);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(false);

    });

    it('closes modal on escape', () => {
        const wrapper = mount(Modal, {
            attachedToDocument: true,
            propsData: {
                modelValue: true,
                closeOnEscape: true
            },
        });
        expect(wrapper.find('div.fe-modal-header').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-body').exists()).toBe(true);
        expect(wrapper.find('div.fe-modal-footer').exists()).toBe(true);

        wrapper.trigger('keydown', {
            keyCode: 27,
            key: 'Escape'
        });
        expect(wrapper.emitted()['update:modelValue'].length).toEqual(1);
    });
});
