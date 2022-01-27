import { useRouter } from 'next/router';
import React from 'react';

export const CollectionBuyNow = ({ buyNow }) => {
  const router = useRouter()
  const dollarFormatter = new Intl.NumberFormat();
  const addImage = (params) => {
    if (
      params?.images &&
      params?.images.length > 0 &&
      params?.images[0].image_smallUrl
    ) {
      return (
        <div
          style={{
            width: '100%',
            height: '203px',
          }}
          className=" bg-opacity-20  cursor-pointer rounded-md"
        >
          {params?.images[0] ? (
            <div
              onClick={() => router.push(`/admin/auctions/buy-now/${params?._id}`)}
              className="cursor-pointer relative block"
              style={{
                width: '100%',
                height: '203px',
              }}
            >
              <img
                src={`https://proxybuylike.herokuapp.com/?url=${params?.images[0].image_largeUrl}`}
                alt="hello"
                className="w-full object-cover h-full rounded-md object-center"
              />
              {/* <div className="watermark opacity-50 ">
                            <p>BUYLIKEDEALERS.COM</p>
                        </div> */}
            </div>
          ) : (
            <div
              onClick={() => router.push(`/admin/auctions/buy-now/${params?._id}`)}
              className="cursor-pointer  "
              style={{
                width: '100%',
                height: '203px',
              }}
            >
              <div
                onClick={() => {
                  console.log("ya")
                  router.push(`/admin/auctions/buy-now/${params?._id}`)}}
                style={{
                  backgroundImage: `url(/img/Rectangle.png)`,
                }}
                className="w-full cursor-pointer font-semibold text-black object-cover bg-no-repeat	flex justify-center items-center h-full rounded-md object-center"
              >
                IMAGE COMING SOON
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          style={{
            width: '100%',
            height: '203px',
          }}
          className=" bg-opacity-20 rounded-md"
        >
          <div
            style={{
              backgroundImage: `url(/img/Rectangle.png)`,
            }}
            className="w-full font-semibold text-white object-cover bg-no-repeat	flex justify-center items-center h-full rounded-md object-center"
          >
            IMAGE COMING SOON
          </div>
        </div>
      );
    }
  };
  return (
    <div
      className={
        'flex box-border flex-wrap justify-center w-full lg:justify-between display-type gap-1 '
      }
      id="car-grid"
    >
      {buyNow?.length > 0 &&
        buyNow?.map(
          (ele, id) =>
            ele && (
              <div
                onClick={() => router.push(`/admin/auctions/buy-now/${ele.vehicle._id}`)}
                key={id}
                className={
                  open == true
                    ? ' car-display-holder flex flex-col justify-between box-border cursor-pointer  p-4 mb-5'
                    : ' car-display-holder flex flex-col justify-between box-border cursor-pointer p-4 mb-5'
                }
                style={{
                  height: 'auto',
                  width: '24%',
                }}
              >
                {addImage(ele.vehicle)}

                <div className="mt-3">
                  {/* Vehicle Name here */}
                  <p className=" text-xs  tertiary-black font-medium">
                    {ele.vehicle?.make && ele.vehicle?.model
                      ? [ele.vehicle?.make, ele.vehicle.model].join(' ')
                      : ele.vehicle?.vehicleName}
                  </p>

                  {/* Vehicle Location here */}
                  <div className="pt-1.5">
                    <div className="text-sm flex items-center sec-black font-normal">
                     
                      <p className="">
                        {/* {ele.vehicle?.facilitationLocation.replace(
                          'Manheim',
                          '',
                        )} */}
                        {ele.vehicle?.name}
                      </p>
                    </div>
                  </div>
                    <div className="ml-auto mt-2 flex self-center">
                     
                      <p className=" text-xs sec-black font-10 font-normal">
                        {' '}
                        ${dollarFormatter.format(ele?.bidAmount)}
                        {/* {new Date(ele.vehicle?.createdAt).toLocaleDateString(
                          'en-NG',
                          {
                            year: 'numeric',
                            day: 'numeric',
                            month: 'long',
                          },
                        )} */}
                      </p>
                    </div>

                  {/* Vehicle Year here */}
                  <p className=" text-xs sec-black font-11 flex justify-between w-full flex-col pt-1.5 ">
                    {ele?.owner?.email}
                    <span className="">
                      {ele?.owner?.profile?.phoneNumber}{' '}
                    </span>
                  </p>

                  <p className=" text-xs sec-black flex justify-end mt-2 font-semibold">
                      {new Date(ele?.createdAt).toLocaleDateString(
                          'en-NG',
                          {
                            year: 'numeric',
                            day: 'numeric',
                            month: 'long',
                          },
                        )}
                  </p>

                  {/* Vehicle Price */}
                  <div className="flex pt-3">
                    {/* <div className="flex justify-end w-full">
                      {Object.entries(ele.vehicle.buyNowPrice).length > 2 &&
                      active !== 'bid' ? (
                        <div className="flex w-full justify-between items-center">
                          <p className=" text-xs sec-black text-base font-normal">
                            ${dollarFormatter.format(ele.vehicle.buyNowPrice)}
                          </p>
                          <a href={`/vin/${ele.vehicle.VIN}`}>
                            <div className="focus:outline-none cursor-pointer text-white primary-btn py-1.5 font-10 fonr-semibold px-5">
                              Buy Now
                            </div>
                          </a>
                        </div>
                      ) : (
                        <div className="flex cursor-pointer w-full justify-between items-center">
                          <p className=" text-xs sec-black text-base  font-normal">
                            ${dollarFormatter.format(ele.vehicle.mmrPrice)}
                          </p>
                          <a href={`/vin/${ele.vehicle.VIN}`}>
                            <div className="focus:outline-none text-white bg-blue-700 rounded py-1.5 font-10 fonr-semibold px-5">
                              Place Bid
                            </div>
                          </a>
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            ),
        )}
    </div>
  );
};
