// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
        './src/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                orange: colors.orange,
            }
        },
    },
    variants: {
        extend: {
            cursor: ['hover'],
            margin: ['first', 'last'],
        }
    },
    plugins: [],
}
