import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookSquare } from 'react-icons/fa'
import FooterLinks from './FooterLinks';
export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer")
  return (
    <div className="flex items-center justify-center flex-col my-2">
      <Image src="/img/logo.png" alt="Makeapp" width="50" height="50" />
      <p className="text-gray-400">{t('title')} </p>
      <p className="w-[50%] text-sm">{t('subtitle')}</p>
      <div className="icons flex items-center justify-around flex-wrap w-full md:w-1/4  my-2">
        <Image src="/img/icons/visa.png" alt="visa" width="30" height="30" />
        <Image src="/img/icons/mastercard.png" alt="visa" width="30" height="30" />
        <Image src="/img/icons/paypal.png" alt="visa" width="30" height="30" />
      </div>
      <FooterLinks />
      <div className="flex items-center justify-center my-2 flex-col">
        <p className="w-full">{t('networks')}</p>
        <div className="flex">
          <AiOutlineInstagram className="mx-2" style={{ width: "30", height: "30" }} />
          <FaFacebookSquare className="mx-2" style={{ width: "30", height: "30" }} />
        </div>
      </div>
    </div>
  )
}
