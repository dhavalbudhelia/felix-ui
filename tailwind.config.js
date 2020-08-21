module.exports = {

    theme: {
        /*
        |-----------------------------------------------------------------------------
        | Colors                                  https://tailwindcss.com/docs/colors
        |-----------------------------------------------------------------------------
        |
        | The color palette defined above is also assigned to the "colors" key of
        | your Tailwind config. This makes it easy to access them in your CSS
        | using Tailwind's config helper. For example:
        |
        | .error { color: config('colors.red') }
        |
        */
        colors: {
            transparent: 'transparent',

            black: '#000',
            white: '#fff',

            gray: {
                100: '#f7fafc',
                200: '#edf2f7',
                300: '#e2e8f0',
                400: '#cbd5e0',
                500: '#a0aec0',
                600: '#718096',
                700: '#4a5568',
                800: '#2d3748',
                900: '#1a202c',
            },
            red: {
                100: '#fff5f5',
                200: '#fed7d7',
                300: '#feb2b2',
                400: '#fc8181',
                500: '#f56565',
                600: '#e53e3e',
                700: '#c53030',
                800: '#9b2c2c',
                900: '#742a2a',
            },
            orange: {
                100: '#fffaf0',
                200: '#feebc8',
                300: '#fbd38d',
                400: '#f6ad55',
                500: '#ed8936',
                600: '#dd6b20',
                700: '#c05621',
                800: '#9c4221',
                900: '#7b341e',
            },
            yellow: {
                100: '#fffff0',
                200: '#fefcbf',
                300: '#faf089',
                400: '#f6e05e',
                500: '#ecc94b',
                600: '#d69e2e',
                700: '#b7791f',
                800: '#975a16',
                900: '#744210',
            },
            green: {
                100: '#f0fff4',
                200: '#c6f6d5',
                300: '#9ae6b4',
                400: '#68d391',
                500: '#48bb78',
                600: '#38a169',
                700: '#2f855a',
                800: '#276749',
                900: '#22543d',
            },
            teal: {
                100: '#e6fffa',
                200: '#b2f5ea',
                300: '#81e6d9',
                400: '#4fd1c5',
                500: '#38b2ac',
                600: '#319795',
                700: '#2c7a7b',
                800: '#285e61',
                900: '#234e52',
            },
            blue: {
                100: '#ebf8ff',
                200: '#bee3f8',
                300: '#90cdf4',
                400: '#63b3ed',
                500: '#4299e1',
                600: '#3182ce',
                700: '#2b6cb0',
                800: '#2c5282',
                900: '#2a4365',
            },
            indigo: {
                100: '#ebf4ff',
                200: '#c3dafe',
                300: '#a3bffa',
                400: '#7f9cf5',
                500: '#667eea',
                600: '#5a67d8',
                700: '#4c51bf',
                800: '#434190',
                900: '#3c366b',
            },
            purple: {
                100: '#faf5ff',
                200: '#e9d8fd',
                300: '#d6bcfa',
                400: '#b794f4',
                500: '#9f7aea',
                600: '#805ad5',
                700: '#6b46c1',
                800: '#553c9a',
                900: '#44337a',
            },
            pink: {
                100: '#fff5f7',
                200: '#fed7e2',
                300: '#fbb6ce',
                400: '#f687b3',
                500: '#ed64a6',
                600: '#d53f8c',
                700: '#b83280',
                800: '#97266d',
                900: '#702459',
            },
        },

        /*
        |-----------------------------------------------------------------------------
        | Screens                      https://tailwindcss.com/docs/responsive-design
        |-----------------------------------------------------------------------------
        |
        | Screens in Tailwind are translated to CSS media queries. They define the
        | responsive breakpoints for your project. By default Tailwind takes a
        | "mobile first" approach, where each screen size represents a minimum
        | viewport width. Feel free to have as few or as many screens as you
        | want, naming them in whatever way you'd prefer for your project.
        |
        | Tailwind also allows for more complex screen definitions, which can be
        | useful in certain situations. Be sure to see the full responsive
        | documentation for a complete list of options.
        |
        | Class name: .{screen}:{utility}
        |
        */

        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },

        /*
        |-----------------------------------------------------------------------------
        | Fonts                                    https://tailwindcss.com/docs/fonts
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your project's font stack, or font families.
        | Keep in mind that Tailwind doesn't actually load any fonts for you.
        | If you're using custom fonts you'll need to import them prior to
        | defining them here.
        |
        | By default we provide a native font stack that works remarkably well on
        | any device or OS you're using, since it just uses the default fonts
        | provided by the platform.
        |
        | Class name: .font-{name}
        |
        */

        fontFamily: {
            'sans': [
                'system-ui',
                'BlinkMacSystemFont',
                '-apple-system',
                'Segoe UI',
                'Roboto',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Fira Sans',
                'Droid Sans',
                'Helvetica Neue',
                'sans-serif',
            ],
            'serif': [
                'Constantia',
                'Lucida Bright',
                'Lucidabright',
                'Lucida Serif',
                'Lucida',
                'DejaVu Serif',
                'Bitstream Vera Serif',
                'Liberation Serif',
                'Georgia',
                'serif',
            ],
            'mono': [
                'Menlo',
                'Monaco',
                'Consolas',
                'Liberation Mono',
                'Courier New',
                'monospace',
            ],
        },


        /*
        |-----------------------------------------------------------------------------
        | Text sizes                         https://tailwindcss.com/docs/text-sizing
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your text sizes. Name these in whatever way
        | makes the most sense to you. We use size names by default, but
        | you're welcome to use a numeric scale or even something else
        | entirely.
        |
        | By default Tailwind uses the "rem" unit type for most measurements.
        | This allows you to set a root font size which all other sizes are
        | then based on. That said, you are free to use whatever units you
        | prefer, be it rems, ems, pixels or other.
        |
        | Class name: .text-{size}
        |
        */

        fontSize: {
            'xs': '.75rem',     // 12px
            'sm': '.875rem',    // 14px
            'base': '1rem',     // 16px
            'lg': '1.125rem',   // 18px
            'xl': '1.25rem',    // 20px
            '2xl': '1.5rem',    // 24px
            '3xl': '1.875rem',  // 30px
            '4xl': '2.25rem',   // 36px
            '5xl': '3rem',      // 48px
        },


        /*
        |-----------------------------------------------------------------------------
        | Font weights                       https://tailwindcss.com/docs/font-weight
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your font weights. We've provided a list of
        | common font weight names with their respective numeric scale values
        | to get you started. It's unlikely that your project will require
        | all of these, so we recommend removing those you don't need.
        |
        | Class name: .font-{weight}
        |
        */

        fontWeight: {
            'hairline': 100,
            'thin': 200,
            'light': 300,
            'normal': 400,
            'medium': 500,
            'semibold': 600,
            'bold': 700,
            'extrabold': 800,
            'black': 900,
        },


        /*
        |-----------------------------------------------------------------------------
        | Leading (line height)              https://tailwindcss.com/docs/line-height
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your line height values, or as we call
        | them in Tailwind, leadings.
        |
        | Class name: .leading-{size}
        |
        */

        lineHeight: {
            'none': 1,
            'tight': 1.25,
            'normal': 1.5,
            'loose': 2,
        },


        /*
        |-----------------------------------------------------------------------------
        | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your letter spacing values, or as we call
        | them in Tailwind, tracking.
        |
        | Class name: .tracking-{size}
        |
        */

        letterSpacing: {
            tighter: '-.05em',
            tight: '-.025em',
            normal: '0',
            wide: '.025em',
            wider: '.05em',
            widest: '.1em',
        },


        /*
        |-----------------------------------------------------------------------------
        | Text colors                         https://tailwindcss.com/docs/text-color
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your text colors. By default these use the
        | color palette we defined above, however you're welcome to set these
        | independently if that makes sense for your project.
        |
        | Class name: .text-{color}
        |
        */

        textColor: theme => theme('colors'),


        /*
        |-----------------------------------------------------------------------------
        | Background colors             https://tailwindcss.com/docs/background-color
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your background colors. By default these use
        | the color palette we defined above, however you're welcome to set
        | these independently if that makes sense for your project.
        |
        | Class name: .bg-{color}
        |
        */

        backgroundColor: theme => theme('colors'),


        /*
        |-----------------------------------------------------------------------------
        | Background sizes               https://tailwindcss.com/docs/background-size
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your background sizes. We provide some common
        | values that are useful in most projects, but feel free to add other sizes
        | that are specific to your project here as well.
        |
        | Class name: .bg-{size}
        |
        */

        backgroundSize: {
            'auto': 'auto',
            'cover': 'cover',
            'contain': 'contain',
        },


        /*
        |-----------------------------------------------------------------------------
        | Border widths                     https://tailwindcss.com/docs/border-width
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your border widths. Take note that border
        | widths require a special "default" value set as well. This is the
        | width that will be used when you do not specify a border width.
        |
        | Class name: .border{-side?}{-width?}
        |
        */

        borderWidth: {
            default: '1px',
            '0': '0',
            '2': '2px',
            '4': '4px',
            '8': '8px',
        },


        /*
        |-----------------------------------------------------------------------------
        | Border colors                     https://tailwindcss.com/docs/border-color
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your border colors. By default these use the
        | color palette we defined above, however you're welcome to set these
        | independently if that makes sense for your project.
        |
        | Take note that border colors require a special "default" value set
        | as well. This is the color that will be used when you do not
        | specify a border color.
        |
        | Class name: .border-{color}
        |
        */

        borderColor: theme => ({
            default: theme('colors.gray.400'),
            ...theme('colors'),
        }),


        /*
        |-----------------------------------------------------------------------------
        | Border radius                    https://tailwindcss.com/docs/border-radius
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your border radius values. If a `default` radius
        | is provided, it will be made available as the non-suffixed `.rounded`
        | utility.
        |
        | If your scale includes a `0` value to reset already rounded corners, it's
        | a good idea to put it first so other values are able to override it.
        |
        | Class name: .rounded{-side?}{-size?}
        |
        */

        borderRadius: {
            'none': '0',
            'sm': '.125rem',
            default: '.25rem',
            'md': '0.375rem',
            'lg': '.5rem',
            'full': '9999px',
        },


        /*
        |-----------------------------------------------------------------------------
        | Width                                    https://tailwindcss.com/docs/width
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your width utility sizes. These can be
        | percentage based, pixels, rems, or any other units. By default
        | we provide a sensible rem based numeric scale, a percentage
        | based fraction scale, plus some other common use-cases. You
        | can, of course, modify these values as needed.
        |
        |
        | It's also worth mentioning that Tailwind automatically escapes
        | invalid CSS class name characters, which allows you to have
        | awesome classes like .w-2/3.
        |
        | Class name: .w-{size}
        |
        */

        width: {
            'auto': 'auto',
            'px': '1px',
            '1': '0.25rem',
            '2': '0.5rem',
            '3': '0.75rem',
            '4': '1rem',
            '5': '1.25rem',
            '6': '1.5rem',
            '8': '2rem',
            '10': '2.5rem',
            '12': '3rem',
            '16': '4rem',
            '20': '5rem',
            '24': '6rem',
            '32': '8rem',
            '40': '10rem',
            '48': '12rem',
            '56': '14rem',
            '64': '16rem',
            '1/2': '50%',
            '1/3': '33.33333%',
            '2/3': '66.66667%',
            '1/4': '25%',
            '3/4': '75%',
            '1/5': '20%',
            '2/5': '40%',
            '3/5': '60%',
            '4/5': '80%',
            '1/6': '16.66667%',
            '5/6': '83.33333%',
            'full': '100%',
            'screen': '100vw',
        },


        /*
        |-----------------------------------------------------------------------------
        | Height                                  https://tailwindcss.com/docs/height
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your height utility sizes. These can be
        | percentage based, pixels, rems, or any other units. By default
        | we provide a sensible rem based numeric scale plus some other
        | common use-cases. You can, of course, modify these values as
        | needed.
        |
        | Class name: .h-{size}
        |
        */

        height: {
            'auto': 'auto',
            'px': '1px',
            '1': '0.25rem',
            '2': '0.5rem',
            '3': '0.75rem',
            '4': '1rem',
            '5': '1.25rem',
            '6': '1.5rem',
            '8': '2rem',
            '10': '2.5rem',
            '12': '3rem',
            '16': '4rem',
            '20': '5rem',
            '24': '6rem',
            '32': '8rem',
            '48': '12rem',
            '64': '16rem',
            'full': '100%',
            'screen': '100vh',
        },


        /*
        |-----------------------------------------------------------------------------
        | Minimum width                        https://tailwindcss.com/docs/min-width
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your minimum width utility sizes. These can
        | be percentage based, pixels, rems, or any other units. We provide a
        | couple common use-cases by default. You can, of course, modify
        | these values as needed.
        |
        | Class name: .min-w-{size}
        |
        */

        minWidth: {
            '0': '0',
            'full': '100%',
        },


        /*
        |-----------------------------------------------------------------------------
        | Minimum height                      https://tailwindcss.com/docs/min-height
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your minimum height utility sizes. These can
        | be percentage based, pixels, rems, or any other units. We provide a
        | few common use-cases by default. You can, of course, modify these
        | values as needed.
        |
        | Class name: .min-h-{size}
        |
        */

        minHeight: {
            '0': '0',
            'full': '100%',
            'screen': '100vh',
        },


        /*
        |-----------------------------------------------------------------------------
        | Maximum width                        https://tailwindcss.com/docs/max-width
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your maximum width utility sizes. These can
        | be percentage based, pixels, rems, or any other units. By default
        | we provide a sensible rem based scale and a "full width" size,
        | which is basically a reset utility. You can, of course,
        | modify these values as needed.
        |
        | Class name: .max-w-{size}
        |
        */

        maxWidth: {
            'xs': '20rem',
            'sm': '30rem',
            'md': '40rem',
            'lg': '50rem',
            'xl': '60rem',
            '2xl': '70rem',
            '3xl': '80rem',
            '4xl': '90rem',
            '5xl': '100rem',
            'full': '100%',
        },


        /*
        |-----------------------------------------------------------------------------
        | Maximum height                      https://tailwindcss.com/docs/max-height
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your maximum height utility sizes. These can
        | be percentage based, pixels, rems, or any other units. We provide a
        | couple common use-cases by default. You can, of course, modify
        | these values as needed.
        |
        | Class name: .max-h-{size}
        |
        */

        maxHeight: {
            'full': '100%',
            'screen': '100vh',
        },


        /*
        |-----------------------------------------------------------------------------
        | Padding                                https://tailwindcss.com/docs/padding
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your padding utility sizes. These can be
        | percentage based, pixels, rems, or any other units. By default we
        | provide a sensible rem based numeric scale plus a couple other
        | common use-cases like "1px". You can, of course, modify these
        | values as needed.
        |
        | Class name: .p{side?}-{size}
        |
        */

        padding: {
            'px': '1px',
            '0': '0',
            '1': '0.25rem',
            '2': '0.5rem',
            '3': '0.75rem',
            '4': '1rem',
            '5': '1.25rem',
            '6': '1.5rem',
            '8': '2rem',
            '10': '2.5rem',
            '12': '3rem',
            '16': '4rem',
            '20': '5rem',
            '24': '6rem',
            '32': '8rem',
        },


        /*
        |-----------------------------------------------------------------------------
        | Margin                                  https://tailwindcss.com/docs/margin
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your margin utility sizes. These can be
        | percentage based, pixels, rems, or any other units. By default we
        | provide a sensible rem based numeric scale plus a couple other
        | common use-cases like "1px". You can, of course, modify these
        | values as needed.
        |
        | Class name: .m{side?}-{size}
        |
        */

        margin: {
            'auto': 'auto',
            'px': '1px',
            '0': '0',
            '1': '0.25rem',
            '2': '0.5rem',
            '3': '0.75rem',
            '4': '1rem',
            '5': '1.25rem',
            '6': '1.5rem',
            '8': '2rem',
            '10': '2.5rem',
            '12': '3rem',
            '16': '4rem',
            '20': '5rem',
            '24': '6rem',
            '32': '8rem',
            '-px': '-1px',
            '-0': '0',
            '-1': '0.25rem',
            '-2': '0.5rem',
            '-3': '0.75rem',
            '-4': '1rem',
            '-5': '1.25rem',
            '-6': '1.5rem',
            '-8': '2rem',
            '-10': '2.5rem',
            '-12': '3rem',
            '-16': '4rem',
            '-20': '5rem',
            '-24': '6rem',
            '-32': '8rem',
        },

        /*
        |-----------------------------------------------------------------------------
        | Shadows                                https://tailwindcss.com/docs/shadows
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your shadow utilities. As you can see from
        | the defaults we provide, it's possible to apply multiple shadows
        | per utility using comma separation.
        |
        | If a `default` shadow is provided, it will be made available as the non-
        | suffixed `.shadow` utility.
        |
        | Class name: .shadow-{size?}
        |
        */

        boxShadow: {
            default: '0 2px 4px 0 rgba(0,0,0,0.10)',
            'md': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
            'lg': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
            'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
            'outline': '0 0 0 3px rgba(52,144,220,0.5)',
            'none': 'none',
        },


        /*
        |-----------------------------------------------------------------------------
        | Z-index                                https://tailwindcss.com/docs/z-index
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your z-index utility values. By default we
        | provide a sensible numeric scale. You can, of course, modify these
        | values as needed.
        |
        | Class name: .z-{index}
        |
        */

        zIndex: {
            'auto': 'auto',
            '0': 0,
            '10': 10,
            '20': 20,
            '30': 30,
            '40': 40,
            '50': 50,
        },


        /*
        |-----------------------------------------------------------------------------
        | Opacity                                https://tailwindcss.com/docs/opacity
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your opacity utility values. By default we
        | provide a sensible numeric scale. You can, of course, modify these
        | values as needed.
        |
        | Class name: .opacity-{name}
        |
        */

        opacity: {
            '0': '0',
            '25': '.25',
            '50': '.5',
            '75': '.75',
            '100': '1',
        },


        /*
        |-----------------------------------------------------------------------------
        | SVG fill                                   https://tailwindcss.com/docs/svg
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your SVG fill colors. By default we just provide
        | `fill-current` which sets the fill to the current text color. This lets you
        | specify a fill color using existing text color utilities and helps keep the
        | generated CSS file size down.
        |
        | Class name: .fill-{name}
        |
        */

        fill: {
            'current': 'currentColor',
        },


        /*
        |-----------------------------------------------------------------------------
        | SVG stroke                                 https://tailwindcss.com/docs/svg
        |-----------------------------------------------------------------------------
        |
        | Here is where you define your SVG stroke colors. By default we just provide
        | `stroke-current` which sets the stroke to the current text color. This lets
        | you specify a stroke color using existing text color utilities and helps
        | keep the generated CSS file size down.
        |
        | Class name: .stroke-{name}
        |
        */

        stroke: {
            'current': 'currentColor',
        },

        container: {
            center: true,
        }
    },


    /*
    |-----------------------------------------------------------------------------
    | Modules                  https://tailwindcss.com/docs/configuration#modules
    |-----------------------------------------------------------------------------
    |
    | Here is where you control which modules are generated and what variants are
    | generated for each of those modules.
    |
    | Currently supported variants:
    |   - responsive
    |   - hover
    |   - focus
    |   - focus-within
    |   - active
    |   - group-hover
    |
    | To disable a module completely, use `false` instead of an array.
    |
    */

    variants: {
        accessibility: ['responsive', 'focus'],
        alignContent: ['responsive'],
        alignItems: ['responsive'],
        alignSelf: ['responsive'],
        appearance: ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundColor: ['responsive', 'hover', 'focus'],
        backgroundPosition: ['responsive'],
        backgroundRepeat: ['responsive'],
        backgroundSize: ['responsive'],
        borderCollapse: ['responsive'],
        borderColor: ['responsive', 'hover', 'focus', 'active', 'focus-within'],
        borderRadius: ['responsive'],
        borderStyle: ['responsive'],
        borderWidth: ['responsive'],
        boxShadow: ['responsive', 'hover', 'focus', 'active'],
        cursor: ['responsive', 'hover'],
        display: ['responsive'],
        fill: ['responsive'],
        flex: ['responsive'],
        flexDirection: ['responsive'],
        flexGrow: ['responsive'],
        flexShrink: ['responsive'],
        flexWrap: ['responsive'],
        float: ['responsive'],
        fontFamily: ['responsive'],
        fontSize: ['responsive'],
        fontSmoothing: ['responsive'],
        fontStyle: ['responsive'],
        fontWeight: ['responsive', 'hover', 'focus'],
        height: ['responsive'],
        inset: ['responsive'],
        justifyContent: ['responsive'],
        letterSpacing: ['responsive'],
        lineHeight: ['responsive'],
        listStylePosition: ['responsive'],
        listStyleType: ['responsive'],
        margin: ['responsive', 'first', 'last'],
        maxHeight: ['responsive'],
        maxWidth: ['responsive'],
        minHeight: ['responsive'],
        minWidth: ['responsive'],
        objectFit: ['responsive'],
        objectPosition: ['responsive'],
        opacity: ['responsive', 'hover', 'focus'],
        order: ['responsive'],
        outline: ['responsive', 'focus'],
        overflow: ['responsive'],
        padding: ['responsive'],
        placeholderColor: ['responsive', 'focus'],
        pointerEvents: ['responsive'],
        position: ['responsive'],
        resize: ['responsive'],
        stroke: ['responsive'],
        tableLayout: ['responsive'],
        textAlign: ['responsive'],
        textColor: ['responsive', 'hover', 'focus', 'focus-within'],
        textDecoration: ['responsive', 'hover', 'focus'],
        textTransform: ['responsive'],
        userSelect: ['responsive'],
        verticalAlign: ['responsive'],
        visibility: ['responsive'],
        whitespace: ['responsive'],
        width: ['responsive'],
        wordBreak: ['responsive'],
        zIndex: ['responsive'],
    },
};
