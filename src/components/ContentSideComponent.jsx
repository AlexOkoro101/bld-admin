import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TimeTrail from './TimeTrail';

const ContentSideComponent = () => {
  return (
    <Tabs>
      <TabList className="transition-all delay-700 ease-in-out border-b-2">
        <Tab className="transition-all text-xs md:text-sm delay-400 cursor-pointer mr-5 ease-in-out inline ">
          13 Auctions today
        </Tab>
        <Tab className="transition-all text-xs md:text-sm delay-400 cursor-pointer mx-5 ease-in-out inline ">
          25 Auctions
        </Tab>
      </TabList>
      <TabPanel>
        <div>
          <span className="text-xs md:text-sm mt-2 block font-normal text-letters">
            Today’s Date and Time
          </span>
          <div className="">
            <span className="text-xs md:text-sm font-semibold text-letters">
              Monday, June 14, 2021
            </span>
            <span className="text-xs md:text-sm font-semibold text-letters mx-3">
              12:10 PM
            </span>
          </div>
        </div>
        <TimeTrail />
      </TabPanel>
      <TabPanel>
        <h2>Any content 4</h2>
      </TabPanel>
    </Tabs>
  );
};

const mapStateToProps = (state) => {
  const { collections } = state.collection;
  return { collections };
};

export default connect(mapStateToProps, {})(ContentSideComponent);
