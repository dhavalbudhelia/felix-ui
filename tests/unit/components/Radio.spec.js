import {config, mount} from '@vue/test-utils';
import Radio from '@/components/Radio/Radio.vue';
import options from "@/utils/options";

config.global.provide = {
    $theme: options,
}

describe('Radio.vue', () => {
    it('render selected radio element', () => {
        let wrapper = mount(Radio, {
            propsData: {
                modelValue: 'Foo',
                localValue: 'Foo',
            },
            slots: {
                default: 'Bar'
            }
        });
        expect(wrapper.text()).toEqual('Bar');
        expect(wrapper.find('input[type="radio"]:checked').exists()).toBe(true);
    });

    it('render unselected radio element', () => {
        let wrapper = mount(Radio, {
            propsData: {
                modelValue: 'Bar',
                localValue: 'Foo'
            },
            slots: {
                default: 'Bar'
            }
        });
        expect(wrapper.text()).toEqual('Bar');
        expect(wrapper.find('input[type="radio"]:checked').exists()).toBe(false);
    });

    it('render disabled radio element', () => {
        let wrapper = mount(Radio, {
            propsData: {
                modelValue: 'Foo',
                localValue: 'Foo',
                disabled: true
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapper.text()).toEqual('Foo');
        expect(wrapper.find('input[type="radio"]:disabled').exists()).toBe(true);
        expect(wrapper.find('input[type="radio"]:checked').exists()).toBe(true);
    });

    it('changes the radio value on selection', async () => {
        let checkboxName = 'FooBar';
        let wrapperBar = mount(Radio, {
            propsData: {
                modelValue: 'Foo',
                localValue: 'Bar',
                name: checkboxName
            },
            slots: {
                default: 'Bar'
            }
        });
        let wrapperFoo = mount(Radio, {
            propsData: {
                modelValue: 'Foo',
                localValue: 'Foo',
                name: checkboxName
            },
            slots: {
                default: 'Foo'
            }
        });
        expect(wrapperBar.text()).toEqual('Bar');
        expect(wrapperFoo.text()).toEqual('Foo');
        expect(wrapperFoo.find('input[type="radio"]:checked').exists()).toBe(true);
        expect(wrapperBar.find('input[type="radio"]:checked').exists()).toBe(false);
        await wrapperBar.setProps({modelValue: 'Bar'});
        await wrapperFoo.setProps({modelValue: 'Bar'});
        expect(wrapperBar.find('input[type="radio"]:checked').exists()).toBe(true);
        expect(wrapperFoo.find('input[type="radio"]:checked').exists()).toBe(false);

        await wrapperBar.setProps({modelValue: 'Foo'});
        await wrapperFoo.setProps({modelValue: 'Foo'});
        expect(wrapperFoo.find('input[type="radio"]:checked').exists()).toBe(true);
        expect(wrapperBar.find('input[type="radio"]:checked').exists()).toBe(false);
    });

});
