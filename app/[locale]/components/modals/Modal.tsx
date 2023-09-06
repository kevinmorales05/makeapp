'use client';

import { useCallback, useEffect, useState } from "react";
// import { IoMdClose } from "react-icons/io";

import Button from "../buttons/Button";
import { ModalBody, ModalContent, ModalFooter, ModalHeader, Modal as ModalUI, useDisclosure, } from "@nextui-org/react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) return null;

  return (
    <ModalUI backdrop="opaque" isOpen={showModal} onClose={handleClose} motionProps={{
      variants: {
        enter: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
          translateY: 0,
        },
        exit: {
          y: -20,
          opacity: 0,
          translateY: 150,
          transition: {
            duration: 0.2,
            ease: "easeIn",
          },
        },
      }
    }}
      classNames={{wrapper: "items-center"}}
    >
      <ModalContent className="
          w-full
          md:max-w-4/6
          lg:max-w-3/6
          xl:max-w-2/5
          kyo
      ">
        {(onClose) => (
          <>

            <ModalHeader>
              <div className="
                flex 
                flex-col
                w-full
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <div className={`text-lg font-semibold font-merienda`}>
                  {title}
                </div>
              </div></ModalHeader>
            <ModalBody className="relative p-6 flex-auto">
              {body}
            </ModalBody>
            <ModalFooter className="grid  grid-cols-1 py-8 gap-3">
              <div
                className="
                  grid grid-cols-1
                  w-full
                  gap-2
                  "
              >
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    outline
                  />
                )}
                {footer}
              </div></ModalFooter>
          </>
        )}
      </ModalContent>

    </ModalUI>
  );
}

export default Modal;



// {/* <Transition show={showModal} as={Fragment}>
// <Dialog
//   as="div"
//   className="relative z-10"
//   onClose={handleClose}
// >
//   <div
//     className="
//     justify-center 
//     items-center 
//     flex 
//     overflow-x-hidden 
//     overflow-y-auto 
//     fixed 
//     inset-0 
//     z-50 
//     outline-none 
//     focus:outline-none
//     bg-neutral-800/70
//   "
//   >
//     <div className="
//     relative 
//     w-full
//     md:w-4/6
//     lg:w-3/6
//     xl:w-2/5
//     my-1
//     pt-6
//     mx-auto 
//     h-full 
//     lg:h-auto
//     md:h-auto
//     "
//     >
//       {/*content*/}
//       <Transition.Child
//         enter="translate duration-500 h-full"
//         enterFrom="translate-y-full opacity-0"
//         enterTo="translate-y-0 opacity-100"
//         leave="transform duration-300 "
//         leaveFrom="translate-y-0 opacity-100"
//         leaveTo="translate-y-full opacity-0"

//       >
//         <Dialog.Panel>
//           <div className="
//         translate
//         h-full
//         lg:h-auto
//         md:h-auto
//         border-0 
//         rounded-lg 
//         shadow-lg 
//         relative 
//         flex 
//         flex-col 
//         w-full 
//         bg-white 
//         outline-none 
//         focus:outline-none
//       "
//           >
//             {/*header*/}
//             <div className="
//           flex 
//           items-center 
//           p-6
//           rounded-t
//           justify-center
//           relative
//           border-b-[1px]
//           "
//             >
//               <button
//                 className="
//               p-1
//               border-0 
//               hover:opacity-70
//               transition
//               absolute
//               left-9
//             "
//                 onClick={handleClose}
//               >
//                 <IoMdClose size={18} />
//               </button>
//               <Transition.Child
//                 enter="transform transition duration-1000 h-full"
//                 enterFrom="translate-y-full"
//                 enterTo="translate-y-0"
//                 leave="transform duration-1000 transition ease-in-out"
//                 leaveFrom="translate-y-0"
//                 leaveTo="scale-95 translate-y-full"

//               >
//                 <div className={`text-lg font-semibold`}>
//                   {title}
//                 </div>
//               </Transition.Child>
//             </div>
//             {/*body*/}
//             <div className="relative p-6 flex-auto">
//               {body}
//             </div>
//             {/*footer*/}
//             <div className="flex flex-col gap-2 p-6 ">
//               <div
//                 className="
//               flex 
//               flex-row 
//               items-center 
//               gap-4 
//               w-full
//             "
//               >
//                 {secondaryAction && secondaryActionLabel && (
//                   <Button
//                     disabled={disabled}
//                     label={secondaryActionLabel}
//                     onClick={handleSecondaryAction}
//                     outline
//                   />
//                 )}
//                 <Button
//                   disabled={disabled}
//                   label={actionLabel}
//                   onClick={handleSubmit}
//                 />
//               </div>
//               {footer}
//             </div>
//           </div>
//         </Dialog.Panel>
//       </Transition.Child>
//     </div>
//   </div>
// </Dialog>
// </Transition> */}