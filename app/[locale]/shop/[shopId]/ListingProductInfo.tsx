'use client';

import { Button, Chip, Tab, Tabs, Textarea, User, cn } from "@nextui-org/react";
import { TbFileDescription, TbListDetails } from "react-icons/tb";
import { MdOutlineReviews } from "react-icons/md";
import { useState } from "react";
import { AnimationTab } from "./AnimationTab";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { toast } from "sonner";


interface RequestData {
  description: string;
}


export interface IListingInfoProps {
  description: string;
}

export const ListingProductInfo: React.FC<IListingInfoProps> = ({
  description,
}) => {
  const [selected, setSelected] = useState("login");
  const [hasReviews, setHasReviews] = useState(true);
  const [hasReviewUser, setHasReviewUser] = useState(true);
  const [hoverStarts, setHoverStarts] = useState(0);
  const [starsSelected, setStarsSelected] = useState(0);

  const class_tab_btn = "flex items-center space-x-2"

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form) as unknown as Iterable<
      [RequestData, FormDataEntryValue]
    >;
    const requestData: RequestData = Object.fromEntries(formData);
    if (!requestData.description) {
      toast.error(`Please provide a description`);
      return
    }
    if (starsSelected === 0) {
      toast.error(`Please provide a rate`);
      return
    }
    toast(`${starsSelected} stars in description ${description}`);
  }

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Category</div>
          {/* <Avatar src={user?.image} /> */}
        </div>
        <hr />
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            category description
          </div>
        </div>
      </div>
      <hr />

      <div className="flex justify-center">
        <div className="flex w-full flex-col">
          {/* TABS */}
          <Tabs
            aria-label="Options"
            color="danger"
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-danger"
            }}
          >
            <Tab
              key="description_tab"
              title={<div className={class_tab_btn}>
                <TbFileDescription style={{ width: 24, height: 24 }} />
                <span>Description</span>
                <Chip size="sm" variant="faded">1</Chip>
              </div>}

            >
              <AnimationTab key={"description_tab_content"} id={"description_tab_content"} ><>{description}</></AnimationTab>
            </Tab>

            <Tab
              aria-disabled
              key="ingredients_tab"
              title={<div className={class_tab_btn}>
                <TbListDetails style={{ width: 24, height: 24 }} />
                <span>Ingredients</span>
                <Chip size="sm" variant="faded">1</Chip>
              </div>}
            >
              <AnimationTab key={"ingredients_tab_content"} id={"ingredients_tab_content"} className="py-4 !justify-start"><>No ingredients</></AnimationTab>
            </Tab>

            <Tab
              key="review_tab"
              title={<div className={class_tab_btn}>
                <MdOutlineReviews style={{ width: 24, height: 24 }} />
                <span>Reviews</span>
                <Chip size="sm" variant="faded">0</Chip>
              </div>}
            >
              <AnimationTab key={"review_tab_content"} id={"review_tab_content"}>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-4">
                  <section className={cn("flex justify-start items-start flex-col gap-6", false && "justify-center items-center")}>
                    {hasReviews ?
                      <>
                        <div>
                          <User
                            as="button"
                            avatarProps={{
                              isBordered: true,
                              src: false || '/img/placeholder.jpg'
                            }}
                            name={"Christian Soledispa"}
                            description={"chris@gmail.com"}
                            className="transition-transform"
                            classNames={{
                              name: "max-w-full",
                              description: "max-w-full ",
                            }}
                          />
                          <div className="flex flex-row items-center space-x-1 ">
                            <AiTwotoneStar className="text-yellow-400" />
                            <AiTwotoneStar className="text-yellow-400" />
                            <AiTwotoneStar className="text-yellow-400" />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <span className="text-small font-medium">recomended</span>
                          </div>
                          <div className="flex flex-col ">
                            <p className="text-tiny">Reviewed in Japan on July 2, 2023</p>
                            <p className="font-normal">Great quality and fast shipping.</p>
                          </div>
                        </div>
                        <div>
                          <User
                            as="button"
                            avatarProps={{
                              isBordered: true,
                              src: false || '/img/placeholder.jpg'
                            }}
                            name={"Christian Soledispa"}
                            description={"chris@gmail.com"}
                            className="transition-transform"
                            classNames={{
                              name: "max-w-full",
                              description: "max-w-full ",
                            }}
                          />
                          <div className="flex flex-row items-center space-x-1 ">
                            <AiTwotoneStar className="text-yellow-400" />
                            <AiTwotoneStar className="text-yellow-400" />
                            <AiTwotoneStar className="text-yellow-400" />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <span className="text-small font-medium">recomended</span>
                          </div>
                          <div className="flex flex-col ">
                            <p className="text-tiny">Reviewed in Japan on July 2, 2023</p>
                            <p className="font-normal">Great quality and fast shipping.</p>
                          </div>
                        </div>
                      </> : <>
                        <p className="font-bold py-4 sm:py-0">No reviews yet.</p>
                      </>}
                  </section>

                  <section className="block sm:flex justify-center items-center">

                    <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
                      {hasReviewUser && <h3 className="font-bold">Edit your review</h3>}
                      <div>
                        <label className="text-small font-medium pb-2">Rate</label>
                        <div className="flex flex-row items-center space-x-1 " onMouseLeave={() => {
                          if (starsSelected !== 0) {
                            setHoverStarts(starsSelected)
                          } else {
                            setHoverStarts(0)
                          }
                        }}>
                          {Array.from([1, 2, 3, 4, 5]).map(index => (
                            <div onMouseEnter={() => setHoverStarts(index)} key={index} onClick={() => setStarsSelected(index)}>
                              {index <= hoverStarts ? <AiTwotoneStar className="text-yellow-400" /> : <AiOutlineStar />}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Textarea
                        name="description"
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Enter a description"
                        className="max-w-xs"
                      />
                      <div className="flex gap-2 justify-start">
                        <Button color="primary" type="submit">
                          Add
                        </Button>
                      </div>
                    </form>

                  </section>
                </div>
              </AnimationTab>
            </Tab>
          </Tabs>
        </div>
      </div>
      <hr />
    </div>
  );
};
