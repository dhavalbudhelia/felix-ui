const ErDayjs = {
    install(app, options) {
        if (!options.dayjs) {
            console.error("Please install dayjs");
            return;
        }
        app.config.globalProperties.$dayjs = options.dayjs;
    }
};

export default ErDayjs;
