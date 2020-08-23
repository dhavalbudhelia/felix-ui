import {expect} from 'chai';
import {createLocalVue, mount} from '@vue/test-utils';
import Toast from '@/components/Toast/Toast.vue';

let localVue = createLocalVue();

describe('Toast.vue', () => {
    it('is called', () => {
        let wrapper = mount(Toast, {
            propsData: {
                value: false,
            }
        });
        expect(wrapper.name()).to.equal('fe-toast');
    });

    it('is vue instance', () => {
        const wrapper = mount(Toast);
        expect(wrapper.name()).to.equal('fe-toast');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('shows toast', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        let toastWrapper = wrapper.find('div.fe-toast-wrapper');
        expect(toastWrapper.isVisible()).to.be.true;
        expect(wrapper.find('div.fe-toast-wrapper.show').exists()).to.be.true;
        let toast = wrapper.find('div.fe-toast');
        expect(toast.isVisible()).to.be.true;
    });

    it('shows toast with close button', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
                closable: true,
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        let toastCloseButton = wrapper.find('button');
        expect(toastCloseButton.isVisible()).to.be.true;
        toastCloseButton.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().input[0][0]).to.be.equals(false);
    });

    it('hides toast', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        let toastWrapper = wrapper.find('div.fe-toast-wrapper');
        expect(toastWrapper.isVisible()).to.be.true;
        await wrapper.setProps({ value: false });
        expect(wrapper.find('div.fe-toast-wrapper.show').exists()).to.be.false;
        expect(wrapper.find('div.fe-toast-wrapper.hide').exists()).to.be.true;
    });

    it('position toast to top left', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
                position: 'top-left',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        expect(wrapper.find('div.fe-toast-wrapper.show.top-left').exists()).to.be.true;
    });

    it('position toast to top center', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
                position: 'top-center',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        expect(wrapper.find('div.fe-toast-wrapper.show.top-center').exists()).to.be.true;
    });

    it('position toast to top right', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
                position: 'top-right',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        expect(wrapper.find('div.fe-toast-wrapper.show.top-right').exists()).to.be.true;
    });

    it('position toast to bottom left', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
                position: 'bottom-left',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        expect(wrapper.find('div.fe-toast-wrapper.show.bottom-left').exists()).to.be.true;
    });

    it('position toast to bottom center', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
                position: 'bottom-center',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        expect(wrapper.find('div.fe-toast-wrapper.show.bottom-center').exists()).to.be.true;
    });

    it('position toast to bottom right', async () => {
        const wrapper = mount(Toast, {
            localVue,
            propsData: {
                value: true,
                position: 'bottom-right',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-toast');
        expect(wrapper.find('div.fe-toast-wrapper.show.bottom-right').exists()).to.be.true;
    });
});
