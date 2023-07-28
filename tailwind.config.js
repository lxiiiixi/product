/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: "0px 4px 30px #cde1f4", // default
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
    colors: {
      main: {
        blue: "#1c484d", // 品牌logo主色
        violet: "#4f71ed",// 每个页面标题背景色
        textGray: '#58647B', // 偏灰的字体颜色
      },
      levelColor: {
        warning: '#FCF26B',
        danger: '#F76560',
        safe: '#5B8FF9',
      },
      object: {
        token: "#3f6ef5",
        contract: "#ff909b",
        eoa: "#00d5a6"
      },
      ...colors
    },
    debugScreens: {
      position: ['bottom', 'left'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // https://tailwindcss.com/docs/typography-plugin
    // require('prettier-plugin-tailwindcss'), // https://github.com/tailwindlabs/prettier-plugin-tailwindcss
    require('tailwindcss-debug-screens'), // https://github.com/jorenvanhee/tailwindcss-debug-screens
  ],
  corePlugins: {
    preflight: false
  }
}

