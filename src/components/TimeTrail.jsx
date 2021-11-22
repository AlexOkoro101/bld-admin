import React from 'react';

const TimeTrail = () => {
  const colourStyles = ['red', 'green', 'yellow', 'green', 'red', 'red'];

  return (
    <>
      {colourStyles.map((ele, id) => (
        <div
          key={id}
          className={`bg-${ele}-500 mt-4 border p-0 pl-1.5 rounded-lg overflow-hidden border-gray-30`}
        >
          <div className="p-2 flex justify-between items-center  rounded bg-white ">
            <h4>12:00 AM</h4>
            <div className="flex text-center gap-2 font-black items-center justify-between">
              <div>
                <h3 className="inline  mr-2">2</h3> <span>:</span>
                <h6 className="text-xs font-medium uppercase">Hours</h6>
              </div>
              <div>
                <h3 className="inline  mr-2">34</h3> <span>:</span>
                <h6 className="text-xs font-medium uppercase">Minutes</h6>
              </div>
              <div>
                <h3>30</h3>
                <h6 className="text-xs font-medium uppercase">Seconds</h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TimeTrail;
