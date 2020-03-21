import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import Button from '@/components/Button/Button.vue';

describe('Dropdown.vue', () => {
    it('is called', () => {
        let wrapper = shallowMount(Dropdown);
        expect(wrapper.name()).to.equal('fe-dropdown');
    });

    it('is vue instance', () => {
        const wrapper = shallowMount(Dropdown);
        expect(wrapper.name()).to.equal('fe-dropdown');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('render simple dropdown', async () => {
        const wrapper = shallowMount(Dropdown, {
            propsData: {
                items: ['Foo', 'Bar', 'Cake']
            },
            stubs: {
                'fe-button': Button
            }
        });
        expect(wrapper.find('div.dropdown-trigger').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.false;
        wrapper.setData({opened: true});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item').length
        ).to.equal(3);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(0)
            .text()
        ).to.equal('Foo');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(1)
            .text()
        ).to.equal('Bar');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(2)
            .text()
        ).to.equal('Cake');
    });

    it('render dropdown with custom trigger slot', async () => {
        const wrapper = shallowMount(Dropdown, {
            propsData: {
                items: ['Foo', 'Bar', 'Cake']
            },
            scopedSlots: {
                trigger: '<span class="custom-trigger-class">Custom Trigger</span>'
            }
        });
        expect(wrapper.find('div.dropdown-trigger').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-trigger span').classes()).to.include('custom-trigger-class');
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.false;
        wrapper.setData({opened: true});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item').length
        ).to.equal(3);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(0)
            .text()
        ).to.equal('Foo');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(1)
            .text()
        ).to.equal('Bar');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(2)
            .text()
        ).to.equal('Cake');
    });

    it('render dropdown with custom item slot', async () => {
        const wrapper = shallowMount(Dropdown, {
            propsData: {
                items: ['Foo', 'Bar', 'Cake']
            },
            scopedSlots: {
                item: '<span class="item" slot-scope="props">{{ props.item }}[CUSTOM]</span>'
            }
        });
        expect(wrapper.find('div.dropdown-trigger').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.false;
        wrapper.setData({opened: true});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item').length
        ).to.equal(3);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(0)
            .text()
        ).to.equal('Foo[CUSTOM]');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(1)
            .text()
        ).to.equal('Bar[CUSTOM]');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item')
            .at(2)
            .text()
        ).to.equal('Cake[CUSTOM]');
    });
});
