'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
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
import { useLocale, useTranslations } from 'next-intl';
import useCheckoutModal from '@/app/hooks/useCheckoutModal';
import HasAccount from '@/app/carts/HasAccount';
import useLoginModal from '@/app/hooks/useLoginModal';
import { Accordion, AccordionItem, Button, ButtonGroup, Card, CardBody, Checkbox, CheckboxGroup, Chip, Link, Listbox, ListboxItem, ScrollShadow, User, cn } from '@nextui-org/react';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { FaMotorcycle } from 'react-icons/fa';
import { Input as InputUI } from "@nextui-org/react";
import { motion } from 'framer-motion'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SummaryCounter from '../inputs/SummaryCounter';

// image sample
import image11 from '@/public/mocking/banila.jpg'
import image22 from '@/public/mocking/chamos.jpg'
import image33 from '@/public/mocking/creams.jpg'
import image44 from '@/public/mocking/mizon.jpg'
import useCart, { useCartStore } from '@/app/hooks/useCart';
import { apix } from '@/app/constants/axios-instance';

enum STEPS {
  DELIVERY = 0,
  CONTACT = 1,
  SUMMARY = 2,
  PAYMENT = 3// actually don' implemented
}

enum DELIVERY_MODE {
  PICKUP = "pick_up",
  SHIP = "ship",
}

enum CONTACTS_MODE {
  contact = "contact",
}

const CheckoutModal = () => {
  const router = useRouter();
  const checkoutModal = useCheckoutModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.DELIVERY);

  const locale = useLocale();
  const t = useTranslations("categories")

  const { currentCarts } = useCartStore()
  const [deliveryMethod, setDeliveryMethod] = React.useState<string[]>([""]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      title: '',
      deliveryMethods: '',
      deliveryPickup: 'Quito, Ecuador',
      deliveryShip: {
        country: '',
        city: '',
        neighborhood: '',
        address: '',
        apartment: '',
        postal_code: '',
      },
      contact: {
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
      },
      description: '',
      somethingforlife: 1,
      // items: [{
      //   title: 'TOUCH ON BODY COTTON BODY WASH + LOTION',
      //   price: 5,
      //   count: 1,
      // }],
      items: currentCarts
    }
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const items = watch('items');
  const imageSrc = watch('imageSrc');
  const currentDeliveryMethod = watch().deliveryMethods;
  // console.log('everything', watch())




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

    console.log("all data to checkout", data)

    apix(locale).post('checkouts', data)
      .then(() => {
        toast.success('checkout created!');
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

  const handlerDeliveryMethod = (e: any) => {
    if (e.length !== 0) {
      const getLastCheckBox: string = e[e.length - 1];
      setDeliveryMethod([getLastCheckBox])

      // put value to react-hook-form
      if (DELIVERY_MODE.PICKUP === getLastCheckBox) {
        setValue(`deliveryMethods`, "PICKUP");
        // clear supposed errors
        clearErrors('deliveryShip');

      }
      if (DELIVERY_MODE.SHIP === getLastCheckBox) {
        setValue(`deliveryMethods`, 'SHIP')
      }
    }
  }

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
          <CustomCheckbox register={register} value={DELIVERY_MODE.SHIP} text="Ship" icon={<FaMotorcycle />} />
          <CustomCheckbox register={register} value={DELIVERY_MODE.PICKUP} text="Pick Up" icon={<MdOutlineLocalShipping />}
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
              id={`country`}
              size='lg'
              type="text"
              variant="bordered"
              classNames={{ base: cn("hover:bg-content2") }}
              label="Country/Region"
              placeholder='Enter your country name or region'
              radius='sm'
              disabled={isLoading}
              color={errors.deliveryShip && 'country' in errors.deliveryShip ? "danger" : 'primary'}
              errorMessage={errors.deliveryShip && 'country' in errors.deliveryShip && "Please enter a valid country name"}

              {...register(`deliveryShip.country`, { required: true })}
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
              color={errors.deliveryShip && 'city' in errors.deliveryShip ? "danger" : 'primary'}
              errorMessage={errors.deliveryShip && 'city' in errors.deliveryShip && "Please enter a valid country name"}

              {...register("deliveryShip.city", { required: true })}
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
              color={errors.deliveryShip && 'neighborhood' in errors.deliveryShip ? "danger" : 'primary'}
              errorMessage={errors.deliveryShip && 'neighborhood' in errors.deliveryShip && "Please enter a valid country name"}

              {...register("deliveryShip.neighborhood", { required: true })}
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
              color={errors.deliveryShip && 'address' in errors.deliveryShip ? "danger" : 'primary'}
              errorMessage={errors.deliveryShip && 'address' in errors.deliveryShip && "Please enter a valid country name"}

              {...register("deliveryShip.address", { required: true })}
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
              color={errors.deliveryShip && 'apartment' in errors.deliveryShip ? "danger" : 'primary'}
              errorMessage={errors.deliveryShip && 'apartment' in errors.deliveryShip && "Please enter a valid country name"}

              {...register("deliveryShip.apartment", { required: false })}
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
              color={errors.deliveryShip && 'postal_code' in errors.deliveryShip ? "danger" : 'primary'}
              errorMessage={errors.deliveryShip && 'postal_code' in errors.deliveryShip && "Please enter a valid country name"}

              {...register("deliveryShip.postal_code", { required: false })}
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
              id='deliveryPickup'
              classNames={{ base: cn("hover:bg-content2 hover:border-primary border-2 border-transparent rounded-lg") }}
              isReadOnly
              type="email"
              size='lg'
              variant="bordered"
              label="N954 Av. Padre Luis Vaccari y Galo Plaza Lasso"
              placeholder='Quito, Ecuador'
              defaultValue="Quito, Ecuador"
              radius='sm'
              disabled={isLoading}
              {...register("deliveryPickup", { required: false, value: 'Quito, Ecuador' })}

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
              color={errors.contact && 'email' in errors.contact ? "danger" : 'primary'}
              errorMessage={errors.contact && 'email' in errors.contact && "Please enter a valid country name"}

              {...register("contact.email", { required: true })}
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
              color={errors.contact && 'phone' in errors.contact ? "danger" : 'primary'}
              errorMessage={errors.contact && 'phone' in errors.contact && "Please enter a valid country name"}

              {...register("contact.phone", { required: true })}
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
              color={errors.contact && 'first_name' in errors.contact ? "danger" : 'primary'}
              errorMessage={errors.contact && 'first_name' in errors.contact && "Please enter a valid country name"}

              {...register("contact.first_name", { required: true })}
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
              color={errors.contact && 'last_name' in errors.contact ? "danger" : 'primary'}
              errorMessage={errors.contact && 'last_name' in errors.contact && "Please enter a valid country name"}

              {...register("contact.last_name", { required: true })}
            />
          </motion.div>
        </ScrollShadow>
      </div>
    );
  }

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  if (step === STEPS.SUMMARY) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <Heading
          title="Resume your shipping process"
          subtitle="Your skin always looks radiant and well-cared-for"
        />
        <Accordion
          showDivider={true}
          className="p-2 w-full -w-[300px]"
          variant="shadow"
          itemClasses={itemClasses}
        >
          <AccordionItem
            key="order_summary"
            aria-label="order_summary"
            startContent={<AiOutlineShoppingCart className="text-primary text-xl" />}
            classNames={{ title: 'text-primary ml-1' }}
            title="Show order summary"
            className='flex flex-col gap-4'
          >
            <motion.div
              key="order_summary_container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .15 }}
              className='flex flex-col gap-4'
            >
              <SummaryCounter
                src={image11.src}
                onChange={(value) => setCustomValue('items.0.count', value)}
                value={items[0].count}
                title="TOUCH ON BODY COTTON BODY WASH + LOTION"
                total={items[0].count * items[0].price}
              />
              <SummaryCounter
                src={image22.src}
                onChange={(value) => setCustomValue('items.0.count', value)}
                value={items[0].count}
                title="URBAN DELIGHT BODY SHOWER GEL"
                total={items[0].count * items[0].price}
              />
              <SummaryCounter
                src={image33.src}
                onChange={(value) => setCustomValue('items.0.count', value)}
                value={items[0].count}
                title="URBAN ECO HARAKEKE TONER"
                total={items[0].count * items[0].price}
              />
              <SummaryCounter
                src={image44.src}
                onChange={(value) => setCustomValue('items.0.count', value)}
                value={items[0].count}
                title="TOUCH ON BODY  WASH + LOTION"
                total={items[0].count * items[0].price}
              />

            </motion.div>
          </AccordionItem>
        </Accordion>
        <Card>
          <CardBody>
            <div className='flex justify-between'>
              <p className='font-bold'>Contact</p>
              <span className='underline cursor-pointer'>Change</span>
            </div>
            <p>{Object.values(watch('contact')).join(', ')}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className='flex justify-between'>
              <p className='font-bold'>Shipping method</p>
              <span className='underline cursor-pointer'>Change</span>
            </div>
            <div>
              {currentDeliveryMethod}
              <p>{deliveryMethod[0] === DELIVERY_MODE.PICKUP && watch('deliveryPickup')}</p>
              <p>{deliveryMethod[0] === DELIVERY_MODE.SHIP && Object.values(watch('deliveryShip')).join(', ')}</p>

            </div>
          </CardBody>
        </Card>
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
export const CustomCheckbox = ({ value, icon, text, register }: { value: string, icon: React.ReactNode, text: string, register: UseFormRegister<FieldValues>, }) => {
  return (
    <Checkbox
      id={value}
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
      {...register(`deliveryMethods`, { required: true, })}
    >
      <div className="w-full flex text-start gap-2 items-center">
        {icon} {text}
      </div>
    </Checkbox>
  );
};

export const MonitorMobileIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M10 16.95H6.21C2.84 16.95 2 16.11 2 12.74V6.74003C2 3.37003 2.84 2.53003 6.21 2.53003H16.74C20.11 2.53003 20.95 3.37003 20.95 6.74003"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M10 21.4699V16.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M2 12.95H10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M6.73999 21.47H9.99999"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M22 12.8V18.51C22 20.88 21.41 21.47 19.04 21.47H15.49C13.12 21.47 12.53 20.88 12.53 18.51V12.8C12.53 10.43 13.12 9.83997 15.49 9.83997H19.04C21.41 9.83997 22 10.43 22 12.8Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M17.2445 18.25H17.2535"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
