'use client'

import { IDropdownProps } from "./Dropdown";
import { Dropdown as DropdownUI, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Button } from "@nextui-org/react";

import { usePathname, useRouter } from 'next-intl/client';
import { useLocale, useTranslations } from "next-intl"
import { EC, KR, US } from "country-flag-icons/react/3x2";
import useCountries from "@/app/hooks/useCountries";
import { useSearchParams } from "next/navigation";
import { ICON_CLASES_DROPDOWN, LOCALES, SHOP_PARAMS } from "@/app/constants/client_constants";


function I18nDropdown(
  // { trigger, items }: { trigger: React.ReactNode, items: IDropdownProps }
) {
  const t = useTranslations('LocaleSwitcher')
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();


  const onLocaleChange = (e: React.ChangeEvent<HTMLSelectElement> | { currentKey: string } | any) => {
    const newLocale: string = e["currentKey"];

    let requery: string = `?`
    if (params?.get(SHOP_PARAMS.CATEGORY)) {
      requery += `&${SHOP_PARAMS.CATEGORY}=${params?.get(SHOP_PARAMS.CATEGORY)}`
    };
    if (params?.get(SHOP_PARAMS.SUBCATEGORY)) {
      requery += `&${SHOP_PARAMS.SUBCATEGORY}=${params?.get(SHOP_PARAMS.SUBCATEGORY)}`
    };
    if (params?.get(SHOP_PARAMS.SKIP)) {
      requery += `&${SHOP_PARAMS.SKIP}=${params?.get(SHOP_PARAMS.SKIP)}`
    };
    if (params?.get(SHOP_PARAMS.LIMIT)) {
      requery += `&${SHOP_PARAMS.LIMIT}=${params?.get(SHOP_PARAMS.LIMIT)}`
    };
    const rePathname = pathname + requery
    console.log("full pathname ", rePathname);
    router.replace(rePathname, { locale: newLocale });
  }


  // third component rebuild
  const locale = useLocale();
  const { getByFlag } = useCountries()
  let Flag = getByFlag(locale)

  const trigger = (<Button size="sm" startContent={<Flag />} isIconOnly variant="light" aria-label={locale} />
  )

  const items: IDropdownProps = {
    variant: "flat",
    ariaLabel: "Language Actions",
    sections: [
      {
        title: "Choose a language",
        xkey: "Languages",
        content: [
          {
            title: LOCALES.ES,
            description: LOCALES.ES,
            xkey: LOCALES.ES,
            color: "danger",
            onClick: () => { },
            startContent: <Button size="sm" variant="light" startContent={<EC className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          },
          {
            title: LOCALES.EN,
            description: LOCALES.EN,
            xkey: LOCALES.EN,
            color: "danger",
            onClick: () => { },
            startContent: <Button size="sm" variant="light" startContent={<US className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          },
          {
            title: LOCALES.KO,
            description: LOCALES.KO,
            xkey: LOCALES.KO,
            color: "danger",
            onClick: () => { },
            startContent: <Button size="sm" variant="light" startContent={<KR className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          }
        ]
      }]
  }


  return (
    <div className='fixed top-0 right-1 xl:top-1 xl:right-3'>
      <DropdownUI>
        <DropdownTrigger>
          {trigger}
        </DropdownTrigger>
        <DropdownMenu variant={items.variant} aria-label={items.ariaLabel}
          selectionMode="single"
          onSelectionChange={(e) => onLocaleChange(e)}
          defaultSelectedKeys={[locale]}
        >
          {items.sections.map(({ title, showDivider, content, xkey }) => (
            <DropdownSection key={xkey} title={t('titleModal')}
              showDivider={showDivider}>
              {content.map(({ startContent, ...item }) => (
                <DropdownItem
                  key={item.xkey}
                  shortcut={item.shortcut}
                  description={t('description', { locale: item.xkey })}
                  startContent={startContent}
                  color={item.color}
                  className={item.className}
                >
                  {t('title', { locale: item.xkey })}
                </DropdownItem>
              ))}
            </DropdownSection>))}
        </DropdownMenu>
      </DropdownUI>
    </div>
  )
}
export default I18nDropdown