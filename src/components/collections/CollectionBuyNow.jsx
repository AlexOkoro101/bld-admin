import React from 'react';

export const CollectionBuyNow = ({ buyNow }) => {
  const dollarFormatter = new Intl.NumberFormat();
  const addImage = (params) => {
    if (
      params.images &&
      params.images.length > 0 &&
      params.images[0].image_smallUrl
    ) {
      return (
        <div
          style={{
            width: '100%',
            height: '203px',
          }}
          className=" bg-opacity-20  cursor-pointer rounded-md"
        >
          {params.images[0] ? (
            <a
              className="cursor-pointer relative block"
              href={`/vin/${params.VIN}`}
              style={{
                width: '100%',
                height: '203px',
              }}
            >
              <img
                src={`https://proxybuylike.herokuapp.com/?url=${params.images[0].image_largeUrl}`}
                alt="hello"
                className="w-full object-cover h-full rounded-md object-center"
              />
              {/* <div className="watermark opacity-50 ">
                            <p>BUYLIKEDEALERS.COM</p>
                        </div> */}
            </a>
          ) : (
            <a
              className="cursor-pointer  "
              href={`/vin/${params.VIN}`}
              style={{
                width: '100%',
                height: '203px',
              }}
            >
              <div
                style={{
                  backgroundImage: `url(/img/Rectangle.png)`,
                }}
                className="w-full font-semibold text-white object-cover bg-no-repeat	flex justify-center items-center h-full rounded-md object-center"
              >
                IMAGE COMING SOON
              </div>
            </a>
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
                key={id}
                className={
                  open == true
                    ? ' car-display-holder flex flex-col justify-between box-border   p-4 mb-5'
                    : ' car-display-holder flex flex-col justify-between box-border  p-4 mb-5'
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
                  <div className="flex justify-between pt-1.5">
                    <p className=" w-32 overflow-hidden   text-xs flex items-center sec-black font-10 font-normal car-location">
                      {' '}
                      <span className="mr-1">
                        <img
                          src="../../assets/img/vectors/red-location-beacon.svg"
                          alt="location"
                          className="w-4 h-4"
                        />
                      </span>{' '}
                      <p className="truncate">
                        {ele.vehicle?.facilitationLocation.replace(
                          'Manheim',
                          '',
                        )}
                      </p>
                    </p>
                    <div className="ml-auto mt-2 flex self-center">
                      <img
                        src="../../assets/img/vectors/red-date.svg"
                        alt="date"
                      />
                      <p className=" text-xs sec-black font-10 ml-1 font-normal">
                        {' '}
                        {new Date(ele.vehicle?.createdAt).toLocaleDateString(
                          'en-NG',
                          {
                            year: 'numeric',
                            day: 'numeric',
                            month: 'long',
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Vehicle Year here */}
                  <p className=" text-xs sec-black font-11 flex justify-between w-full  items-center pt-1.5 ">
                    {ele.vehicle?.year}
                    <span className="">
                      {ele.vehicle?.price
                        ? dollarFormatter.format(ele.vehicle?.price)
                        : '0'}{' '}
                      miles
                    </span>
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
