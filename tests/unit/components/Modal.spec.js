// import {expect} from 'chai';
// import {shallowMount, mount} from '@vue/test-utils';
// import Modal from '@/components/Modal/Modal.vue';
// import Icon from '@/components/Icon/Icon.vue';
//
// describe('Modal.vue', () => {
//     it('is called', () => {
//         let wrapper = shallowMount(Modal);
//         expect(wrapper.name()).to.equal('fe-modal');
//     });
//
//     it('is vue instance', () => {
//         const wrapper = shallowMount(Modal);
//         expect(wrapper.name()).to.equal('fe-modal');
//         expect(wrapper.isVueInstance()).to.be.true;
//     });
//
//     it('render default modal', async () => {
//         const wrapper = shallowMount(Modal, {
//             propsData: {
//                 value: true
//             },
//             stubs: {
//                 'fe-icon': Icon
//             }
//         });
//         expect(wrapper.find('div.fe-modal-header').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-body').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-footer').exists()).to.be.true;
//         wrapper.setProps({ value: false });
//         await wrapper.vm.$nextTick();
//         expect(wrapper.find('div.fe-modal-header').exists()).to.be.false;
//         expect(wrapper.find('div.fe-modal-body').exists()).to.be.false;
//         expect(wrapper.find('div.fe-modal-footer').exists()).to.be.false;
//     });
//
//     it('render modal with no footer', async () => {
//         const wrapper = shallowMount(Modal, {
//             propsData: {
//                 value: true,
//                 showFooter: false,
//             },
//             stubs: {
//                 'fe-icon': Icon
//             }
//         });
//         expect(wrapper.find('div.fe-modal-header').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-body').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-footer').exists()).to.be.false;
//         wrapper.setProps({ value: false });
//         await wrapper.vm.$nextTick();
//         expect(wrapper.find('div.fe-modal-header').exists()).to.be.false;
//         expect(wrapper.find('div.fe-modal-body').exists()).to.be.false;
//         expect(wrapper.find('div.fe-modal-footer').exists()).to.be.false;
//     });
//
//     it('render modal with custom footer slot', async () => {
//         const wrapper = shallowMount(Modal, {
//             propsData: {
//                 value: true,
//             },
//             stubs: {
//                 'fe-icon': Icon
//             },
//             scopedSlots: {
//                 footer: '<span>Custom Footer Content</span>'
//             }
//         });
//         expect(wrapper.find('div.fe-modal-header').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-body').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-footer').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-footer').text()).to.be.equal('Custom Footer Content');
//         wrapper.setProps({ value: false });
//         await wrapper.vm.$nextTick();
//         expect(wrapper.find('div.fe-modal-header').exists()).to.be.false;
//         expect(wrapper.find('div.fe-modal-body').exists()).to.be.false;
//         expect(wrapper.find('div.fe-modal-footer').exists()).to.be.false;
//     });
//
//     it('render modal with custom header slot', (done) => {
//         const wrapper = shallowMount(Modal, {
//             propsData: {
//                 value: true,
//             },
//             stubs: {
//                 'fe-icon': Icon
//             },
//             scopedSlots: {
//                 header: '<span>Custom Header Content</span>'
//             }
//         });
//         expect(wrapper.find('div.fe-modal-header').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-header').text()).to.be.equal('Custom Header Content');
//         expect(wrapper.find('div.fe-modal-body').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-footer').exists()).to.be.true;
//         wrapper.setProps({ value: false });
//         wrapper.vm.$nextTick(() => {
//             expect(wrapper.find('div.fe-modal-header').exists()).to.be.false;
//             expect(wrapper.find('div.fe-modal-body').exists()).to.be.false;
//             expect(wrapper.find('div.fe-modal-footer').exists()).to.be.false;
//             done();
//         });
//     });
//
//     it('closes modal on escape', () => {
//         const wrapper = mount(Modal, {
//             attachedToDocument: true,
//             propsData: {
//                 value: true,
//                 closeOnEscape: true
//             },
//             stubs: {
//                 'fe-icon': Icon
//             }
//         });
//         expect(wrapper.find('div.fe-modal-header').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-body').exists()).to.be.true;
//         expect(wrapper.find('div.fe-modal-footer').exists()).to.be.true;
//
//         wrapper.trigger('keydown', {
//             keyCode: 27,
//             key: 'Escape'
//         });
//         expect(wrapper.emitted().close.length).to.be.equal(1);
//     });
// });
