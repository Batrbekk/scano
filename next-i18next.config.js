module.exports = {
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
  defaultNS: "common",
  react: { useSuspense: false }, //TEMP
  reloadOnPrerender: process.env.NODE_ENV !== "production", // DEVELOPMENT-ONLY, IMPORTANT!
};
