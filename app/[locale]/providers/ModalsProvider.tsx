'use client';

import dynamic from "next/dynamic";
import CheckoutModal from "../components/modals/CheckoutModal";
import FeedbackModal from "../components/modals/FeedbackModal";
import SearchModal from "../components/modals/SearchModal";

const DynamicLoginModal = dynamic(() => import('@/components/modals/LoginModal'), {
  ssr: false,
})

const DynamicRegisterModal = dynamic(() => import('@/components/modals/RegisterModal'), {
  ssr: false,
})

const ModalsProvider = () => {
  return (
    <>
      <DynamicLoginModal />
      <DynamicRegisterModal />
      <SearchModal />
      <CheckoutModal />
      <FeedbackModal />
    </>
  );
}

export default ModalsProvider;