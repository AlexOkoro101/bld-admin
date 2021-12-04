import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CustomButton } from '../utils/Button';
import { useEffect, useState } from 'react';
import { getCollections } from '../../../redux/actions/collection';
import { CollectionCard } from './CollectionCard';
import { CollectionBuyNow } from './CollectionBuyNow';
//
//
export const Collections = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.collection.collections);
  const [filteredData, setFilteredData] = useState(null);
  const [buyNow, setBuyNow] = useState(null);
  const [activeCard, setActiveCard] = useState(false);
  //
  useEffect(() => {
    let data = selectedData.filter((item) => item.vehicles.length > 0);
    setFilteredData(data);
  }, [selectedData]);
  useEffect(() => {
    dispatch(getCollections());
    fetch(`https://buylinke.herokuapp.com/bids/buy-now/bid`, {
      method: 'GET',
      headers: {},
      credentials: 'same-origin',
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        const dada = JSON.parse(res);
        if (dada) {
          setBuyNow(dada.data);
          console.log(dada.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  //
  return (
    <div className="md:pt-8 w-full h-full  p-8 md:pl-24 bg-customBg pb-24">
      <div className="flex mb-10 w-full items-center justify-start gap-4">
        <CustomButton
          onClick={() => setActiveCard(false)}
          title="BID COLLECTIONS"
          type={activeCard ? 'light' : 'primary'}
        />
        <CustomButton
          onClick={() => setActiveCard(true)}
          title="BUY NOW"
          type={activeCard ? 'primary' : 'light'}
        />
      </div>
      {activeCard === false ? (
        <CollectionCard filteredData={filteredData ? filteredData : null} />
      ) : (
        <CollectionBuyNow buyNow={buyNow} />
      )}
    </div>
  );
};
