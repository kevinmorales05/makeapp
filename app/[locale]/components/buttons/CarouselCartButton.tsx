'use client';


import { ICartItemState, useCarouselCart } from "@/app/hooks/useCart";
import { SafeUser } from "@/app/types";
import { motion } from "framer-motion"
import { IProductFormatted } from "../../hooks/useProducts";
import { useRouter } from "next/navigation";
import { BsBasket3, BsFillBasket3Fill } from "react-icons/bs";
import { Button, cn } from "@nextui-org/react";

interface CarouselCartButtonProps {
  listing: IProductFormatted,
  currentUser?: SafeUser | null,
  locale: string
}

const CarouselCartButton: React.FC<CarouselCartButtonProps> = ({
  listing,
  currentUser,
  locale
}) => {
  const { hasCarted, toggleCart } = useCarouselCart({
    listing,
    currentUser, locale
  });
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <Button onPress={toggleCart} isIconOnly radius="full"
        className={cn("w-16 h-16 md:w-14 md:h-14 relative shadow-md text-[#222] cursor-pointer transition-all duration-300 ease-linear group-hover:text-black bg-white hover:opacity-80 transition-opacity")}>
        {hasCarted ? <BsFillBasket3Fill className="w-8 h-8 md:w-6 md:h-6 text-[#222]" />
          : <BsBasket3 className="w-8 h-8 md:w-6 md:h-6 text-[#222]" />}

      </Button>
    </motion.div>
  );
}

export default CarouselCartButton;