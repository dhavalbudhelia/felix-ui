export default {
    props: {
        size: {
            type: String,
            default: 'is-md',
            required: false,
            validator: function (value) {
                return ['is-xs', 'is-sm', 'is-md', 'is-lg'].includes(value);
            },
        },
    }
}
