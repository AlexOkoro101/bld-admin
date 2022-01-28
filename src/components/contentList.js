import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FsLightbox from 'fslightbox-react';
import { UpdateCollection } from './collections/UpdateCollection';
import { useRouter } from 'next/router';

const ContentList = () => {
  //
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showUpdateContent, setShowUpdateContent] = useState(false);
  const [individualCar, setindividualCar] = useState(null)
  const selectedData = useSelector(
    (state) => state.collection.collectionDetail,
  );
  //

  const handleModal = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const assignValue = (item) => {
    setindividualCar(item)
    setTimeout(() => {
      setShowUpdateContent(true)
    }, 500);
  }

  return (
    <>
      <h1 className="font-extrabold text-white rounded px-2 bg-red-500 text-lg text-center uppercase">
        {selectedData.name}
      </h1>
      {/* {showModal && (
        <ModalComponent setShowModal={setShowModal} item={modalContent} />
      )} */}
      {showUpdateContent && (
        <UpdateCollection
          setShowUpdateContent={setShowUpdateContent}
          item={modalContent}
          carDetail={individualCar}
        />
      )}
      {selectedData &&
        selectedData?.vehicles &&
        selectedData?.vehicles.map((item, id) => (
          <div
            key={id}
            className=" flex  mt-4 border bg-white  flex-col md:flex-row justify-center rounded-md w-full h-full md:h-60 md:my-4 shadow"
          >
            <div className="md:w-1/3 w-full md:p-2 h-full">
              <div className="md:h-full h-60  w-full rounded  bg-gray-400">
                <img
                  className="h-full w-full object-cover"
                  src={`https://proxybuylike.herokuapp.com/?url=${
                    item.images[0] ? item.images[0].image_largeUrl : ''
                  }`}
                  alt=""
                />
              </div>
            </div>
            <div className="md:h-full   w-full p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <div>
                  
                  <div className="my-1">
                    <span className="text-xs md:text-sm font-semibold text-letters">
                      {item.name}
                    </span>
                    <span className="text-xs md:text-sm block font-normal text-letters mt-1">
                      {
                      new Date(item.createdAt).toLocaleDateString("en-NG",
                                {
                                    year: "numeric",
                                    day: "numeric",
                                    month: "long",
                                }
                            )
                      }
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-xs md:text-sm block my-5 font-semibold"
                      style={{ color: '#328CE0' }}
                    >
                      AWAITING BID
                    </span>
                  </div>
                  <div>
                    <span className="text-xs md:text-sm block  font-semibold">
                      {item.Vehicle_location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs md:text-sm block font-semibold text-letters mr-4">
                    Authorized Bid
                  </span>
                  <span className="text-xs md:text-sm block font-semibold text-letters mr-4">
                    ${item.bidAmount || "0"}
                  </span>
                </div>
              </div>
              <div className="flex border-t-2 pt-2 items-center justify-between">
                <div>
                  <span className="text-xs block md:inline  font-semibold">
                    Transmission: {item.transmission}
                  </span>
                  <span className="text-xs block md:inline  font-semibold mt-2 md:mt-0 md:mx-3">
                    VIN No: {item.vin}
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
                    onClick={() =>
                      router.push({
                        pathname: '/admin/auctions/bid/' + item._id,
                      })
                    }
                  >
                    View Details
                  </button>
                  {selectedData.bids[id].confirmed == false && (
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
                      onClick={() => {
                        
                        assignValue(item)
                        }}
                    >
                      UPDATE
                    </button>

                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

const ModalComponent = ({ setShowModal, item }) => {
  const [toggler, setToggler] = useState(false);
  const returnLargeimage = () => {
    const largeImageArray = item?.images.map((image) => {
      return `https://proxybuylike.herokuapp.com/?url=${image.image_largeUrl}`;
    });
    return largeImageArray;
  };

  return (
    <div
      className="w-full h-full absolute z-50 top-0 right-0 left-0 flex items-center justify-center"
      style={{ backgroundColor: '#0000006f' }}
    >
      <FsLightbox toggler={toggler} type="image" sources={returnLargeimage()} />
      <div className="bg-white w-2/3 border shadow-lg rounded p-3">
        <div className="p-1 text-right">
          <span
            className="cursor-pointer text-xl text-letters font-light"
            onClick={() => setShowModal(false)}
          >
            &#10006;
          </span>
        </div>
        <div className="w-full flex justify-start gap-4 items-start">
          <div
            className="w-64 h-52 cursor-pointer  flex items-center justify-center text-white  rounded overflow-hidden"
            style={{
              backgroundImage: `url(https://proxybuylike.herokuapp.com/?url=${item.images[0].image_largeUrl})`,
              backgroundSize: 'cover',
            }}
            onClick={() => setToggler(!toggler)}
          >
            <div className="flex items-center justify-center bg-black opacity-60 h-full w-full">
              Show {item.images.length - 1} more
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-extrabold border-b pb-3 flex justify-between text-letters text-sm">
              Vehicle location:{' '}
              <span className="truncate ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {item.Vehicle_location}
              </span>
            </h3>
            <h3 className="font-extrabold flex justify-between border-b pb-3 my-2 text-letters text-sm">
              Bid Amount:{' '}
              <span className="truncate ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {item.bidAmount}
              </span>
            </h3>
            <h3 className="font-extrabold flex justify-between border-b pb-3 my-2 text-letters text-sm">
              Body Style:{' '}
              <span className="truncate ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {item.body_style}
              </span>
            </h3>
            <h3 className="font-extrabold flex justify-between border-b pb-3 my-2 text-letters text-sm">
              Exterior Colour:{' '}
              <span className="truncate ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {item.exterior_color}
              </span>
            </h3>
            <h3 className="font-extrabold flex justify-between border-b pb-3 my-2 text-letters text-sm">
              Price:{' '}
              <span className="truncate ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {item.price}
              </span>
            </h3>
            <h3 className="font-extrabold flex justify-between border-b pb-3 my-2 text-letters text-sm">
              VIN:{' '}
              <span className="truncate ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {item.vin}
              </span>
            </h3>
            <h3 className="font-extrabold flex justify-between border-b pb-3 my-2 text-letters text-sm">
              Year:{' '}
              <span className="truncate  ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {item.year}
              </span>
            </h3>
            <h3 className="font-extrabold flex justify-between border-b pb-3 my-2 text-letters text-sm">
              Make:{' '}
              <span className="truncate ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {item.make}
              </span>
            </h3>
          </div>
        </div>
        <span className="mt-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
          {item.name}
        </span>
      </div>
    </div>
  );
};

export default ContentList;
