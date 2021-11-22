import React from 'react';

const ContentList = () => {
  return (
    <div className=" flex relative mt-4  flex-col md:flex-row justify-center rounded-md w-full h-full md:h-60 md:my-3 shadow">
      <div className="md:w-1/3 w-full md:p-2 h-full">
        <div className="md:h-full h-60  w-full rounded  bg-gray-400"></div>
      </div>
      <div className="md:h-full  md:w-2/3 w-full p-2 flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <div>
              <span className="text-xs md:text-base font-semibold text-letters mr-4">
                2020
              </span>
              <span className="text-xs md:text-base font-semibold text-letters mx-3">
                Audi A3
              </span>
            </div>
            <div className="my-1">
              <span className="text-xs md:text-sm font-normal text-letters">
                Monday, June 14, 2021
              </span>
              <span className="text-xs md:text-sm font-normal text-letters mx-3">
                12:10 PM
              </span>
            </div>
            <div>
              <span
                className="text-xs md:text-base block my-5 font-semibold"
                style={{ color: '#328CE0' }}
              >
                AWAITING BID
              </span>
            </div>
            <div>
              <span className="text-xs md:text-sm block  font-semibold">
                Manheim Autos
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs md:text-base block font-semibold text-letters mr-4">
              Authorized Bid
            </span>
            <span className="text-xs md:text-base block font-semibold text-letters mr-4">
              $30,500
            </span>
          </div>
        </div>
        <div className="flex border-t-2 pt-4 items-center justify-between">
          <div>
            <span className="text-xs block md:inline md:text-sm font-semibold">
              Lane Number: 23
            </span>
            <span className="text-xs block md:inline md:text-sm font-semibold mt-2 md:mt-0 md:mx-3">
              Run Number: 237
            </span>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="
                  text-blue-700
                  border-0
                  py-2
                  px-4
                  focus:outline-none
                  hover:text-blue-900
                  rounded
                  text-xs
                  md:text-sm
                  mt-2
                "
            >
              View Details
            </button>
            <button
              className="
                  text-white
                  bg-green-500
                  border-0
                  py-2
                  px-4
                  focus:outline-none
                  hover:bg-green-600
                  rounded
                  text-xs
                  md:text-sm
                  mt-2
                "
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
