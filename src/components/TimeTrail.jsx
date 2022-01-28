import React from 'react';
import { useState } from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';

const TimeTrail = () => {
  const colourStyles = ['red', 'green', 'yellow', 'green', 'red', 'red'];
  const [color, setcolor] = useState("green")
  const selectedData = useSelector(
    (state) => state.collection.collectionDetail,
  );

  const Completionist = () => <span>Auction Ended!</span>;

  const renderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // setcolor("red")
      // Render a complete state
      return <Completionist />;
    } 
    else {
      // Render a countdown
      return (
        // <span>
        //   {hours}:{minutes}:{seconds}
        // </span>
        <div className="flex text-center gap-2 font-black items-center justify-between">
          <div>
            <h3 className="inline  mr-2">{days}</h3> <span>:</span>
            <h6 className="text-xs font-medium uppercase">Days</h6>
          </div>
          <div>
            <h3 className="inline  mr-2">{hours}</h3> <span>:</span>
            <h6 className="text-xs font-medium uppercase">Hours</h6>
          </div>
          <div>
            <h3 className="inline  mr-2">{minutes}</h3> <span>:</span>
            <h6 className="text-xs font-medium uppercase">Mins</h6>
          </div>
          <div>
            <h3>{seconds}</h3>
            <h6 className="text-xs font-medium uppercase">Secs</h6>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      
      {selectedData.bids.map((ele, id) => (
        <div
          key={id}
          className={` mt-4 border p-0 pl-1.5 rounded-lg overflow-hidden border-gray-30`}
        >
          <div className="p-2 flex justify-between items-center  rounded bg-white ">
            <h4>12:00 AM</h4>
            <Countdown date={Date.now() + 10000} renderer={renderer} />
          </div>
        </div>
      ))}
    </>
  );
};

export default TimeTrail;
