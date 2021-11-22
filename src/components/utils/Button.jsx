import React from 'react';

export const CustomButton = ({ type, title }) => {
  function getButtonStyles(type, title) {
    if (type == 'primary') {
      return (
        <button className="bg-customRed text-xs md:text-sm px-3 rounded py-1 hover:bg-red-500 text-white">
          {title ? title : 'pass title prop'}
        </button>
      );
    } else if (type == 'light') {
      return (
        <button className=" text-xs md:text-sm px-3 rounded py-1 hover:bg-customRed hover:text-white text-black">
          {title ? title : 'pass title prop'}
        </button>
      );
    } else {
      return (
        <button className="bg-customRed text-xs md:text-sm px-3 rounded py-1 hover:bg-red-500 text-white">
          {title ? title : 'pass title prop'}
        </button>
      );
    }
  }
  return getButtonStyles(type, title);
};
