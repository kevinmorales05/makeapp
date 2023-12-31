import { Merienda } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'


import ClientOnly from './components/ClientOnly';

import Navbar from '@/app/components/navbar/Navbar';
import Providers from './providers/Providers';
import { notFound } from 'next/navigation'

import { NextIntlClientProvider, createTranslator, useLocale } from 'next-intl';
import getCurrentUser from './actions/getCurrentUser';

const merienda = Merienda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merienda',
  // fallback: [ "Times New Roman" ],
  adjustFontFallback: true
})
// const roboto = Roboto_Serif({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-roboto-serif',
// })

const gandhi = localFont({
  src: "./fonts/GandhiSerif-Regular.otf",
  weight: '400',
  display: 'swap',
  style: 'normal',
  variable: '--font-gandhi-serif',
}
)

async function getMessages(locale: string) {
  try {
    const msgs = {
      ...(await import(`@/messages/${locale}/${locale}.json`)).default,
      ...(await import(`@/messages/${locale}/categories.json`)).default,
      ...(await import(`@/messages/${locale}/products.json`)).default,
    }
    return msgs
  } catch (error) {
    notFound()
  }
}
// be carefull not using when it's dynamic server usage be careful
// export function generateStaticParams() {
//   return ['es', 'en', 'ko'].map((locale) => ({ locale }))
// }
// export const dynamic = 'force-dynamic'

type RootProps = {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: RootProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t("Metadata.title"),
    description: t("Metadata.description") || "Amazing Korean Cosmetics",
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootProps) {

  // const currentLocale = useLocale();
  // if (locale !== currentLocale) {
  //   notFound();
  // }

  const currentUser = await getCurrentUser();
  const messages = await getMessages(locale)
  const htmlClasses = `${merienda.variable} ${gandhi.variable}`

  return (
    <html lang={locale} className={htmlClasses}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar currentUser={currentUser} locale={locale} />
          <ClientOnly>
            <Providers>
              <div className="pb-20 pt-32">
                {children}
              </div>
            </Providers>
          </ClientOnly>
        </NextIntlClientProvider>
        {/* <Footer /> */}
      </body>
    </html >
  )
}