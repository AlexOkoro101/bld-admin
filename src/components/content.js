//
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//
const Content = ({ title }) => (
  <div className="flex ml-5 font-montserrat  flex-wrap">
    <div className="w-full lg:w-8/12  text-letters py-6 px-6 ">
      <Tabs>
        <TabList className="transition-all delay-700 ease-in-out border-b-2">
          <Tab className="transition-all delay-400 cursor-pointer mr-5 ease-in-out inline ">
            All Bids{' '}
          </Tab>
          <Tab className="transition-all delay-400 cursor-pointer mx-5 ease-in-out inline ">
            Upcoming Bids
          </Tab>
          <Tab className="transition-all delay-400 cursor-pointer mx-5 ease-in-out inline">
            Won Bids
          </Tab>
          <Tab className="transition-all delay-400 cursor-pointer mx-5 ease-in-out inline">
            Lost Bids
          </Tab>
        </TabList>

        <TabPanel>
          <div className="p-3 flex justify-center rounded-md w-full h-60 my-3 shadow">
            <div className="h-full w-1/3 bg-gray-400"></div>
            <div className="h-full w-2/3 p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <div>
                  <div>
                    <span className="text-base font-semibold text-letters mr-4">
                      2020
                    </span>
                    <span className="text-base font-semibold text-letters mx-3">
                      Audi A3
                    </span>
                  </div>
                  <div className="my-1">
                    <span className="text-sm font-normal text-letters">
                      Monday, June 14, 2021
                    </span>
                    <span className="text-sm font-normal text-letters mx-3">
                      12:10 PM
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-base block my-5 font-semibold"
                      style={{ color: '#328CE0' }}
                    >
                      AWAITING BID
                    </span>
                  </div>
                  <div>
                    <span className="text-sm block  font-semibold">
                      Manheim Autos
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base block font-semibold text-letters mr-4">
                    Authorized Bid
                  </span>
                  <span className="text-base block font-semibold text-letters mr-4">
                    $30,500
                  </span>
                </div>
              </div>
              <div className="flex border-t-2 pt-4 items-center justify-between">
                <div>
                  <span>Lane Number: 23</span>
                  <span className="mx-3">Run Number: 237</span>
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
                  text-sm
                  mt-2
                "
                  >
                    View Details
                  </button>
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
                  text-sm
                  mt-2
                "
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
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
      </Tabs>
    </div>
    <div className="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
      <h1>kdkdkdk</h1>
    </div>
  </div>
);

export default Content;
