import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'

type Props = {
  categoryByName: { category: string },
  id: string,
  values:  string[],

}

const SideAccordion = (props: Props) => {

const {categoryByName, id, values} = props

  return (
    <Accordion selectionMode="multiple" defaultExpandedKeys={[categoryByName.category]} >
      {allCategories.map((i) => (
        <AccordionItem key={i.category} aria-label={i.category} title={t(`${i.category}.label`)}>
          <ul>
            {i.values.map((item: string, index: number) => (
              <li key={item} className='py-2 px-8'>
                <Link href={`${locale}/shop?category=${i.category}&subCategory=${item}`} color="foreground" className={cn(`hover:text-red-dark/50`,
                  categoryByName.subCategory === item ? "text-red-dark/50" : ""
                )}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </Accordion>)
}

export default SideAccordion