import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import MegaMenu from "./MegaMenu";
import I18nWidget from "../ui/I18nWidget";
// import { SafeUser } from "@app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
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
          "
          >
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