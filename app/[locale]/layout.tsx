import { Merienda, Roboto_Serif } from 'next/font/google'
import localFont from 'next/font/local'

import Navbar from '@/app/components/navbar/Navbar';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import Footer from './components/Footer';
import ModalsProvider from './providers/ModalsProvider';

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { NextUI } from './providers/NextUI';
import Providers from './providers/Providers';


export const metadata = {
  title: 'Korean Cosmetic',
  description: 'Amazing Korean Cosmetics',
}

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'ko' }];
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

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: any
}) {
  const currentUser = await getCurrentUser();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={htmlClasses}>
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
