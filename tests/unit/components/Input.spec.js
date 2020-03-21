import {expect} from 'chai';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import Icon from '@/components/Icon/Icon.vue';
import Input from '@/components/Input/Input.vue';
import VueLodash from 'vue-lodash';

let localVue = createLocalVue();
localVue.use(VueLodash);

describe('Input.vue', () => {
    it('is called', () => {
        let wrapper = shallowMount(Input, {
            localVue
        });
        expect(wrapper.name()).to.equal('fe-input');
    });

    it('is vue instance', () => {
        const wrapper = shallowMount(Input, {
            localVue
        });
        expect(wrapper.name()).to.equal('fe-input');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('render simple input', () => {
        const wrapper = shallowMount(Input, {
            localVue
        });
        expect(wrapper.find('input').classes()).to.include('fe-input');
    });

    it('render simple input with icon on left', () => {
        const wrapper = shallowMount(Input, {
            localVue,
            propsData: {
                iconPackBefore: 'fas',
                iconBefore: 'user',
            },
            children: [Icon],
            stubs: {
                'fe-icon': Icon
            }
        });
        expect(wrapper.find('input').classes()).to.include('fe-input');
        expect(wrapper.find({name: 'fe-icon'}).isVueInstance()).to.be.true;
        expect(wrapper.find({name: 'fe-icon'}).props().icon).to.equal('user');
        expect(wrapper.find({name: 'fe-icon'}).props().iconPack).to.equal('fas');
    });

    it('render disabled input', () => {
        const wrapper = shallowMount(Input, {
            localVue,
            attrs: {
                disabled: true
            }
        });
        expect(wrapper.find('input').classes()).to.include('fe-input');
        expect(wrapper.find('input:disabled').exists()).to.be.true;
        expect(wrapper.find('input:not([disabled])').exists()).to.be.false;
    });

    it('render simple textarea', () => {
        const wrapper = shallowMount(Input, {
            localVue,
            propsData: {
                type: 'textarea',
            },
        });
        expect(wrapper.find('textarea').classes()).to.include('fe-input');
    });
});
