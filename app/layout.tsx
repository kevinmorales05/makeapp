import { Merienda, Roboto_Serif } from 'next/font/google'
import localFont from 'next/font/local'



import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import Footer from './components/Footer';

export const metadata = {
  title: 'Korean Cosmetic',
  description: 'Amazing Korean Cosmetics',
}

const fontGandhiSerif = localFont({
    src: "./fonts/GandhiSerif-Regular.otf",
    weight: '400',
    display: 'swap',
    style: 'normal',
    variable: '--font-gandhi-serif',
  }
)
const fontMerienda = Merienda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merienda',
})
const fontAuxRoboto = Roboto_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-serif',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" className={`${fontMerienda.variable}`}>
      <body className={`${fontGandhiSerif.variable} ${fontAuxRoboto.variable}`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
        <ClientOnly>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  )
}
