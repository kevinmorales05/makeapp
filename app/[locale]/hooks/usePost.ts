import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

import originals from "@/public/data/productsKorean.json"

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null
}

const usePost = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  },
    [
      currentUser,
      hasFavorited,
      listingId,
      loginModal,
      router
    ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

const formattedProducts = originals.map((p) => ({
  title: p.title,
  description: p.description,
  category: p.category,
  subCategory: p.subcategory,
  cost: parseFloat(p.cost),
  promoCost: parseFloat(p.promoCost),
  bestSeller: p.bestSeller || p.bestSeller === "0" ? false : true,
  kit: p.kit === "1" || p.kit.toUpperCase() === "KIT".toUpperCase() ? true : false,
  weight: p.weight,
  farmacState: p.farmacState,
  presentation: p.presentation,
  color: p.color,
  src: p.imgUrl,
}))

const formattedProductsToDB = originals.map((p) => ({
  title: p.title,
  description: p.description,
  category: p.category,
  subCategory: p.subcategory,
  cost: parseFloat(p.cost),
  promoCost: "promoCost" in p ? parseFloat(p.promoCost) : 12344321,
  bestSeller: p.bestSeller || p.bestSeller === "0" ? false : true,
  kit: p.kit || p.kit === "0" ? false : true,
  weight: p.weight,
  farmacState: p.farmacState,
  presentation: p.presentation,
  color: p.color,
  imageSrc: p.imgUrl,
  createdAt: new Date(),
  updatedAt: new Date(),
}))

const useTestPrima = () => {
  async function query() {


    const p = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    const r = await p.json()
    console.log("poke", r)


    let request;
    let postOrGet = true
    let deleteAll = false
    const locale = 'en'


    if (postOrGet) {
      request = () => axios.post(`/${locale}/api/posts`
        ,
        formattedProductsToDB,
      )
    } else {
      request = () =>
        axios.get(`/${locale}/api/posts`);
    }
    if (deleteAll) {
      request = () => axios.delete(`/${locale}/api/posts`);
    }

    try {
      const data = await request()
      console.log('resultFinalData', data)

    } catch (e) {
      console.log('over error', e)
    }

  }


  return { query }
}


export default useTestPrima;
