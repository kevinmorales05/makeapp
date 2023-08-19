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

export function generateStaticParams() {
  return ['es', 'en', 'ko'].map((locale) => ({ locale }))
}

const gandhi = localFont({
  src: "./fonts/GandhiSerif-Regular.otf",
  weight: '400',
  display: 'swap',
  style: 'normal',
  variable: '--font-gandhi-serif',
}
)
const merienda = Merienda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merienda',
})
const roboto = Roboto_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-serif',
})

const htmlClasses = `${merienda.variable}  ${gandhi.variable} ${roboto.variable}`


export const metadata = {
  title: 'Korean Cosmetic',
  description: 'Amazing Korean Cosmetics',
}

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

  return (
    <html lang={"es"} className={htmlClasses}>
      <body >
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