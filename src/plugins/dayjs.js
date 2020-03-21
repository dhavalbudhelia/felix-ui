const ErDayjs = {
    install(Vue, options) {
        if (!options.dayjs) {
            console.error("Please install dayjs");
            return;
        }
        Vue.prototype.$dayjs = options.dayjs;
    }
};

export default ErDayjs;
