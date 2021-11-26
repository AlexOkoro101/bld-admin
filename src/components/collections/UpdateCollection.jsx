import React, { useRef, useEffect } from 'react';

export const UpdateCollection = ({ setShowUpdateContent }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setShowUpdateContent(false));
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }
  return (
    <div
      className="p-12 absolute top-0 right-0 bottom-0 left-0  z-50 flex w-full h-full items-center justify-center"
      style={{ background: 'rgba(31, 42, 83, 0.75)' }}
    >
      <div
        ref={ref}
        className="border-2 w-96 bg-white text-center rounded p-12"
      >
        <h3 className="text-sm text-gray-700 my-3">
          Update the status of this bid
        </h3>
        <div className="rounded-md text-sm flex items-center w-full  border-gray-400  border p-2 ">
          <input className="mr-3" type="checkbox" />
          Bid won
        </div>
        <div className="rounded-md text-sm flex items-center w-full border-gray-400  border p-2  my-3">
          <input className="mr-3" type="checkbox" />
          Bid lost
        </div>
        <div className="rounded-md text-sm flex items-center w-full border-gray-400  border p-2  mt-3 mb-1">
          <input className="mr-3" type="checkbox" />
          No sale
        </div>
        <div className="text-left w-full">
          <label className="text-xs">Enter final price</label>
          <input
            className="rounded-md w-full text-sm block border-gray-400  border p-2 "
            type="text"
          />
        </div>
        <button className="bg-green-500 rounded p-2 mt-4 px-8 text-white">
          Update
        </button>
      </div>
    </div>
  );
};
