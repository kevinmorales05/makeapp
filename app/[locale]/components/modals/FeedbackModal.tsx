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
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../buttons/Button";
import { useTranslations } from "next-intl";
import useFeedbackModal from "@/app/hooks/useFeedbackModal";
import { Button as ButtonUI, Checkbox, CheckboxGroup, Input, Textarea, cn } from "@nextui-org/react";
import { BsEmojiAngry, BsEmojiExpressionless, BsEmojiFrown, BsEmojiHeartEyes, BsEmojiNeutral, BsFillEmojiAngryFill, BsFillEmojiExpressionlessFill, BsFillEmojiFrownFill, BsFillEmojiHeartEyesFill, BsHeartFill } from "react-icons/bs";
import { apix } from "@/app/constants/axios-instance";

export enum RELEVANCE {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
}

export enum WOULD_RECOMMEND {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
}

const FeedbackModal = () => {
  const feedbackModal = useFeedbackModal();
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("feedback_modal");
  const [relevance, setRelevance] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState("");

  const {
    register, setValue,
    handleSubmit,
    reset,
    trigger,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      relevance: '',
      comment: '',
      would_recommend: '',
      email: '',
    },
  });

  const handlerRelevance = async (char: RELEVANCE) => {
    let option = '';
    switch (char) {
      case RELEVANCE.ONE:
        option = RELEVANCE.ONE
        break;
      case RELEVANCE.TWO:
        option = RELEVANCE.TWO
        break;
      case RELEVANCE.THREE:
        option = RELEVANCE.THREE
        break;
      case RELEVANCE.FOUR:
        option = RELEVANCE.FOUR
        break;
      case RELEVANCE.FIVE:
        option = RELEVANCE.FIVE
        break;
      case RELEVANCE.THREE:
        option = RELEVANCE.THREE
        break;
    }
    let alreadyChecked = relevance === option ? '' : option;

    setValue('relevance', alreadyChecked, {
      // shouldDirty: false,
      // shouldTouch: false,
      shouldValidate: true
    });
    await trigger('relevance');

    setRelevance(alreadyChecked);
    if (alreadyChecked) {
    }
    // clearErrors('relevance');
  }
  const handlerWouldRecommend = (char: WOULD_RECOMMEND) => {

    let option = '';
    switch (char) {
      case WOULD_RECOMMEND.ONE:
        option = WOULD_RECOMMEND.ONE
        break;
      case WOULD_RECOMMEND.TWO:
        option = WOULD_RECOMMEND.TWO
        break;
      case WOULD_RECOMMEND.THREE:
        option = WOULD_RECOMMEND.THREE
        break;
      case WOULD_RECOMMEND.FOUR:
        option = WOULD_RECOMMEND.FOUR
        break;
      case WOULD_RECOMMEND.FIVE:
        option = WOULD_RECOMMEND.FIVE
        break;
      case WOULD_RECOMMEND.THREE:
        option = WOULD_RECOMMEND.THREE
        break;
    }
    let alreadyChecked = wouldRecommend === option ? '' : option;
    setValue('would_recommend', alreadyChecked);
    setWouldRecommend(alreadyChecked);
    // clearErrors('would_recommend');
  }

  const clearValues = () => {
    reset();
    setRelevance('');
    setWouldRecommend('');
    setIsLoading(false);
    feedbackModal.onClose();
  }
  const onSubmit: SubmitHandler<FieldValues> =
    (data) => {
      toast.promise(apix().post("feedback", data), {
        loading: t('promise.loading'),
        success: ({ data }) => {
          console.log("data", data)
          clearValues()
          return t("promise.success");
        },
        error: (callbackError) => {
          setIsLoading(false);
          return t('promise.error')
        },
      });
    }

  const onToggle = useCallback(() => {
    feedbackModal.onClose();
    feedbackModal.onOpen();
  }, [feedbackModal])



  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{t("inputs.relevance.title")}</p>
        <div className="flex gap-4 justify-start items-center">
          <div className="flex flex-col  justify-center items-center group">
            <ButtonUI
              {...register(`relevance`, { required: true })}
              onPress={() => handlerRelevance(RELEVANCE.ONE)}
              isIconOnly variant="light"
              startContent={
                <div className={cn("relative flex justify-center items-center hover:opacity-100", relevance === RELEVANCE.ONE ? 'opacity-100' : 'opacity-60')}>
                  <BsFillEmojiAngryFill size={36} className="fill-yellow-400 absolute" />
                  <BsEmojiAngry size={36} className="fill-black absolute" />
                </div>
              }
            />
            <p className={cn("text-sm opacity-0 group-hover:opacity-100", relevance === RELEVANCE.ONE && 'opacity-100')}>{t("inputs.relevance.number", { relevance: RELEVANCE.ONE })}</p>
          </div>
          <div className="flex flex-col  justify-center items-center group">
            <ButtonUI
              onPress={() => handlerRelevance(RELEVANCE.TWO)}
              {...register(`relevance`, { required: true })}
              isIconOnly variant="light"
              startContent={
                <div className={cn("relative flex justify-center items-center hover:opacity-100", relevance === RELEVANCE.TWO ? 'opacity-100' : 'opacity-60')}>
                  <BsFillEmojiFrownFill size={36} className="fill-yellow-400 absolute" />
                  <BsEmojiFrown size={36} className="fill-black absolute" />
                </div>
              }
            />
            <p className={cn("text-sm opacity-0 group-hover:opacity-100", relevance === RELEVANCE.TWO && 'opacity-100')}>{t("inputs.relevance.number", { relevance: RELEVANCE.TWO })}</p>
          </div>
          <div className="flex flex-col  justify-center items-center group">
            <ButtonUI
              onPress={() => handlerRelevance(RELEVANCE.THREE)}
              {...register(`relevance`, { required: true })}
              isIconOnly variant="light"
              startContent={
                <div className={cn("relative flex justify-center items-center hover:opacity-100", relevance === RELEVANCE.THREE ? 'opacity-100' : 'opacity-60')}>
                  <BsFillEmojiExpressionlessFill size={36} className="fill-yellow-400 absolute" />
                  <BsEmojiExpressionless size={36} className="fill-black absolute" />
                </div>
              }
            />
            <p className={cn("text-sm opacity-0 group-hover:opacity-100", relevance === RELEVANCE.THREE && 'opacity-100')}>{t("inputs.relevance.number", { relevance: RELEVANCE.THREE })}</p>
          </div>
          <div className="flex flex-col  justify-center items-center group">
            <ButtonUI
              onPress={() => handlerRelevance(RELEVANCE.FOUR)}
              {...register(`relevance`, { required: true })}
              isIconOnly variant="light"
              startContent={
                <div className={cn("relative flex justify-center items-center hover:opacity-100", relevance === RELEVANCE.FOUR ? 'opacity-100' : 'opacity-60')}>
                  <BsFillEmojiHeartEyesFill size={36} className="fill-yellow-400 absolute" />
                  <BsEmojiHeartEyes size={36} className="fill-black absolute" />
                </div>
              }
            />
            <p className={cn("text-sm opacity-0 group-hover:opacity-100", relevance === RELEVANCE.FOUR && 'opacity-100')}>{t("inputs.relevance.number", { relevance: RELEVANCE.FOUR })}</p>
          </div>
          <div className="flex flex-col  justify-center items-center group">
            <ButtonUI
              onPress={() => handlerRelevance(RELEVANCE.FIVE)}
              {...register(`relevance`, { required: true })}
              isIconOnly variant="light" startContent={
                <div className={cn("relative flex justify-center items-center hover:opacity-100", relevance === RELEVANCE.FIVE ? 'opacity-100' : 'opacity-60')}>
                  <BsHeartFill size={36} className="fill-primary-red absolute" />
                </div>
              }
            />
            <p className={cn("text-sm opacity-0 group-hover:opacity-100", relevance === RELEVANCE.FIVE && 'opacity-100')}>{t("inputs.relevance.number", { relevance: RELEVANCE.FIVE })}</p>
          </div>
        </div>
        {errors.relevance && <p className="text-danger text-tiny">{t("inputs.relevance.error")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold">{t("inputs.comment.title")}</p>
        <Textarea
          id={`country`}
          color="primary"
          isInvalid={false}
          variant="bordered"
          placeholder={t("inputs.comment.text_area")}
          defaultValue=""
          className="max-w-xs"
          disabled={isLoading}
          errorMessage={errors.comment && t("inputs.comment.error")}
          {...register(`comment`, { required: true })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold">{t("inputs.recommend.title")}</p>
        <div className="flex gap-4">
          <div className="flex gap-8">
            <Checkbox
              aria-label="1"
              value={WOULD_RECOMMEND.ONE}
              isSelected={wouldRecommend === WOULD_RECOMMEND.ONE}
              onValueChange={(e: any) => handlerWouldRecommend(WOULD_RECOMMEND.ONE)}
              {...register(`would_recommend`, { required: true, })}
            >1</Checkbox>

            <Checkbox
              aria-label="1"
              value={WOULD_RECOMMEND.TWO}
              isSelected={wouldRecommend === WOULD_RECOMMEND.TWO}
              onValueChange={(e: any) => handlerWouldRecommend(WOULD_RECOMMEND.TWO)}
              {...register(`would_recommend`, { required: true, })}

            >2</Checkbox>
            <Checkbox aria-label="1"
              value={WOULD_RECOMMEND.THREE}
              isSelected={wouldRecommend === WOULD_RECOMMEND.THREE}
              onValueChange={(e: any) => handlerWouldRecommend(WOULD_RECOMMEND.THREE)}
              checked={false}
              {...register(`would_recommend`, { required: true, })}
            >3</Checkbox>
            <Checkbox
              aria-label="1"
              value={WOULD_RECOMMEND.FOUR}
              isSelected={wouldRecommend === WOULD_RECOMMEND.FOUR}
              onValueChange={(e: any) => handlerWouldRecommend(WOULD_RECOMMEND.FOUR)}
              {...register(`would_recommend`, { required: true, })}
            >4</Checkbox>
            <Checkbox
              aria-label="1"
              value={WOULD_RECOMMEND.FIVE}
              isSelected={wouldRecommend === WOULD_RECOMMEND.FIVE}
              onValueChange={(e: any) => handlerWouldRecommend(WOULD_RECOMMEND.FIVE)}
              {...register(`would_recommend`, { required: true, })}
            >5</Checkbox>
          </div>
        </div>
        {errors.would_recommend && <p className="text-danger text-tiny">{t("inputs.recommend.error")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold">{t("inputs.email.title")}</p>
        <Input
          id={`country`}
          size='lg'
          type="text"
          variant="bordered"
          classNames={{ base: cn("hover:bg-content2") }}
          radius='sm'
          disabled={isLoading}
          color={errors.email ? "danger" : 'primary'}
          {...register(`email`, { required: false })}
        />
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={feedbackModal.isOpen}
      title={t("title")}
      actionLabel={t("inputs.submit")}
      onClose={feedbackModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default FeedbackModal;
