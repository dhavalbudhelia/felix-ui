export default {
    props: {
        iconPackBefore: {
            type: String,
            default: 'fas',
            validator: function (value) {
                return ['fas', 'far', 'fab'].includes(value);
            },
        },
        iconBefore: {
            type: String,
        },
        iconPackAfter: {
            type: String,
            default: 'fas',
            validator: function (value) {
                return ['fas', 'far', 'fab'].includes(value);
            },
        },
        iconAfter: {
            type: String,
        },
        iconPack: {
            type: String,
            default: 'fas',
            validator: function (value) {
                return ['fas', 'far', 'fab'].includes(value);
            },
        },
        icon: {
            type: String,
        },
        iconOnly: {
            type: Boolean,
            default: false,
        },
    }
}
