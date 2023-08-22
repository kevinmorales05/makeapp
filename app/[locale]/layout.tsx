import { Merienda, Roboto_Serif } from 'next/font/google'
import localFont from 'next/font/local'

import Navbar from '@/app/components/navbar/Navbar';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import Footer from './components/footer/Footer';

import { NextIntlClientProvider } from 'next-intl';
import Providers from './providers/Providers';

import { notFound } from 'next/navigation'

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}
// be carefull not using when it's dynamic server usage be careful
// export function generateStaticParams() {
//   return ['es', 'en', 'ko'].map((locale) => ({ locale }))
// }

const merienda = Merienda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merienda',
  // fallback: [ "Times New Roman" ],
  adjustFontFallback: true
})
const roboto = Roboto_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-serif',
})

const gandhi = localFont({
  src: "./fonts/GandhiSerif-Regular.otf",
  weight: '400',
  display: 'swap',
  style: 'normal',
  variable: '--font-gandhi-serif',
}
)

export const metadata = {
  title: 'Makeapp',
  description: 'Amazing Korean Cosmetics',
}

export const dynamic = 'force-dynamic'

type RootProps = {
  children: React.ReactNode
  params: { locale: string }
}
export default async function RootLayout({
  children,
  params: { locale }
}: RootProps) {

  const currentUser = await getCurrentUser();
  const messages = await getMessages(locale)
  const htmlClasses = `${merienda.variable} ${gandhi.variable}`

  return (
    <html lang={locale} className={htmlClasses}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientOnly>
            <Navbar currentUser={currentUser} />
            <Providers>
              <div className="pb-20 pt-32">
                {children}
              </div>
            </Providers>
            <Footer />
          </ClientOnly>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}