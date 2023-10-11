//const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class", // or 'media' or 'class', also darkMode increases bundle size noticeably
  theme: {
    extend: {
      screens: {
        xs: "360px",
        xsh: { raw: `(min-height: 360px)` },
        smh: { raw: `(min-height: 600px)` },
        mdh: { raw: `(min-height: 960px)` },
        lgh: { raw: `(min-height: 1280px)` },
        xlh: { raw: `(min-height: 1920px)` },
      },
      margin: {
        '2/12': '16.666667%'
      }
    },
  },
  plugins: [
    nextui(),
    require('tailwindcss-animated'),
    require('@tailwindcss/typography'),
    plugin(({ addUtilities }) => {
      const extendTextTransform = {
        ".uppercase-first": {
          "&::first-letter": {
            textTransform: "uppercase",
          },
        },
        ".uppercase-firstOnly": {
          textTransform: "lowercase",
          "&::first-letter": {
            textTransform: "uppercase",
          },
        },
      };
      addUtilities(extendTextTransform, ["responsive"]);
    }),
  ],
};
