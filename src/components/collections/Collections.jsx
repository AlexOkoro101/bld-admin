import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CustomButton } from '../utils/Button';
import { useEffect, useState } from 'react';
import { getCollections } from '../../../redux/actions/collection';
import { CollectionCard } from './CollectionCard';
//
//
export const Collections = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.collection.collections);
  const [filteredData, setFilteredData] = useState(null);
  //
  useEffect(() => {
    let data = selectedData.filter((item) => item.vehicles.length > 0);
    setFilteredData(data);
  }, [selectedData]);
  useEffect(() => {
    dispatch(getCollections());
  }, []);
  //
  return (
    <div className="md:pt-8 w-full h-full  p-8 md:pl-24 bg-customBg overflow-auto pb-24">
      <div className="flex mb-10 w-full items-center justify-start gap-4">
        <CustomButton title="BID COLLECTIONS" />
        <CustomButton title="BUY NOW" type="light" />
      </div>
      <CollectionCard filteredData={filteredData ? filteredData : null} />
    </div>
  );
};
