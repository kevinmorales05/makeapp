'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/react';
import { CategoryKey } from '../hooks/useCategories';

interface CategoryBoxProps {
  icon: IconType,
  label: CategoryKey,
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label: i18Label,
  selected,
}) => {

  console.log("curerntCategory", i18Label)
  const t = useTranslations(`categories.${i18Label}`)



  const label = t('label')


  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: i18Label.split('_').join(' ')
    }

    if (params?.get('category') === i18Label.split('_').join(' ')) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/shop/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [i18Label, router, params]);

  return (
    <Button
      onPress={handleClick}
      className={`
        flex 
        bg-primary-white
        flex-col 
        items-center 
        justify-center 
        h-16
        gap-2
        p-2
        md:p-2
        border-b-2
        hover:text-primary-red/80
        transition
        cursor-pointer
        text-center
        ${selected ? 'border-primary-red/80' : 'border-transparent'}
        ${selected ? 'text-primary-red/80' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm whitespace-nowrap">
        {label}
      </div>
    </Button>
  );
}

export default CategoryBox;