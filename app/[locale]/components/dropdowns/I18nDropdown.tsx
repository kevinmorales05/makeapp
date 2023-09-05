'use client'

import { IDropdownProps } from "./Dropdown";
import { Dropdown as DropdownUI, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Button } from "@nextui-org/react";

import { usePathname, useRouter } from 'next-intl/client';
import { useLocale, useTranslations } from "next-intl"
import { ICON_CLASES_DROPDOWN, LOCALE_EN, LOCALE_ES, LOCALE_KO } from "@/app/constants/constants";
import { EC, KR, US } from "country-flag-icons/react/3x2";
import useCountries from "@/app/hooks/useCountries";

function I18nDropdown(
  // { trigger, items }: { trigger: React.ReactNode, items: IDropdownProps }
) {
  const t = useTranslations('LocaleSwitcher')
  const router = useRouter();
  const pathname = usePathname();

  const onLocaleChange = (e: React.ChangeEvent<HTMLSelectElement> | { currentKey: string } | any) => {
    const newLocale: string = e["currentKey"];
    router.replace(pathname, { locale: newLocale });
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
            title: LOCALE_ES,
            description: LOCALE_ES,
            xkey: LOCALE_ES,
            color: "danger",
            onClick: () => { },
            startContent: <Button size="sm" variant="light" startContent={<EC className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          },
          {
            title: LOCALE_EN,
            description: LOCALE_EN,
            xkey: LOCALE_EN,
            color: "danger",
            onClick: () => { },
            startContent: <Button size="sm" variant="light" startContent={<US className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          },
          {
            title: LOCALE_KO,
            description: LOCALE_KO,
            xkey: LOCALE_KO,
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