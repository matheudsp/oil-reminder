const gluestackPlugin = require('@gluestack-ui/nativewind-utils/tailwind-plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content:
    [
      "./app/**/*.{tsx,jsx,ts,js}",
      "./gluestack/**/*.{tsx,jsx,ts,js}",
      "./app/components/screens/**/*.{tsx,jsx,ts,js}",
      "./app/components/screens/***/**/*.{tsx,jsx,ts,js}",

    ],
  presets: [require('nativewind/preset')],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50)/<alpha-value>)',
          100: 'rgb(var(--color-primary-100)/<alpha-value>)',
          200: 'rgb(var(--color-primary-200)/<alpha-value>)',
          300: 'rgb(var(--color-primary-300)/<alpha-value>)',
          400: 'rgb(var(--color-primary-400)/<alpha-value>)',
          500: 'rgb(var(--color-primary-500)/<alpha-value>)',
          600: 'rgb(var(--color-primary-600)/<alpha-value>)',
          700: 'rgb(var(--color-primary-700)/<alpha-value>)',
          800: 'rgb(var(--color-primary-800)/<alpha-value>)',
          900: 'rgb(var(--color-primary-900)/<alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary-50)/<alpha-value>)',
          100: 'rgb(var(--color-secondary-100)/<alpha-value>)',
          200: 'rgb(var(--color-secondary-200)/<alpha-value>)',
          300: 'rgb(var(--color-secondary-300)/<alpha-value>)',
          400: 'rgb(var(--color-secondary-400)/<alpha-value>)',
          500: 'rgb(var(--color-secondary-500)/<alpha-value>)',
          600: 'rgb(var(--color-secondary-600)/<alpha-value>)',
          700: 'rgb(var(--color-secondary-700)/<alpha-value>)',
          800: 'rgb(var(--color-secondary-800)/<alpha-value>)',
          900: 'rgb(var(--color-secondary-900)/<alpha-value>)',
        },
        accent: {
          50: 'rgb(var(--color-accent-50)/<alpha-value>)',
          100: 'rgb(var(--color-accent-100)/<alpha-value>)',
          200: 'rgb(var(--color-accent-200)/<alpha-value>)',
          300: 'rgb(var(--color-accent-300)/<alpha-value>)',
          400: 'rgb(var(--color-accent-400)/<alpha-value>)',
          500: 'rgb(var(--color-accent-500)/<alpha-value>)',
          600: 'rgb(var(--color-accent-600)/<alpha-value>)',
          700: 'rgb(var(--color-accent-700)/<alpha-value>)',
          800: 'rgb(var(--color-accent-800)/<alpha-value>)',
          900: 'rgb(var(--color-accent-900)/<alpha-value>)',
        },

        typography: {
          0: "rgb(var(--color-typography-0)/<alpha-value>)",
          50: "rgb(var(--color-typography-50)/<alpha-value>)",
          100: "rgb(var(--color-typography-100)/<alpha-value>)",
          200: "rgb(var(--color-typography-200)/<alpha-value>)",
          300: "rgb(var(--color-typography-300)/<alpha-value>)",
          400: "rgb(var(--color-typography-400)/<alpha-value>)",
          500: "rgb(var(--color-typography-500)/<alpha-value>)",
          600: "rgb(var(--color-typography-600)/<alpha-value>)",
          700: "rgb(var(--color-typography-700)/<alpha-value>)",
          800: "rgb(var(--color-typography-800)/<alpha-value>)",
          900: "rgb(var(--color-typography-900)/<alpha-value>)",
          950: "rgb(var(--color-typography-950)/<alpha-value>)",
          white: "#FFFFFF",
          gray: "#D4D4D4",
          black: "#181718",
        },
        error: {
          0: 'rgb(var(--color-error-0)/<alpha-value>)',
          50: 'rgb(var(--color-error-50)/<alpha-value>)',
          100: 'rgb(var(--color-error-100)/<alpha-value>)',
          200: 'rgb(var(--color-error-200)/<alpha-value>)',
          300: 'rgb(var(--color-error-300)/<alpha-value>)',
          400: 'rgb(var(--color-error-400)/<alpha-value>)',
          500: 'rgb(var(--color-error-500)/<alpha-value>)',
          600: 'rgb(var(--color-error-600)/<alpha-value>)',
          700: 'rgb(var(--color-error-700)/<alpha-value>)',
          800: 'rgb(var(--color-error-800)/<alpha-value>)',
          900: 'rgb(var(--color-error-900)/<alpha-value>)',
          950: 'rgb(var(--color-error-950)/<alpha-value>)',
        },
      },
    },
    fontFamily:{
      body: ["Roboto", "sans-serif"],
      logo: ["Montserrat", "sans-serif"]
    }
    ,
    boxShadow: {
      "hard-1": "-2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
      "hard-2": "0px 3px 10px 0px rgba(38, 38, 38, 0.20)",
      "hard-3": "2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
      "hard-4": "0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
      "hard-5": "0px 2px 10px 0px rgba(38, 38, 38, 0.10)",
      "soft-1": "0px 0px 10px rgba(38, 38, 38, 0.1)",
      "soft-2": "0px 0px 20px rgba(38, 38, 38, 0.2)",
      "soft-3": "0px 0px 30px rgba(38, 38, 38, 0.1)",
      "soft-4": "0px 0px 40px rgba(38, 38, 38, 0.1)",
    },
  },
  plugins: [gluestackPlugin],
};