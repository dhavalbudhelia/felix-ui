import * as components from './components';
import optionsDefaults from '@/utils/options';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(quarterOfYear);

import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import ErDayjs from '@/plugins/dayjs';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/assets/css/tailwind.scss';
import '@/assets/scss/style.scss';

export default {
    install(Vue, opts) {
        //merge options
        let options = { ...optionsDefaults, ...opts };

        //vue-lodash
        Vue.use(VueLodash, {lodash: lodash});

        //dayjs
        Vue.use(ErDayjs, {
            dayjs: dayjs
        });

        //components
        for (let componentName in components) {
            let component = components[componentName];
            let { props } = components[componentName];
            Object.keys(options).forEach(key => {
                props[key] = {
                    default: () => options[key]
                };
            });
            Vue.component(component.name, Vue.extend({
                ...component,
                ...{
                    props
                }
            }));
        }
    }
};
