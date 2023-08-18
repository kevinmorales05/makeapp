'use client';

import { useCallback, useState } from "react";
// import { toast } from "react-hot-toast";
import { toast } from 'sonner';

import { signIn } from 'next-auth/react';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { useTranslations } from "next-intl";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations('login')

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> =
    (data) => {
      setIsLoading(true);

      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          setIsLoading(false);

          if (callback?.ok) {
            toast.success(t("toaster.success"));
            router.refresh();
            loginModal.onClose();
          }

          if (callback?.error) {
            // please review
            toast.error(t(`toaster.error`, { error_msg: `${callback.error}` }));
          }
        });
    }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={t("content.title")}
        subtitle={t("content.subtitle")}
      />
      <Input
        id="email"
        label={t("content.inputs.email")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label={t("content.inputs.password")}
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-4">
      <hr />
      <Button
        outline
        label={t("content.footer.button-google")}
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      {/* <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      /> */}
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>{t("content.footer.label")}
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          > {t("content.footer.span-label")}</span>
        </p>
      </div>
    </div>
  )
  console.log("well")
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={t("title")}
      actionLabel={t("content.footer.button")}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
