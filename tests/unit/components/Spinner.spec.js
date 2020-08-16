import {expect} from 'chai';
import {createLocalVue, mount} from '@vue/test-utils';
import Spinner from '@/components/Spinner/Spinner.vue';

let localVue = createLocalVue();

describe('Spinner.vue', () => {
    it('is called', () => {
        let wrapper = mount(Spinner, {
            propsData: {
                value: false,
            }
        });
        expect(wrapper.name()).to.equal('fe-spinner');
    });

    it('is vue instance', () => {
        const wrapper = mount(Spinner);
        expect(wrapper.name()).to.equal('fe-spinner');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('shows spinner', async () => {
        const wrapper = mount(Spinner, {
            localVue,
            propsData: {
                value: true,
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-spinner');
        let spinnerWrapper = wrapper.find('div.fe-spinner');
        expect(spinnerWrapper.isVisible()).to.be.true;
    });

    it('hides spinner', async () => {
        const wrapper = mount(Spinner, {
            localVue,
            propsData: {
                value: true,
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-spinner');
        let spinnerWrapper = wrapper.find('div.fe-spinner');
        expect(spinnerWrapper.isVisible()).to.be.true;
        await wrapper.setProps({ value: false });
        expect(wrapper.find('div.fe-spinner').exists()).to.be.false;
    });

    it('shows custom spinner', async () => {
        const wrapper = mount(Spinner, {
            localVue,
            propsData: {
                value: true,
            },
            slots: {
                default: '<i class="custom-spinner fas fa-4x fa-spinner text-red-500 opacity-100"></i>'
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.name()).to.equal('fe-spinner');
        let spinnerWrapper = wrapper.find('div.fe-spinner');
        expect(spinnerWrapper.isVisible()).to.be.true;
        expect(wrapper.find('.custom-spinner').exists()).to.be.true;
    });
});
