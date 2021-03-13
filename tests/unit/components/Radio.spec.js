// import {expect} from 'chai';
// import {shallowMount} from '@vue/test-utils';
// import Radio from '@/components/Radio/Radio.vue';
//
// describe('Radio.vue', () => {
//     it('is called', () => {
//         let wrapper = shallowMount(Radio, {
//             propsData: {
//                 value: '',
//                 localValue: ''
//             }
//         });
//         expect(wrapper.name()).to.equal('fe-radio');
//     });
//
//     it('is vue instance', () => {
//         const wrapper = shallowMount(Radio, {
//             propsData: {
//                 value: '',
//                 localValue: ''
//             }
//         });
//         expect(wrapper.name()).to.equal('fe-radio');
//         expect(wrapper.isVueInstance()).to.be.true;
//     });
//
//     it('render selected radio element', () => {
//         let value = 'Foo';
//         let localValue = 'Foo';
//         let wrapper = shallowMount(Radio, {
//             propsData: {
//                 value: value,
//                 localValue: localValue
//             },
//             slots: {
//                 default: 'Bar'
//             }
//         });
//         expect(wrapper.text()).to.equal('Bar');
//         expect(wrapper.find('input[type="radio"]:checked').is('input')).to.be.true;
//     });
//
//     it('render unselected radio element', () => {
//         let value = 'Bar';
//         let localValue = 'Foo';
//         let wrapper = shallowMount(Radio, {
//             propsData: {
//                 value: value,
//                 localValue: localValue
//             },
//             slots: {
//                 default: 'Bar'
//             }
//         });
//         expect(wrapper.text()).to.equal('Bar');
//         expect(wrapper.find('input[type="radio"]:checked').exists()).to.be.false;
//     });
//
//     it('render disabled radio element', () => {
//         let value = 'Foo';
//         let localValue = 'Foo';
//         let wrapper = shallowMount(Radio, {
//             propsData: {
//                 value: value,
//                 localValue: localValue,
//                 disabled: true
//             },
//             slots: {
//                 default: 'Foo'
//             }
//         });
//         expect(wrapper.text()).to.equal('Foo');
//         expect(wrapper.find('input[type="radio"]:disabled').is('input')).to.be.true;
//         expect(wrapper.find('input[type="radio"]:checked').exists()).to.be.true;
//     });
//
//     it('changes the radio value on selection', async () => {
//         let checkboxName = 'FooBar';
//         let wrapperBar = shallowMount(Radio, {
//             propsData: {
//                 value: 'Foo',
//                 localValue: 'Bar',
//                 name: checkboxName
//             },
//             slots: {
//                 default: 'Bar'
//             }
//         });
//         let wrapperFoo = shallowMount(Radio, {
//             propsData: {
//                 value: 'Foo',
//                 localValue: 'Foo',
//                 name: checkboxName
//             },
//             slots: {
//                 default: 'Foo'
//             }
//         });
//         expect(wrapperBar.text()).to.equal('Bar');
//         expect(wrapperFoo.text()).to.equal('Foo');
//         expect(wrapperFoo.find('input[type="radio"]:checked').exists()).to.be.true;
//         expect(wrapperBar.find('input[type="radio"]:checked').exists()).to.be.false;
//         wrapperBar.setProps({
//             value: 'Bar'
//         });
//         await wrapperBar.vm.$nextTick();
//         wrapperFoo.setProps({
//             value: 'Bar'
//         });
//         await wrapperFoo.vm.$nextTick();
//         expect(wrapperBar.find('input[type="radio"]:checked').exists()).to.be.true;
//         expect(wrapperFoo.find('input[type="radio"]:checked').exists()).to.be.false;
//
//         wrapperBar.setProps({
//             value: 'Foo'
//         });
//         await wrapperBar.vm.$nextTick();
//         wrapperFoo.setProps({
//             value: 'Foo'
//         });
//         await wrapperFoo.vm.$nextTick();
//         expect(wrapperFoo.find('input[type="radio"]:checked').exists()).to.be.true;
//         expect(wrapperBar.find('input[type="radio"]:checked').exists()).to.be.false;
//     });
//
// });
