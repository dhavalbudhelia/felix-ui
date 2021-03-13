// import {expect} from 'chai';
// import {shallowMount} from '@vue/test-utils';
// import Button from '@/components/Button/Button.vue';
// import Icon from '@/components/Icon/Icon.vue';
//
// describe('Button.vue', () => {
//     it('is called', () => {
//         let wrapper = shallowMount(Button);
//         expect(wrapper.name()).to.equal('fe-button');
//     });
//
//     it('is vue instance', () => {
//         const wrapper = shallowMount(Button);
//         expect(wrapper.name()).to.equal('fe-button');
//         expect(wrapper.isVueInstance()).to.be.true;
//     });
//
//     it('render simple button', () => {
//         const wrapper = shallowMount(Button);
//         expect(wrapper.find('button').classes()).to.include('fe-button');
//     });
//
//     it('render button with a fontawesome icon on left', () => {
//         const wrapper = shallowMount(Button, {
//             propsData: {
//                 iconPackBefore: 'fas',
//                 iconBefore: 'user',
//             },
//             children: [Icon],
//             stubs: {
//                 'fe-icon': Icon
//             },
//             slots: {
//                 default: 'Foo'
//             }
//         });
//         expect(wrapper.find('button').classes()).to.include('fe-button');
//         expect(wrapper.find('button').text()).to.include('Foo');
//         expect(wrapper.find({name: 'fe-icon'}).isVueInstance()).to.be.true;
//         expect(wrapper.find({name: 'fe-icon'}).props().icon).to.equal('user');
//         expect(wrapper.find({name: 'fe-icon'}).props().iconPack).to.equal('fas');
//     });
//
//     it('render button with a fontawesome icon on right', () => {
//         const wrapper = shallowMount(Button, {
//             propsData: {
//                 iconPackAfter: 'fas',
//                 iconAfter: 'user',
//             },
//             children: [Icon],
//             stubs: {
//                 'fe-icon': Icon
//             },
//             slots: {
//                 default: 'Foo'
//             }
//         });
//         expect(wrapper.find('button').classes()).to.include('fe-button');
//         expect(wrapper.find('button').text()).to.include('Foo');
//         expect(wrapper.find({name: 'fe-icon'}).isVueInstance()).to.be.true;
//         expect(wrapper.find({name: 'fe-icon'}).props().icon).to.equal('user');
//         expect(wrapper.find({name: 'fe-icon'}).props().iconPack).to.equal('fas');
//     });
//
//     it('render button with a fontawesome icon on left and right', () => {
//         const wrapper = shallowMount(Button, {
//             propsData: {
//                 iconPackBefore: 'fas',
//                 iconBefore: 'globe-americas',
//                 iconPackAfter: 'fas',
//                 iconAfter: 'user',
//             },
//             children: [Icon],
//             stubs: {
//                 'fe-icon': Icon
//             },
//             slots: {
//                 default: 'Foo'
//             }
//         });
//         expect(wrapper.find('button').classes()).to.include('fe-button');
//         expect(wrapper.find('button').text()).to.include('Foo');
//         expect(wrapper.findAll({name: 'fe-icon'}).at(0).isVueInstance()).to.be.true;
//         expect(wrapper.findAll({name: 'fe-icon'}).at(0).props().icon).to.equal('globe-americas');
//         expect(wrapper.findAll({name: 'fe-icon'}).at(0).props().iconPack).to.equal('fas');
//         expect(wrapper.findAll({name: 'fe-icon'}).at(1).isVueInstance()).to.be.true;
//         expect(wrapper.findAll({name: 'fe-icon'}).at(1).props().icon).to.equal('user');
//         expect(wrapper.findAll({name: 'fe-icon'}).at(1).props().iconPack).to.equal('fas');
//     });
//
//     it('render a fontawesome icon only button', () => {
//         const wrapper = shallowMount(Button, {
//             propsData: {
//                 iconPack: 'fas',
//                 icon: 'globe-americas',
//                 iconOnly: true,
//             },
//             children: [Icon],
//             stubs: {
//                 'fe-icon': Icon
//             }
//         });
//         expect(wrapper.find('button').classes()).to.include('fe-button');
//         expect(wrapper.find('button').text()).to.include('');
//         expect(wrapper.find({name: 'fe-icon'}).isVueInstance()).to.be.true;
//         expect(wrapper.find({name: 'fe-icon'}).props().icon).to.equal('globe-americas');
//         expect(wrapper.find({name: 'fe-icon'}).props().iconPack).to.equal('fas');
//     });
//
//     it('render inverted button', () => {
//         const wrapper = shallowMount(Button, {
//             propsData: {
//                 iconPackBefore: 'fas',
//                 iconBefore: 'globe-americas',
//                 inverted: true,
//             },
//             children: [Icon],
//             stubs: {
//                 'fe-icon': Icon
//             },
//             slots: {
//                 default: 'Foo'
//             }
//         });
//         expect(wrapper.find('button').classes()).to.include('fe-button');
//         expect(wrapper.find('button').text()).to.include('Foo');
//         expect(wrapper.find({name: 'fe-icon'}).isVueInstance()).to.be.true;
//         expect(wrapper.find({name: 'fe-icon'}).props().icon).to.equal('globe-americas');
//         expect(wrapper.find({name: 'fe-icon'}).props().iconPack).to.equal('fas');
//     });
//
//     it('render disabled button', () => {
//         const wrapper = shallowMount(Button, {
//             propsData: {
//                 disabled: true,
//             },
//             slots: {
//                 default: 'Foo'
//             }
//         });
//         expect(wrapper.find('button').classes()).to.include('fe-button');
//         expect(wrapper.find('button:disabled').exists()).to.be.true;
//         expect(wrapper.find('button:not([disabled])').exists()).to.be.false;
//     });
// });
