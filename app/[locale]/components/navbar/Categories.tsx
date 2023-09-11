'use client'
import { usePathname, useSearchParams } from 'next/navigation';

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { useLocale } from 'next-intl';
import { CategoryItem } from '@/app/hooks/useCategories';
import { ButtonGroup } from '@nextui-org/react';

type CategoriesProps = {
  categories: CategoryItem[]
}

const Categories = ({ categories }: CategoriesProps) => {
  const params = useSearchParams();
  const locale = useLocale();
  const category = params?.get('category');
  const pathname = usePathname();
  // console.log("pathnames", pathname); //  /en/favorites
  // console.log("params: ", params); // readonlySearchparams
  const isMainPage = pathname === '/' || pathname === `/${locale}`;

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-start
          2xl:justify-evenly
          overflow-x-auto
          lg:hover:overflow-x-auto
        "
      >
        <ButtonGroup>
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default Categories;