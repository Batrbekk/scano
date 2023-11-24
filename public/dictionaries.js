const dictionaries = {
	en: () => import('../public/locales/en/common.json').then((module) => module.default),
	ru: () => import('../public/locales/ru/common.json').then((module) => module.default),
	kk: () => import('../public/locales/kk/common.json').then((module) => module.default),
}

export const getDictionary = (locale) => dictionaries[locale]()
