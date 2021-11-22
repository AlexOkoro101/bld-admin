import React from 'react';

export const CollectionCard = ({ filteredData }) => {
  //
  function displaySmall(item) {
    let data = item.vehicles.slice(0, 5);
    let length = item.vehicles.length;
    return (
      <div className="mt-4 flex justify-start w-full overflow-hidden gap-4 flex-nowrap">
        {data.map((item, id) => (
          <div key={id} className="w-56  h-40 bg-black rounded overflow-hidden">
            <img
              className="h-full w-56 object-cover"
              src={item.images[0] ? item.images[0].image_largeUrl : ''}
            />
          </div>
        ))}
        {length > 5 ? (
          <div
            className="w-56  h-40 flex items-center justify-center text-white  rounded overflow-hidden"
            style={{
              backgroundImage: `url(${item.vehicles[5].images[0].image_largeUrl})`,
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
        filteredData.map((ele, id) => (
          <div key={id} className="bg-white border p-4 rounded my-3">
            <div className="flex justify-between items-center">
              <h3 className="text-letters">{ele.name}</h3>
              <h3 className="text-letters">$15,000 - $30,500</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-letters text-xs">
                {`${ele.vehicles.length} car${
                  ele.vehicles.length > 1 ? 's' : ''
                } selected`}
              </p>
              <p className="text-letters text-xs">$10000 deposit paid</p>
            </div>
            {displaySmall(ele)}
          </div>
        ))}
    </>
  );
};