//
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ContentList from './contentList';
import ContentSideComponent from './ContentSideComponent';
//
const Content = () => {
  return (
    <div className="flex w-full h-full md:pt-4 md:pl-20 p-4 bg-customBg gap-4   font-montserrat  flex-wrap">
      <div className="w-full lg:w-8/12 overflow-auto h-full   text-letters md:pt-5 md:pb-24  ">
        {/* <Tabs>
          <TabList className="transition-all delay-700 ease-in-out border-b-2">
            <Tab className="transition-all text-sm delay-400 cursor-pointer  md:mr-5 ease-in-out inline ">
              All Bids{' '}
            </Tab>
            <Tab className="transition-all text-sm delay-400 cursor-pointer mx-3 md:mx-5 ease-in-out inline ">
              Upcoming Bids
            </Tab>
            <Tab className="transition-all text-sm delay-400 cursor-pointer mx-3 md:mx-5 ease-in-out inline">
              Won Bids
            </Tab>
            <Tab className="transition-all text-sm delay-400 cursor-pointer  md:mx-5 ease-in-out inline">
              Lost Bids
            </Tab>
          </TabList>
          <TabPanel>
            <ContentList />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 4</h2>
          </TabPanel>
        </Tabs> */}
        <ContentList />
      </div>
      <div className="w-full bg-white md:mt-8 lg:mt-0 rounded-md py-6 md:px-4 flex-1 lg:pl-4">
        <ContentSideComponent />
      </div>
    </div>
  );
};

export default Content;
