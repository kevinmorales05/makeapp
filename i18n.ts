import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: {
    ...(await import(`@/messages/${locale}/${locale}.json`)).default,
    ...(await import(`@/messages/${locale}/categories.json`)).default
  }
}));