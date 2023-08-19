'use client'
import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import MegaMenu from "./MegaMenu";
import I18nDropdown from "../dropdowns/I18nDropdown";
import { Button } from "@nextui-org/react";
import { useLocale } from "next-intl";
import useCountries from "@/app/hooks/useCountries";
import { IDropdownProps } from "../dropdowns/Dropdown";
import { ICON_CLASES_DROPDOWN, LOCALE_EN, LOCALE_ES, LOCALE_KO } from "@/app/constants/constants";
import { EC, KR, US } from "country-flag-icons/react/3x2";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {

  const locale = useLocale();
  const { getByFlag } = useCountries()
  let Flag = getByFlag(locale)

  const triggerI18n = (<Button size="sm" startContent={<Flag />} isIconOnly variant="light" aria-label={locale} />
  )

  const sectionI18n: IDropdownProps = {
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
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
            mt-2
          "
          >
            <I18nDropdown trigger={triggerI18n} items={sectionI18n} />
            <Logo />
            {/* <Search /> */}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
      {/* <MegaMenu /> */}
    </div>
  );
}


export default Navbar;