import TranslationsProvider from "@/components/providers/translations-provider";
import { Params } from "@/domain/model/params";
import initTranslations from "@/infrastructure/config/i18n/i18nConfig";

interface HomeProps {
  params: Params;
}

const i18nNamespaces = ["home", "account"];

const Home: React.FC<HomeProps> = async ({ params }) => {
  const { t, resources } = await initTranslations(
    params.locale,
    i18nNamespaces
  );

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}
    >
      <main></main>
    </TranslationsProvider>
  );
};

export default Home;
