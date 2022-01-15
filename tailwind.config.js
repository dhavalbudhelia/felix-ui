module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    safelist: [
        {
            pattern: /(bg|text|border)-(red|indigo|gray|blue)-(100|200|300|400|500|600|700|800|900)/,
        },
    ],
}
