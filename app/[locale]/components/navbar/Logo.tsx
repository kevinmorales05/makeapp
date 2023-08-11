'use client';

import { IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <IconButton
      onClick={() => router.push('/')}
      aria-label="Korean-Cosmetic"
      className="block cursor-pointer font-merienda !text-red-dark"
      size="medium"
    // src="/img/logo.png" 
    // height="50" 
    // width="50" 
    // alt="Logo" 
    >
      Korean Cosmetic
    </IconButton>
  );
}

export default Logo;
