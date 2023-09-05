import { SafeUser } from "@/app/types";

import Container from "../Container";
import Logo from "./Logo";
// import Search from "./Search";
// import UserMenu from "./UserMenu";
// import MegaMenu from "./MegaMenu";
import I18nDropdown from "../dropdowns/I18nDropdown";
// import dynamic from "next/dynamic";
import ClientOnly from "../ClientOnly";
import I18Ske from "../skeletons/navbar/i18ske";
import UserMenu from "./UserMenu";
import UserMenuSke from "../skeletons/navbar/UserMenuSke";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface NavbarProps {
  currentUser?: SafeUser | null;
}

// const DynamicCategories = dynamic(() => import('./Categories'), {
//   ssr: false
// });


const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row -center justify-between gap-3 md:gap-0 mt-2">

            <Logo />

            <ClientOnly exotic={<I18Ske />}>
              <I18nDropdown />
            </ClientOnly>
            <ClientOnly exotic={<UserMenuSke />}>
              <UserMenu currentUser={currentUser} />
            </ClientOnly>
            {/* <Skeleton /> // Simple, single-line loading skeleton
            <Skeleton count={5} /> */}
          </div>
        </Container>
      </div>
      {/* <ClientOnly>
        <DynamicCategories />
      </ClientOnly> */}

      {/* <MegaMenu /> */}
    </div>
  );
}


export default Navbar;