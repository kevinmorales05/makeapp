'use client';

import { Button } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useRouter } from "next-intl/client";
import Link from "next/link";

const Logo = () => {
  const router = useRouter();
  const locale = useLocale()

  return (
    <p
      onClick={() => router.push('/', { locale })}
      aria-label="Korean-Cosmetic"
      className="block cursor-pointer font-merienda !text-red-dark text-4xl"
      // size="md"
      color="primary"
    // src="/img/logo.png" 
    // height="50" 
    // width="50" 
    // alt="Logo" 
    >
      {"Make App"}
    </p>
  );
}

export default Logo;
