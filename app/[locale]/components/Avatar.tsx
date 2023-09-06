'use client';

import { User } from "@nextui-org/react";
import Image from "next/image";
import { SafeUser } from "../types";

interface AvatarProps {
  src: string | null | undefined;
  user: SafeUser | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src, user }) => {
  return (
    <User
      as="button"
      avatarProps={{
        isBordered: true,
        src: src || '/img/placeholder.jpg'

      }}
      name={user?.name}
      description={user?.email}
      className="transition-transform"

    />)
  return (
    <Image
      className="rounded-full border-2 border-red-dark/20"
      height="30"
      width="30"
      alt="Avatar"
      src={src || '/img/placeholder.jpg'}
    />
  );
}

// classNames={{
//   name: "hidden truncate md:block md:max-w-[88px] lg:max-w-[95px]  xl:max-w-[100px]",
//   description: "hidden truncate md:block md:max-w-[88px] lg:max-w-[95px xl:max-w-[100px] ",
// }}
export default Avatar;