module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "sxl": "0px 3px 11px rgba(0, 0, 0, 0.15)",
        "scard": "0px 3px 11px rgba(0, 0, 0, 0.08)"
      },
      borderRadius: {
        'ssm': '28px',
        'smd': '30px',
        'rectangle': '100%'
      },
      fontSize: {
        'sxsl': '1.1rem',
        'ssmall': '1.3rem',
        'sbase': '1.5rem',
        'slg': '1.6rem',
        'smxl': '1.8rem',
        'sxl': '1.9rem'
      },
      height: {
        's19': '4.8rem'
      },
      spacing: {
        's8': '2.8rem'
      },
      colors: {
        "green-1": "#167979",
        "green-2": "#d0e5bd",
        "blue-1": "#022f65",
        "blue-2": "#6886c3",
        "red-1": "#dc3848",
        "red-2": "#c6292a",
        "red-3": "#faeeed",
        "red-4": "#df2c36",
        "gray-1": "#afafaf",
        "gray-2": "#666",
        "gray-3": "#e3e1e2",
        "gray-modal": "rgba(29,31,36,0.4)",
        "lightest-gray": "#efefef",
        "lighter-gray": "#cdd0d8",
        "light-gray": "#bbb",
        "light-gray2": "#f7f7f7",
        "disabled-gray-2": "#d7d7d7",
        "dark-gray": "#c8c8c8",
        "medium-gray": "#707070",
        "disabled-gray": "#e6e6e6",
        "disabled-graytext": "#c3c3c3",
        "field-gray": "#f0f0f0",
        "border-gray": "#cecece",
        "yellow-1": "#e5e5bd",
        "yellow-2": "#bdc268",
        "yellow-3": "#f3e213",
        "yellow-4": "#c4b82b",
        "yellow-5": "#feffeb",
        "black-1": "#24292b",
        "transparent": "transparent",
      },
      scale: {
        '80': '0.8'
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fit, minmax(30rem, 1fr))',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(30rem, 1fr))',
        'min-auto': 'min-content auto min-content min-content',
        'min-auto-col': 'min-content auto'
      },
      screens: {
        'customSm': '320px',
        'customMs': '425px',
        'customMd': '768px',
        'customLg': '1024px',
        'customXl': '1200px',
        'customXXl': '1440px',
        'custom3Xl': '1700px'
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require('tailwind-scrollbar'),
  ],
}