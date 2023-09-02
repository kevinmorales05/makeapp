'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from "react";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
// import { categories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';
import { useCategories } from '@/app/hooks/useCategories';
import { useTranslations } from 'next-intl';
import useCheckoutModal from '@/app/hooks/useCheckoutModal';
import HasAccount from '@/app/carts/HasAccount';
import useLoginModal from '@/app/hooks/useLoginModal';
import { Button, ButtonGroup, Checkbox, CheckboxGroup, Chip, Link, Listbox, ListboxItem, ScrollShadow, User, cn } from '@nextui-org/react';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { FaMotorcycle } from 'react-icons/fa';
import { Input as InputUI } from "@nextui-org/react";
import { motion } from 'framer-motion'

enum STEPS {
  DELIVERY = 0,
  CONTACT = 1,
  SUMMARY = 2,
  PAYMENT = 3
}
enum STOMPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

enum DELIVERY_MODE {
  PICKUP = "pick_up",
  SHIP = "ship",
}
const CheckoutModal = () => {
  const router = useRouter();
  const checkoutModal = useCheckoutModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.DELIVERY);
  const t = useTranslations("categories")
  const { allCategories } = useCategories()

  const [deliveryMethod, setDeliveryMethod] = React.useState<string[]>([""]);

  const handlerDeliveryMethod = (e: any) => {
    if (e.length !== 0) {
      const getLastCheckBox: string = e[e.length - 1];
      setDeliveryMethod([getLastCheckBox])
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');



  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PAYMENT) {
      return onNext();
    }

    setIsLoading(true);

    console.log("all data", data)
    axios.post('/api/payments', data)
      .then(() => {
        toast.success('Listing created!');
        //reseting
        router.refresh();
        reset();
        setStep(STEPS.DELIVERY)
        checkoutModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PAYMENT) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DELIVERY) {
      return undefined
    }

    return 'Back'
  }, [step]);


  // CATEGORY STEP 1
  let bodyContent = (
    <div className="flex flex-col gap-2">
      {/* <HasAccount onOpenModal={loginModal.onOpen} endText /> */}
      <Heading
        title="Describe your shipping?"
      />

      <div className="flex flex-col gap-1 w-full">
        <CheckboxGroup
          label="Delivery method"
          value={deliveryMethod}
          onChange={(e: any) => handlerDeliveryMethod(e)}
          classNames={{
            base: "w-full"
          }}
        >
          <CustomCheckbox value="ship" text="Ship" icon={<FaMotorcycle />} />
          <CustomCheckbox value="pick_up" text="Pick Up" icon={<MdOutlineLocalShipping />}
          />
        </CheckboxGroup>
      </div>
      {deliveryMethod.length !== 0 && deliveryMethod[0] === DELIVERY_MODE.SHIP &&
        <ScrollShadow className="w-full h-[400px]" size={20}>
          <motion.div
            key="ship_container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .2 }}
            className='flex flex-col gap-4'
          >
            <span className='text-[#71717a] font-base'>Shipping Address</span>
            <InputUI
              id='country'
              size='lg'
              type="text"
              variant="bordered"
              classNames={{ base: cn("hover:bg-content2") }}
              label="Country/Region"
              placeholder='Enter your country name or region'
              radius='sm'
              disabled={isLoading}
              color={errors["country"] ? "danger" : "primary"}
              errorMessage={errors["country"] && "Please enter a valid country name"}

              {...register("country", { required: true })}
            />
            <InputUI
              id='city'
              size='lg'
              type="text"
              classNames={{ base: cn("hover:bg-content2") }}
              variant="bordered"
              label="City"
              placeholder='Enter your city name'
              radius='sm'
              disabled={isLoading}
              color={errors["city"] ? "danger" : "primary"}
              errorMessage={errors["city"] && "Please enter a valid city name"}

              {...register("city", { required: true })}
            />
            <InputUI
              id='neighborhood'
              classNames={{ base: cn("hover:bg-content2") }}
              size='lg'
              type="text"
              variant="bordered"
              label="Neighborhood"
              placeholder='Enter your neighborhood name'
              radius='sm'
              disabled={isLoading}
              color={errors["neighborhood"] ? "danger" : "primary"}
              errorMessage={errors["neighborhood"] && "Please enter a valid neighborhood name"}

              {...register("neighborhood", { required: true })}
            />
            <InputUI
              id='address'
              classNames={{ base: cn("hover:bg-content2") }}
              size='lg'
              type="text"
              variant="bordered"
              label="Address"
              placeholder='Enter your address'
              radius='sm'
              disabled={isLoading}
              color={errors["address"] ? "danger" : "primary"}
              errorMessage={errors["address"] && "Please enter a valid address"}

              {...register("address", { required: true })}
            />
            <InputUI
              id='apartment'
              classNames={{ base: cn("hover:bg-content2") }}
              size='lg'
              type="text"
              variant="bordered"
              label="Apartment/suite/#home"
              placeholder='Enter your specific location (optional)'
              radius='sm'
              disabled={isLoading}
              color={errors["apartment"] ? "danger" : "primary"}
              errorMessage={errors["apartment"] && "Please enter a valid apartment number"}

              {...register("apartment", { required: false })}
            />
            <InputUI
              id='postal_code'
              classNames={{ base: cn("hover:bg-content2") }}
              size='lg'
              type="number"
              variant="bordered"
              label="Postal code"
              placeholder='Enter your postal code (optional)'
              radius='sm'
              disabled={isLoading}
              color={errors["postal_code"] ? "danger" : "primary"}
              errorMessage={errors["apartmpostal_codeent"] && "Please enter a valid postal code"}
              {...register("postal_code", { required: false })}
            />
          </motion.div>
        </ScrollShadow>
      }
      {deliveryMethod.length !== 0 && deliveryMethod[0] === DELIVERY_MODE.PICKUP &&
        <ScrollShadow className="w-full h-[300px]" size={20}>
          <motion.div
            key="pick_up_container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .2 }}
            className='flex flex-col gap-4'
          >
            <span className='text-[#71717a] font-base'>PickUp Location</span>
            <InputUI
              id='local_store'
              classNames={{ base: cn("hover:bg-content2 hover:border-primary border-2 border-transparent rounded-lg") }}
              isReadOnly
              type="email"
              size='lg'
              variant="bordered"
              label="N954 Av. Padre Luis Vaccari y Galo Plaza Lasso"
              placeholder='Store location'
              defaultValue="Quito, Ecuador"
              radius='sm'
              disabled={isLoading}
              color={errors["local_store"] ? "danger" : "primary"}
            />
          </motion.div>
        </ScrollShadow>
      }
      {/* {allCategories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) =>
                setCustomValue('category', category)}
              selected={category === item.label}
              label={t(`${item.label}.label`)}
              icon={item.icon}
            />
          </div>
        ))} */}
    </div>
  )


  if (step === STEPS.CONTACT) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <Heading
          title="Where are you located?"
          subtitle="Help delivers find you!"
        />
        <ScrollShadow className="w-full h-[300px]" size={0}>
          <motion.div
            key="pick_up_container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .2 }}
            className='flex flex-col gap-4'
          >
            <span className='text-[#71717a] font-base'>Contact</span>
            <InputUI
              id='email'
              classNames={{ base: cn("hover:bg-content2") }}
              type="email"
              size='lg'
              variant="bordered"
              label="Email"
              placeholder='Enter your email address'
              labelPlacement='inside'
              radius='sm'
              disabled={isLoading}
              color={errors["email"] ? "danger" : "primary"}
              errorMessage={errors["email"] && "Please enter a valid email"}
              {...register("email", { required: true })}

            />
            <InputUI
              id='phone'
              classNames={{ base: cn("hover:bg-content2") }}
              type="text"
              size='lg'
              variant="bordered"
              label="Phone Number"
              placeholder='Enter your phone number'
              radius='sm'
              disabled={isLoading}
              color={errors["phone"] ? "danger" : "primary"}
              errorMessage={errors["phone"] && "Please enter a valid number"}
              {...register("phone", { required: true })}
            />
            <InputUI
              id='first_name'
              classNames={{ base: cn("hover:bg-content2") }}
              type="text"
              size='lg'
              variant="bordered"
              label="First Name"
              placeholder='Enter your first name here'
              radius='sm'
              disabled={isLoading}
              color={errors["first_name"] ? "danger" : "primary"}
              errorMessage={errors["first_name"] && "Please enter a valid text"}
              {...register("first_name", { required: true })}
            />
            <InputUI
              id='last_name'
              classNames={{ base: cn("hover:bg-content2") }}
              type="text"
              size='lg'
              variant="bordered"
              label="Last Name"
              placeholder='Enter your last name here'
              radius='sm'
              disabled={isLoading}
              color={errors["last_name"] ? "danger" : "primary"}
              errorMessage={errors["last_name"] && "Please enter a valid text"}
              {...register("last_name", { required: true })}
            />
          </motion.div>
        </ScrollShadow>
      </div>
    );
  }

  if (step === STEPS.SUMMARY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Resume shipping process"
          subtitle="Your skin always looks radiant and well-cared-for"
        />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (step === STEPS.PAYMENT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  // if (step === STEPS.DESCRIPTION) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="How would you describe your place?"
  //         subtitle="Short and sweet works best!"
  //       />
  //       <Input
  //         id="title"
  //         label="Title"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //       <hr />
  //       <Input
  //         id="description"
  //         label="Description"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //     </div>
  //   )
  // }

  // if (step === STEPS.PRICE) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Now, set your price"
  //         subtitle="How much do you charge per night?"
  //       />
  //       <Input
  //         id="price"
  //         label="Price"
  //         formatPrice
  //         type="number"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //     </div>
  //   )
  // }

  return (
    <Modal
      disabled={isLoading}
      isOpen={checkoutModal.isOpen}
      title="Checkout Details Make App"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.DELIVERY ? undefined : onBack}
      onClose={checkoutModal.onClose}
      body={bodyContent}
    />
  );
}

export default CheckoutModal;
export const CustomCheckbox = ({ value, icon, text }: { value: string, icon: React.ReactNode, text: string }) => {
  return (
    <Checkbox
      aria-label={value}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
          " hover:border-primary",
        ),
        label: "w-full text-start",
      }}
      value={value}
    >
      <div className="w-full flex text-start gap-2 items-center">
        {icon} {text}
      </div>
    </Checkbox>
  );
};
