// import {expect} from 'chai';
// import {shallowMount} from '@vue/test-utils';
// import Icon from '@/components/Icon/Icon.vue';
//
// describe('Icon.vue', () => {
//     it('is called', () => {
//         let wrapper = shallowMount(Icon);
//         expect(wrapper.name()).to.equal('fe-icon');
//     });
//
//     it('is vue instance', () => {
//         const wrapper = shallowMount(Icon);
//         expect(wrapper.name()).to.equal('fe-icon');
//         expect(wrapper.isVueInstance()).to.be.true;
//     });
//
//     it('render icon when icon prop is supplied', () => {
//         const wrapper = shallowMount(Icon, {
//             propsData: {
//                 icon: 'user',
//             }
//         });
//         expect(wrapper.find('i').classes()).to.include('fa-user');
//         expect(wrapper.find('i').classes()).to.include('fas');
//     });
//
//     it('render icon when icon and icon pack prop is supplied', () => {
//         const wrapper = shallowMount(Icon, {
//             propsData: {
//                 iconPack: 'fas',
//                 icon: 'user',
//             }
//         });
//         expect(wrapper.find('i').classes()).to.include('fa-user');
//         expect(wrapper.find('i').classes()).to.include('fas');
//     });
//
//     it('render small size icon when icon prop is supplied', () => {
//         const wrapper = shallowMount(Icon, {
//             propsData: {
//                 iconPack: 'fas',
//                 icon: 'user',
//                 size: 'is-sm'
//             }
//         });
//         expect(wrapper.find('i').classes()).to.include('fa-user');
//         expect(wrapper.find('i').classes()).to.include('fas');
//     });
//
//     it('render medium size icon when icon prop is supplied', () => {
//         const wrapper = shallowMount(Icon, {
//             propsData: {
//                 iconPack: 'fas',
//                 icon: 'user',
//                 size: 'is-lg'
//             }
//         });
//         expect(wrapper.find('i').classes()).to.include('fa-user');
//         expect(wrapper.find('i').classes()).to.include('fas');
//         expect(wrapper.find('i').classes()).to.include('fa-lg');
//     });
//
//     it('render large size icon when icon prop is supplied', () => {
//         const wrapper = shallowMount(Icon, {
//             propsData: {
//                 iconPack: 'fas',
//                 icon: 'user',
//                 size: 'is-2x'
//             }
//         });
//         expect(wrapper.find('i').classes()).to.include('fa-user');
//         expect(wrapper.find('i').classes()).to.include('fas');
//         expect(wrapper.find('i').classes()).to.include('fa-2x');
//     });
//
//     it('render extra large size icon when icon prop is supplied', () => {
//         const wrapper = shallowMount(Icon, {
//             propsData: {
//                 iconPack: 'fas',
//                 icon: 'user',
//                 size: 'is-3x'
//             }
//         });
//         expect(wrapper.find('i').classes()).to.include('fa-user');
//         expect(wrapper.find('i').classes()).to.include('fas');
//         expect(wrapper.find('i').classes()).to.include('fa-3x');
//     });
// });
