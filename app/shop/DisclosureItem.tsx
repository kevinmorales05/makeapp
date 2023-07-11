'use client'
import { Disclosure } from '@headlessui/react'
import { RiArrowRightSLine } from 'react-icons/ri'

interface DisclosureItemProps {
    label: String;
    labelPanel?: String;
    isNested?: Boolean;
    nested?: React.ReactElement;
}

export default function DisclosureItem({ label, labelPanel, nested, isNested }: DisclosureItemProps) {
    return (
        <Disclosure>
            {({ open }) => (
                <>

                    <Disclosure.Button className="flex w-full justify-between  px-2 py-2 text-left text-sm font-medium 
  text-[#5e5c5c]
    hover:text-red-dark/50
    active:bg-red-dark/10 
    
    focus:outline-none
  focus-visible:bg-red-dark/20
  hover:border-red-dark/50
    border-b-2	
  ">
                        <span>{label}</span>

                        {isNested ? <RiArrowRightSLine
                            className={`${open ? 'rotate-90 transform' : ''
                                } h-5 w-5 `}
                        />
                            : <></>}

                    </Disclosure.Button>
                    {isNested ? <Disclosure.Panel className="
      transition duration-500 ease-in
      px-4 pt-4 pb-2 text-sm text-[#666]">
                        {labelPanel}{nested}
                    </Disclosure.Panel> : <></>}

                </>
            )}
        </Disclosure>
    )
}


