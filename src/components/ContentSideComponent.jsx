import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TimeTrail from './TimeTrail';

import { useSelector } from 'react-redux';
import FsLightbox from 'fslightbox-react';
import { UpdateCollection } from './collections/UpdateCollection';
import { useRouter } from 'next/router';

const ContentSideComponent = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showUpdateContent, setShowUpdateContent] = useState(false);
  const [individualCar, setindividualCar] = useState(null)
  const selectedData = useSelector(
    (state) => state.collection.collectionDetail,
  );
  console.log(selectedData)
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

  const today = new Date()
  var hours = today.getHours();
  var ampm = hours >= 12 ? 'PM' : 'AM';


  return (
    <Tabs>
      <TabList className="transition-all delay-700 ease-in-out border-b-2">
        <Tab className="transition-all text-xs md:text-sm delay-400 cursor-pointer mr-5 ease-in-out inline ">
          {selectedData.bids.length} Auctions
        </Tab>
        {/* <Tab className="transition-all text-xs md:text-sm delay-400 cursor-pointer mx-5 ease-in-out inline ">
          25 Auctions
        </Tab> */}
      </TabList>
      <TabPanel>
        <div>
          <span className="text-xs md:text-sm mt-2 block font-normal text-letters">
            Today’s Date and Time
          </span>
          <div className="">
            <span className="text-xs md:text-sm font-semibold text-letters">
              {/* Monday, June 14, 2021 */}
              {today.toLocaleString('en-NG', {
                  weekday: 'long', // long, short, narrow
                  day: 'numeric', // numeric, 2-digit
                  year: 'numeric', // numeric, 2-digit
                  month: 'long', // numeric, 2-digit, long, short, narrow
                  hour: 'numeric', // numeric, 2-digit
                  minute: 'numeric', // numeric, 2-digit
              })}
              {ampm}
            </span>
            {/* <span className="text-xs md:text-sm font-semibold text-letters mx-3">
              {`${today.getHours()} : ${today.getMinutes()}`}
            </span> */}
          </div>
        </div>
        <TimeTrail />
      </TabPanel>
      {/* <TabPanel>
        <h2>Any content 4</h2>
      </TabPanel> */}
    </Tabs>
  );
};


export default ContentSideComponent;
