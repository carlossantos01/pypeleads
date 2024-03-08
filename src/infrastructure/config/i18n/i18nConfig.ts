import { Resource, createInstance, i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

export const i18nConfig = {
  locales: ["pt-BR"],
  // locales: ["pt-BR", "en-US"], Use for english language
  defaultLocale: "pt-BR",
  basePath: process.env.NEXT_PUBLIC_BASE_HREF,
};

const initTranslations = async (
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Resource
) => {
  i18nInstance = i18nInstance ?? createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/infrastructure/language/${language}/${namespace}.json`)
      )
    );
  }
  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
};

export default initTranslations;
