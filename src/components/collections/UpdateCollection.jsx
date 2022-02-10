import React, { useRef, useEffect, useState } from 'react';
import { enviroment } from '../environment';
import { ClipLoader} from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateCollection = ({ setShowUpdateContent, carDetail, selectedData }) => {
  console.log(carDetail);
  const ref = useRef();
  const [bidValue, setbidValue] = useState('won')
  const [isLoading, setisLoading] = useState(false)


  useOnClickOutside(ref, () => setShowUpdateContent(false));
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }

  const updateBid = () => {
    setisLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "message": bidValue
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(enviroment.BASE_URL + "bids/progress/" + carDetail?._id, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setisLoading(false)
        if(result.error == false) {
          toast.success('Bid updated!')
          setTimeout(() => {
            setShowUpdateContent(false)
            sendWhatsappMessage()
          }, 1000);
        }
      })
      .catch(error => console.log('error', error));
  } 

  const sendWhatsappMessage = () => {
    window.open(`https://api.whatsapp.com/send?phone=${selectedData.owner.profile.phoneNumber}&text=We%20would%20like%20to%20inform%20you%20that%20the%20result%20on%20your%20bid%20for%20${encodeURIComponent(
      carDetail?.name
    )}%20is%20'${encodeURIComponent(bidValue)}'`)
  }
  return (
    <>
    <ToastContainer />
    <div
      className="p-12 absolute top-0 right-0 bottom-0 left-0  z-50 flex w-full h-full items-center justify-center"
      style={{ background: 'rgba(31, 42, 83, 0.75)' }}
    >
      <div
        ref={ref}
        className="border-2 w-96 bg-white text-center rounded p-12"
      >
        <h3 className="text-sm text-gray-700 my-3">
          Update the status of this bid
        </h3>
        <div className="rounded-md text-sm flex items-center w-full  border-gray-400  border p-2 ">
          <input className="mr-3" type="radio" id="won" name="bidValue" value={bidValue=="won"} onClick={() => setbidValue("won")} />
          Bid won
        </div>
        <div className="rounded-md text-sm flex items-center w-full border-gray-400  border p-2  my-3">
          <input className="mr-3" type="radio" id="lost" name="bidValue"  value={bidValue=="lost"} onClick={() => setbidValue("lost")}  />
          Bid lost
        </div>
        <div className="rounded-md text-sm flex items-center w-full border-gray-400  border p-2  mt-3 mb-1">
          <input className="mr-3" type="radio" id="no sale" name="bidValue"  value={bidValue=="no sale"} onClick={() => setbidValue("no sale")}  />
          No sale
        </div>
        <div className="text-left w-full">
          <label className="text-xs">Enter final price</label>
          <input
            className="rounded-md w-full text-sm block border-gray-400  border p-2 "
            type="text"
          />
        </div>
        <button onClick={updateBid} className="bg-green-500 rounded p-2 mt-4 px-8 text-white">
          {isLoading ? (
            <ClipLoader color="#fff" size="20px"></ClipLoader>
          ) : (
            <>Update</>
          )}
        </button>
      </div>
    </div>
    </>
  );
};
