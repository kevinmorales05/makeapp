'use client'
import { SafeUser } from "@/app/types";

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
// import MegaMenu from "./MegaMenu";
import I18nDropdown from "../dropdowns/I18nDropdown";
import dynamic from "next/dynamic";
import ClientOnly from "../ClientOnly";
import UserMenuSke from "../skeletons/navbar/UserMenuSke";
import { useCategories } from "@/app/hooks/useCategories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const DynamicCategories = dynamic(() => import('./Categories'), {
  ssr: false
});


const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {

  const { allCategories } = useCategories()

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0 mt-2">
            <Logo />

            <ClientOnly exotic={<UserMenuSke />}>
              <I18nDropdown />
              {/* <Search /> */}
              <UserMenu currentUser={currentUser} />
            </ClientOnly>
          </div>
        </Container>
      </div>
      <ClientOnly>
        <DynamicCategories categories={allCategories} />
      </ClientOnly>
      {/* <MegaMenu /> */}
    </div>
  );
}


export default Navbar;