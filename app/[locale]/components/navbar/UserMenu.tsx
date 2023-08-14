"use client";

import { useCallback, useEffect, useState, Fragment, useRef } from "react";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { RiArrowDownSLine, RiArrowDropDownLine, RiUserReceivedFill } from "react-icons/ri";
import { LuIceCream, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";

import { signOut } from "next-auth/react";
import { useRouter } from 'next-intl/client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { BsHousesFill } from "react-icons/bs";

import { Menu, Transition } from '@headlessui/react'
import DropdownMain from "../dropdowns/DropdownMain";
import { EC } from 'country-flag-icons/react/3x2'

import { Avatar as Avatars, User } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { stringify } from "querystring";


interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const locale = useLocale();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);
  const menuItems = [
    //   {
    //   label: "My shoppings",
    //   onClick: () => router.push("/trips"),
    //   icon: AiOutlineShoppingCart,
    // },
    // {
    //   label: "My favorites",
    //   onClick: () => router.push("/favorites"),
    //   icon: AiOutlineHeart,
    // },
    {
      label: "My invoices",
      onClick: () => router.push("/reservations"),
      icon: RiUserReceivedFill,
    },
    {
      label: "My voices home",
      onClick: () => router.push("/properties"),
      icon: BsHousesFill,
    },
    {
      label: "Korean Cosmetic your home",
      onClick: rentModal.onOpen,
      icon: LuIceCream,
    },
    {
      label: "Logout",
      onClick: () => signOut(),
      icon: LuLogOut,
    },
  ]

  const trigger = (<User
    as="button"
    avatarProps={{
      isBordered: true,
      src: currentUser?.image || '/img/placeholder.jpg'
    }}
    name={currentUser?.name}
    description={currentUser?.email}
    className="transition-transform"
    classNames={{
      name: "hidden truncate lg:block lg:max-w-[95px] xl:max-w-full",
      description: "hidden truncate lg:block lg:max-w-[95px] xl:max-w-full ",
    }}
  />)

  const itemsUser = [
    {
      children: <><p className="font-semibold">Signed in as</p>
        <p className="font-semibold">{currentUser?.email}</p></>,
      key: "profile",
      className: "h-14 gap-2",
      isIcon: false,
      onclick: () => console.log('espaniol')
    },
    {
      children: "My invoices",
      key: "inovoices",
      className: "",
      isIcon: true,
      icon: RiUserReceivedFill,
      onclick: () => router.push('/reservations', { locale })
    },
    {
      children: "My voices home",
      key: "invoices_home",
      className: "",
      isIcon: true,
      icon: BsHousesFill,
      onclick: () => router.push("/properties", { locale })
    },
    {
      children: "Korean Cosmetic your home",
      key: "korean_cosmetic_your_home",
      className: "",
      isIcon: true,
      icon: LuIceCream,
      onclick: rentModal.onOpen,
    },
    {
      children: <>Log Out</>,
      key: "logout",
      className: "",
      isIcon: true,
      icon: LuLogOut,
      onclick: () => signOut(),
    },
    {
      children: <><hr /><p>Configurations</p></>,
      key: "configurations",
      className: "",
      isIcon: false,
      onclick: () => console.log('configurations')
    },
    {
      children: <>Help & Feedback</>,
      key: "help_and_feedback",
      className: "",
      isIcon: false,
      onclick: () => console.log('help_and_feedback')
    },
  ];

  const itemsWithoutUser = [
    {
      children: "Login",
      key: "login",
      className: "",
      isIcon: true,
      icon: LuLogIn,
      onclick: loginModal.onOpen
    },
    {
      children: "Sign Up",
      key: "sign_up",
      className: "",
      isIcon: true,
      icon: LuUserPlus,
      onclick: registerModal.onOpen
    },

  ];
  return (
    <div className="relative">
      <div className="flex flex-row items-center sm:gap-3">
        <div
          onClick={() => router.push("/favorites")}
          className="
            block
            text-sm 
            font-bold
            py-3 
            sm:px-4 
            rounded-full 
          hover:text-red-dark
          hover:bg-red-dark/10
            transition 
            cursor-pointer
          "
        >
          <AiOutlineHeart size={30} />
          <span
            className="
            absolute
          bg-red-dark
          text-white
            bottom-0
            ml-4
            inline-block whitespace-nowrap rounded-full 
            px-[0.60em] 
            pb-[0.25em]
            pt-[0.35em]
            text-center 
            align-baseline 
            text-[.9em] 
            font-bold 
            leading-none 
            //text-secondary-800"
          >
            12
          </span>
        </div>
        <div
          onClick={() => router.push("/trips")}
          className="
          block
          text-sm 
          font-bold 
          py-3 
          px-4 
        hover:text-red-dark
        hover:bg-red-dark/10
          rounded-full 
          transition 
          cursor-pointer
          "
        >
          <AiOutlineShoppingCart size={30} />
          <span
            className="
          absolute
          bottom-0
          bg-red-dark
           text-white
            ml-4
            inline-block whitespace-nowrap rounded-full 
            px-[0.60em] 
            pb-[0.25em]
            pt-[0.35em]
            text-center 
            align-baseline 
            text-[.9em] 
            font-bold 
            leading-none 
            //text-secondary-800"
          >
            12
          </span>
        </div>


        {currentUser ? (
          <DropdownMain trigger={trigger} items={itemsUser} />
        ) : (
          <DropdownMain trigger={trigger} items={itemsWithoutUser} />
        )}

      </div>
    </div>
  );
};

export default UserMenu;


// <Menu as="div"
// className="  
// px-2
// py-3
// //border-[1px] 
// flex 
// flex-row 
// items-center 
// justify-center
// gap-2
// rounded-full 
// cursor-pointer 
// hover:shadow-md 
// transition
// "
// >
// <Menu.Button
//   className="flex items-center"
// >
//   <div>
//     <Avatar src={currentUser?.image} user={currentUser} />
//   </div>
//   {/* well {JSON.stringify(currentUser)} */}
//   <RiArrowDownSLine />
// </Menu.Button>
// <Transition
//   as={Fragment}
//   enter="transition ease-out duration-100"
//   enterFrom="transform opacity-0 scale-95"
//   enterTo="transform opacity-100 scale-100"
//   leave="transition ease-in duration-75"
//   leaveFrom="transform opacity-100 scale-100"
//   leaveTo="transform opacity-0 scale-95"
// >
//   <Menu.Items
//     //   className="
//     // absolute right-0 mt-[330px] w-56 origin-top-right rounded-md
//     // bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//     className="
//   absolute 
//   rounded-xl 
//   shadow-xl
//   //w-[40vw]
//   w-56
//   bg-white 
//   overflow-hidden 
//   right-0 
//   top-12 
//   text-sm
//   ring-1 ring-black ring-opacity-5 focus:outline-none
// ">
//     <div className="px-1 py-1 ">
//       <>
//         {currentUser ? (
//           <>
//             {
//               menuItems.map((it: any) => (
//                 <div key={it.label}>
//                   {it.label.startsWith("Logout") ? <>
//                     <hr />
//                     <MenuItem label={it.label} onClick={it.onClick} icon={it.icon} />
//                   </> :
//                     <MenuItem label={it.label} onClick={it.onClick} icon={it.icon} />
//                   }
//                 </div>
//               ))
//             }
//           </>
//         ) : <>
//           <MenuItem label="Login" onClick={loginModal.onOpen} icon={LuLogIn} />
//           <MenuItem label="Sign up" onClick={registerModal.onOpen} icon={LuUserPlus} /></>}
//       </>
//     </div>
//   </Menu.Items>
// </Transition>
// </Menu>