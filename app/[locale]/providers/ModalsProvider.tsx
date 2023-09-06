'use client';

import CheckoutModal from "../components/modals/CheckoutModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <RentModal />
      <CheckoutModal />
    </>
  );
}

export default ModalsProvider;