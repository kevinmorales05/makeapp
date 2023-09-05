'use client'
import { usePathname, useSearchParams } from 'next/navigation';

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { useLocale, useTranslations } from 'next-intl';
import { useCategories } from '@/app/hooks/useCategories';

const Categories = () => {
  const params = useSearchParams();
  const locale = useLocale();
  const category = params?.get('category');
  const pathname = usePathname();
  // console.log("pathnames", pathname); //  /en/favorites
  // console.log("params: ", params); // readonlySearchparams
  const isMainPage = pathname === '/' || pathname === `/${locale}`;
  const { allCategories } = useCategories()

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
          justify-start
          2xl:justify-evenly
          overflow-x-auto
          lg:hover:overflow-x-auto
        "
      >
        {allCategories.map((item) => (
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