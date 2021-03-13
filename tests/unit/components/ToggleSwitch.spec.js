// import {expect} from 'chai';
// import {shallowMount} from '@vue/test-utils';
// import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch.vue';
//
// describe('ToggleSwitch.vue', () => {
//     it('is called', () => {
//         let wrapper = shallowMount(ToggleSwitch, {
//             propsData: {
//                 value: '',
//                 localValue: ''
//             }
//         });
//         expect(wrapper.name()).to.equal('fe-toggle-switch');
//     });
//
//     it('is vue instance', () => {
//         const wrapper = shallowMount(ToggleSwitch);
//         expect(wrapper.name()).to.equal('fe-toggle-switch');
//         expect(wrapper.isVueInstance()).to.be.true;
//     });
//
//     it('render checked switch element', () => {
//         let value = true;
//         let localValue = 'Foo';
//         let wrapper = shallowMount(ToggleSwitch, {
//             propsData: {
//                 value: value,
//                 localValue: localValue
//             }
//         });
//         expect(wrapper.find('input[type="checkbox"]:checked').is('input')).to.be.true;
//     });
//
//     it('render unchecked switch element', () => {
//         let value = false;
//         let localValue = 'Foo';
//         let wrapper = shallowMount(ToggleSwitch, {
//             propsData: {
//                 value: value,
//                 localValue: localValue
//             }
//         });
//         expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.false;
//     });
//
//     it('render disabled checkbox element', () => {
//         let value = true;
//         let localValue = 'Foo';
//         let wrapper = shallowMount(ToggleSwitch, {
//             propsData: {
//                 value: value,
//                 localValue: localValue,
//                 disabled: true
//             }
//         });
//         expect(wrapper.find('input[type="checkbox"]:disabled').is('input')).to.be.true;
//         expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.true;
//     });
//
//     it('changes the switch value on click', () => {
//         let value = false;
//         let localValue = 'Foo';
//         let wrapper = shallowMount(ToggleSwitch, {
//             propsData: {
//                 value: value,
//                 localValue: localValue
//             }
//         });
//         expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.false;
//         wrapper.find('input[type="checkbox"]').setChecked();
//         expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.true;
//         wrapper.find('input[type="checkbox"]').setChecked(false);
//         expect(wrapper.find('input[type="checkbox"]:checked').exists()).to.be.false;
//     });
//
// });
