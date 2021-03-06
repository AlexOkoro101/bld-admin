import React from 'react';
import { CustomButton } from '../utils/Button';
import { useRouter } from 'next/router';
import { getCollectionDetail } from '../../../redux/actions/collection';
import { useDispatch } from 'react-redux';

export const CollectionCard = ({ filteredData }) => {

  //
  const router = useRouter();
  const dispatch = useDispatch();
  //
  function displaySmall(itemData) {
    let data = itemData.vehicles.slice(0, 5);
    let length = itemData.vehicles.length;
    return (
      <div className="mt-4  flex justify-start w-full overflow-hidden gap-4 flex-nowrap">
        {data.map((item, id) => (
          <div
            key={id}
            onClick={() =>
              router.push(
                { pathname: '/admin/auctions/' + itemData.name },
                dispatch(getCollectionDetail(itemData)),
              )
            }
            className="w-56 cursor-pointer  h-40 bg-black rounded overflow-hidden"
          >
            <img
              className="h-full w-56 object-cover"
              src={`https://proxybuylike.herokuapp.com/?url=${
                item.images[0] ? item.images[0].image_largeUrl : ''
              }`}
              alt=""
            />
          </div>
        ))}
        {length > 5 ? (
          <div
            onClick={() =>
              router.push(
                { pathname: '/admin/auctions/' + itemData.name },
                dispatch(getCollectionDetail(itemData)),
              )
            }
            className="w-56 cursor-pointer h-40 flex items-center justify-center text-white  rounded overflow-hidden"
            style={{
              backgroundImage: `url(https://proxybuylike.herokuapp.com/?url=${itemData.vehicles[5].images[0].image_largeUrl})`,
              backgroundSize: 'cover',
            }}
          >
            <div className="flex items-center justify-center bg-black opacity-60 h-full w-full">
              {length - 5} more
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }

  return (
    <>
      {filteredData !== null &&
        filteredData?.map((ele, id) => (
          <div key={id} className="bg-white border p-4 rounded my-3">
            <div className="flex justify-between">
            <div>
              <p className="text-base font-medium text-[#0D101B]">{ele.name}</p>
              <p className="text-letters text-xs">
                {`${ele.vehicles.length} car${
                  ele.vehicles.length > 1 ? 's' : ''
                } selected`}
              </p>

            </div>
              {/* <CustomButton
                title={ele.name}
                onClick={() =>
                  router.push(
                    { pathname: '/admin/auctions/' + ele.name },
                    dispatch(getCollectionDetail(ele)),
                  )
                }
              /> */}
              <div>
                {/* <h3 className="text-letters uppercase">
                  {`${ele.owner.info[0]?.firstName || ''} 
                    ${ele.owner.info[0]?.lastName || ''}`}
                </h3> */}
                <div>
                  <p className="text-[#0D101B] text-base font-medium">$15,000 - $30,500</p>
                  <p className="text-letters text-xs">$1,000 deposit paid</p>
                  {/* <p className=" text-xs mt-2">
                  {new Date(ele.createdAt).toLocaleDateString("en-NG",
                      {
                          year: "numeric",
                          day: "numeric",
                          month: "long",
                      }
                  )}</p> */}

                </div>
              </div>

              </div>
            {displaySmall(ele)}
          </div>
        ))}
    </>
  );
};
