'use client';

import CheckoutModal from "../components/modals/CheckoutModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <CheckoutModal />
    </>
  );
}

export default ModalsProvider;