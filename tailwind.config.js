/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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

