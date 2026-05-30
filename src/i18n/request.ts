import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['en', 'es', 'ru', 'zh', 'ko'];

export default getRequestConfig(async (params: any) => {
  let locale = params.locale || (params.requestLocale ? await params.requestLocale : undefined);
  console.log("LOCALE IS:", locale);
  if (!locales.includes(locale as any)) notFound();
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
