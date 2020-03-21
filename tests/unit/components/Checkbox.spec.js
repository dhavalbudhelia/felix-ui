import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import Checkbox from '@/components/Checkbox/Checkbox.vue';

describe('Checkbox.vue', () => {
    it('is called', () => {
        let wrapper = shallowMount(Checkbox, {
            propsData: {
                value: '',
                localValue: ''
            }
        });
        expect(wrapper.name()).to.equal('fe-checkbox');
    });

    it('is vue instance', () => {
        const wrapper = shallowMount(Checkbox);
        expect(wrapper.name()).to.equal('fe-checkbox');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('render checked checkbox element', () => {
        let value = true;
        let localValue = 'Foo';
        let wrapper = shallowMount(Checkbox, {
            propsData: {
                value: value,
                localValue: localValue
            },
            slots: {
                default: 'Bar'
            }
        });
        expect(wrapper.text()).to.equal('Bar');
        expect(wrapper.find('input[type="checkbox"]:checked').is('input')).to.be.true;
    });

    it('render unchecked checkbox element', () => {
        let value = false;
        let localValue = 'Foo';
        let wrapper = shallowMount(Checkbox, {
            propsData: {
                value: value,
                localValue: localValue
            },
            slots: {
                default: 'Bar'
            }
        });
        expect(wrapper.text()).to.equal('Bar');
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.false;
    });

    it('render disabled checkbox element', () => {
        let value = true;
        let localValue = 'Foo';
        let wrapper = shallowMount(Checkbox, {
            propsData: {
                value: value,
                localValue: localValue,
                disabled: true
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapper.text()).to.equal('Foo');
        expect(wrapper.find('input[type="checkbox"]:disabled').is('input')).to.be.true;
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.true;
    });

    it('changes the checkbox value on click', () => {
        let value = false;
        let localValue = 'Foo';
        let wrapper = shallowMount(Checkbox, {
            propsData: {
                value: value,
                localValue: localValue
            },
            slots: {
                default: 'Bar'
            }
        });
        expect(wrapper.text()).to.equal('Bar');
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.false;
        wrapper.find('input[type="checkbox"]').setChecked();
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.true;
        wrapper.find('input[type="checkbox"]').setChecked(false);
        expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.false;
    });
});
