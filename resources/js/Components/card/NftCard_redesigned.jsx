import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "@/Components/card";

const NftCard = ({ title, author, share, image, bidders, extra }) => {
  const [heart, setHeart] = useState(true);
  return (
    <Card
      extra={`flex flex-col w-full h-full bg-white p-0`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={() => setHeart(!heart)}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg px-2 font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className="mt-1 text-sm px-2 font-medium text-gray-600 md:mt-2">
              By {author}{" "}
            </p>
          </div>

          <div className="flex flex-row-reverse px-2 md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))}
          </div>
        </div>

        <div className="px-2 pb-2 flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="text-sm font-bold text-brand-500 dark:text-white">
              {share}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
