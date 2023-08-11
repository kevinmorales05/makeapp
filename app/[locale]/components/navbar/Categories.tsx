'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbHandThreeFingers, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiCeremonialMask,
  GiDelicatePerfume,
  GiFingernail,
  GiForestCamp,
  GiHealthPotion,
  GiIsland,
  GiLips,
  GiPerfumeBottle,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsEmojiSunglasses, BsEyedropper, BsFillBagHeartFill, BsSnow } from 'react-icons/bs';
import { IoBodySharp, IoDiamond } from 'react-icons/io5';
import { MdCleanHands, MdFace2, MdFace3, MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { AiOutlineHighlight } from 'react-icons/ai';
import { useLocale, useTranslations } from 'next-intl';

export const categories = () => {
  const t = useTranslations("navbar.categories")
  return [
    {
      label: t("derma-plan.label"),
      icon: GiLips,
      description: t("derma-plan.description"),
    },
    {
      label: t("skin-care.label"),
      icon: AiOutlineHighlight,
      description: t("skin-care.description"),
    },
    {
      label: t("sun-care.label"),
      icon: BsEmojiSunglasses,
      description: t("sun-care.description"),
    },
    {
      label: t("toner-skin.label"),
      icon: MdCleanHands,
      description: t("toner-skin.description"),
    },
    {
      label: t("wrinkle-solution-toner.label"),
      icon: GiHealthPotion,
      description: t("wrinkle-solution-toner.description"),
    },
    {
      label: t("lotion.label"),
      icon: GiPerfumeBottle,
      description: t("lotion.description"),
    },
    {
      label: t("skin.label"),
      icon: MdFace2,
      description: t("skin.description"),
    },
    {
      label: t("body-care.label"),
      icon: IoBodySharp,
      description: t("body-care.description"),
    },
    {
      label: t("mask-pack.label"),
      icon: GiCeremonialMask,
      description: t("mask-pack.description"),
    },
    {
      label: t("make-up.label"),
      icon: BsEyedropper,
      description: t("make-up.description"),
    },
    {
      label: t("all-in-one.label"),
      icon: BsFillBagHeartFill,
      description: t("all-in-one.description"),
    },
    {
      label: t("perfume.label"),
      icon: GiDelicatePerfume,
      description: t("perfume.description"),
    },
    {
      label: t("nail-care.label"),
      icon: TbHandThreeFingers,
      description: t("nail-care.description"),
    },

  ]
}



const Categories = () => {
  const params = useSearchParams();
  const locale = useLocale();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/' || pathname === `/${locale}`;

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-1
          flex 
          flex-row 
          items-center 
          justify-between
          hover:overflow-x-auto
        "
      >
        {categories().map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;