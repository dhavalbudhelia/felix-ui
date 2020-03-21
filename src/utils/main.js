export const vuse = (plugin, options = {}) => {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin, options);
    }
};
