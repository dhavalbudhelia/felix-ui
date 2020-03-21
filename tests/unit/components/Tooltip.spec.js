import {expect} from 'chai';
import {createLocalVue, shallowMount, mount} from '@vue/test-utils';
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import Button from '@/components/Button/Button.vue';

let localVue = createLocalVue();

describe('Tooltip.vue', () => {
    it('is called', () => {
        let wrapper = shallowMount(Tooltip, {
            propsData: {
                value: '',
                localValue: ''
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');
    });

    it('is vue instance', () => {
        const wrapper = shallowMount(Tooltip);
        expect(wrapper.name()).to.equal('fe-tooltip');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('shows on left side', () => {
        const wrapper = shallowMount(Tooltip, {
            localVue,
            children: [Button],
            propsData: {
                position: 'is-left',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).to.be.true;
        expect(tooltipWrapper.text()).to.be.equal('Tooltip');
        expect(tooltipWrapper.classes()).to.include('fe-tooltip');
        expect(tooltipWrapper.classes()).to.include('is-left');
    });

    it('shows on right side', () => {
        const wrapper = shallowMount(Tooltip, {
            localVue,
            children: [Button],
            propsData: {
                position: 'is-right',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).to.be.true;
        expect(tooltipWrapper.text()).to.be.equal('Tooltip');
        expect(tooltipWrapper.classes()).to.include('fe-tooltip');
        expect(tooltipWrapper.classes()).to.include('is-right');
    });

    it('shows on top side', () => {
        const wrapper = shallowMount(Tooltip, {
            localVue,
            children: [Button],
            propsData: {
                position: 'is-top',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).to.be.true;
        expect(tooltipWrapper.text()).to.be.equal('Tooltip');
        expect(tooltipWrapper.classes()).to.include('fe-tooltip');
        expect(tooltipWrapper.classes()).to.include('is-top');
    });

    it('shows on bottom side', () => {
        const wrapper = shallowMount(Tooltip, {
            localVue,
            children: [Button],
            propsData: {
                position: 'is-bottom',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).to.be.true;
        expect(tooltipWrapper.text()).to.be.equal('Tooltip');
        expect(tooltipWrapper.classes()).to.include('fe-tooltip');
        expect(tooltipWrapper.classes()).to.include('is-bottom');
    });

    it('shows extra small tooltip', () => {
        const wrapper = shallowMount(Tooltip, {
            localVue,
            children: [Button],
            propsData: {
                position: 'is-right',
                size: 'is-xs',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).to.be.true;
        expect(tooltipWrapper.text()).to.be.equal('Tooltip');
        expect(tooltipWrapper.classes()).to.include('fe-tooltip');
        expect(tooltipWrapper.classes()).to.include('is-right');
        expect(tooltipWrapper.classes()).to.include('is-xs');
    });

    it('shows small tooltip', () => {
        const wrapper = shallowMount(Tooltip, {
            localVue,
            children: [Button],
            propsData: {
                position: 'is-right',
                size: 'is-sm',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).to.be.true;
        expect(tooltipWrapper.text()).to.be.equal('Tooltip');
        expect(tooltipWrapper.classes()).to.include('fe-tooltip');
        expect(tooltipWrapper.classes()).to.include('is-right');
        expect(tooltipWrapper.classes()).to.include('is-sm');
    });

    it('shows large tooltip', () => {
        const wrapper = shallowMount(Tooltip, {
            localVue,
            children: [Button],
            propsData: {
                position: 'is-right',
                size: 'is-lg',
                content: 'Tooltip',
                active: true
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).to.be.true;
        expect(tooltipWrapper.text()).to.be.equal('Tooltip');
        expect(tooltipWrapper.classes()).to.include('fe-tooltip');
        expect(tooltipWrapper.classes()).to.include('is-right');
        expect(tooltipWrapper.classes()).to.include('is-lg');
    });

    it('triggers on click', () => {
        const wrapper = mount(Tooltip, {
            localVue,
            propsData: {
                position: 'is-right',
                size: 'is-lg',
                content: 'Tooltip',
                triggerOnClick: true,
                active: false
            },
            stubs: {
                'fe-button': Button,
            },
            slots: {
                default: '<Button :plain="true">Show Tooltip</Button>'
            }
        });
        expect(wrapper.name()).to.equal('fe-tooltip');
        let triggerButton = wrapper.find('button');
        triggerButton.trigger('click');

        let tooltipWrapper = wrapper.find('div.fe-tooltip');
        expect(tooltipWrapper.isVisible()).to.be.true;
        expect(tooltipWrapper.text()).to.be.equal('Tooltip');
        expect(tooltipWrapper.classes()).to.include('fe-tooltip');
        expect(tooltipWrapper.classes()).to.include('is-right');
        expect(tooltipWrapper.classes()).to.include('is-lg');
    });
});
