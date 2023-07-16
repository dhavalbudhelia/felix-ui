import * as components from './components';
import options from '@/utils/options';
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

import ErDayjs from '@/plugins/dayjs';

const install = ((app, opts) => {
    //merge options
    app.config.globalProperties.$theme = { ...options, ...opts || {} };
    app.provide('$theme', { ...options, ...opts || {} });

    //dayjs
    app.use(ErDayjs, {
        dayjs: dayjs
    });

    //components
    for (let componentName in components) {
        let component = components[componentName];
        app.component(component.name, component);
    }
});

export {install};
