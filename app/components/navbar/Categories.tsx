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
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsEmojiSunglasses, BsEyedropper, BsFillBagHeartFill, BsSnow } from 'react-icons/bs';
import { IoBodySharp, IoDiamond } from 'react-icons/io5';
import { MdCleanHands, MdFace2, MdFace3, MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { AiOutlineHighlight } from 'react-icons/ai';

export const categories = [
  {
    label: 'Sunscreen',
    icon: BsEmojiSunglasses,
    description: 'This cream protects the skin against the sun!',
  },
  {
    label: 'Skin Care',
    icon: AiOutlineHighlight,
    description: 'This property heps your skin!',
  },
  {
    label: 'Mask Sheet',
    icon: GiCeremonialMask,
    description: 'This property is modern!'
  },
  {
    label: 'Base Make Up',
    icon: GiFingernail,
    description: 'This property is for your base make up!'
  },
  {
    label: 'Eye Make Up',
    icon: BsEyedropper,
    description: 'This is property helps to eye make up!'
  },
  {
    label: 'Lip Make Up',
    icon: GiLips,
    description: 'This property helps to lip make up!'
  },
  {
    label: 'Cleansing',
    icon: MdCleanHands,
    description: 'This property helps to clean your body and skin!'
  },
  {
    label: 'Body Care',
    icon: IoBodySharp,
    description: 'This property helps to care your body and skin!'
  },
  {
    label: 'Hair Care',
    icon: MdFace2,
    description: 'This property helps to care to your hair care!'
  },
  {
    label: "Men's Care",
    icon: GiHealthPotion,
    description: 'This property helps to many men!'
  },
  {
    label: 'Diffuser',
    icon: GiDelicatePerfume,
    description: 'This property provides a beauty diffuser!'
  },
  {
    label: 'Nail',
    icon: TbHandThreeFingers,
    description: "This property provides many cream's nail"
  },
  {
    label: 'Beauty Accessories',
    icon: BsFillBagHeartFill,
    description: 'This property has many beauty accessories!'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

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
        {categories.map((item) => (
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