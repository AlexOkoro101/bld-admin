import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BidDetails = () => {
  var dollarFormatter = new Intl.NumberFormat();
  const toastError = () =>
    toast.error(`${error ? error : 'Could not perform operation'}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const toastSuccess = () =>
    toast.success(`${message ? message : 'Success'}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [bidCollection, setbidCollection] = useState(null);

  const [isLoading, setisLoading] = useState(true);
  const [error, seterror] = useState(null);
  const [message, setmessage] = useState(null);
  const [toggler, setToggler] = useState(false);
  const [imageD, setimageD] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(window.innerWidth <= 760 ? 3 : 5);
  const [count, setCount] = useState(0);
  const [overview, setoverview] = useState(true);
  const [userId, setuserId] = useState(null);
  const [processDetails, setprocessDetails] = useState(null);
  const [processStep, setprocessStep] = useState("")
  const [processstage, setprocessstage] = useState(0);

  const router = useRouter();
  const bidId = router.query.id;
  // const adjustHeight = () => {
  //   const proccessBody = document.getElementsByClassName('tracker-table');
  //   var proccessBodyHeight = proccessBody[0]?.offsetHeight;
  //   console.log(proccessBodyHeight);
  //   const processCircle = document.querySelector('.process-circle');
  //   processCircle.style.setProperty('--height', `${proccessBodyHeight}px`);
  // };

  const retrieveData = () => {
    const userActive = localStorage.getItem('user');

    if (!userActive) {
      return;
    }
    const item = JSON.parse(userActive).userToken;
    const now = new Date();
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      window.localStorage.clear();
      return null;
    }
    setuserId(item?.userId);

    if (userId) {
      getProcessFlow();
    }
  }; //Get Data from local Storage

  const getProcessFlow = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://buylinke.herokuapp.com/process/vehicle/' + bidCollection?._id,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        const newResult = JSON.parse(result);
        console.log("process Result", newResult);
        setprocessDetails(newResult?.data?.details);
        if(newResult?.data == null) {
          setprocessDetails([]);
        }
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    retrieveData();
    return () => {
      retrieveData();
    };
  }, [bidCollection, processstage]);

  useEffect(() => {
    getProcessFlow();
    return () => {
      getProcessFlow();
    };
  }, [bidCollection]);

  

  useEffect(() => {
    // console.log(bidId);
    fetch('https://buylinke.herokuapp.com/vehicles/' + bidId, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => {
        setisLoading(false);
        return response.text();
      })
      .then((result) => {
        if (result) {
          // console.log(result)
          if (Object.entries(result).length >= 1) {
            const formatCollection = JSON.parse(result);
            console.log(formatCollection.data.vehicle, 'ppp');
            setbidCollection(formatCollection.data.vehicle);
          }
        }
        console.log(bidCollection);
      })
      .catch((error) => console.log('error', error));
  }, [processstage]);

  useEffect(() => {
    displaySmall();
  }, [bidCollection]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     adjustHeight();
  //   }, 2000);
  //   return () => {
  //     setTimeout(() => {
  //       adjustHeight();
  //     }, 2000);
  //   };
  // }, []);

  function displaySmall() {
    let data = bidCollection?.images?.length;
    var size;
    if (window.innerWidth <= 760) {
      size = 3;
    } else {
      size = 5;
    }
    let count = bidCollection?.images?.length - size;
    setCount(count);
    if (data > window.innerWidth <= 760 ? 3 : 5) {
      let data = bidCollection?.images?.slice(page, size);
      setimageD(data);
    } else {
      let data = bidCollection?.images;
      setimageD(data);
    }
  }
  const prevPage = async () => {
    var size;
    if (window.innerWidth <= 760) {
      size = 3;
    } else {
      size = 5;
    }
    let data = bidCollection?.images?.slice(page - size, limit - size);
    setimageD(data);
    setPage(page - size);
    setLimit(limit - size);
    setCount(count + size);
  };
  const nextPage = async () => {
    var size;
    if (window.innerWidth <= 760) {
      size = 3;
    } else {
      size = 5;
    }
    let data = bidCollection?.images?.slice(page + size, limit + size);
    setimageD(data);
    setPage(page + size);
    setLimit(limit + size);
    setCount(count - size);
  };

  const returnLargeimage = () => {
    const largeImageArray = bidCollection?.images.map((image) => {
      return image.image_largeUrl;
    });

    return largeImageArray;
  };

  const displayLargeimage = () => {
    return (
      <>
        <FsLightbox
          toggler={toggler}
          sources={returnLargeimage()}
          type="image"
        />
        <img
          onClick={() => {
            setToggler(!toggler);
          }}
          src={bidCollection?.images[0]?.image_largeUrl}
          loading="lazy"
          className="rounded-xl w-full largeImage sm:h-32 shadow-md cursor-pointer"
          alt="Benz"
        />
      </>
    );
  };

  var nairaFormatter = new Intl.NumberFormat();

  const d = new Date();
  const handleProcess = () => {
    const obj = {
      body: processStep,
      Updated_by: "617d0c0a3097a603b147a4d9",
      created_at: `${d}`,
      updated_at: `${d}`
    }


    processDetails.push(obj)
    console.log(processDetails)


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      details: processDetails
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://buylinke.herokuapp.com/process/vehicle/" + bidCollection?._id, requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result)
        const item = JSON.parse(result)
        if(item.error == false) {
            setprocessstage(processstage + 1)
        }
    })
    .catch(error => console.log('error', error));
  }

  return (
    <div>
      <ToastContainer />
      {bidCollection && (
        <>
          <main className="main mt-5">
            <div className="flex justify-center w-full">
              {/* <!-- w-10/12 --> */}
              <div className="mx-auto flex-wrap lg:flex-nowrap flex justify-between page-holder w-full">
                {/* <!-- deposit details here --> */}
                <aside className="sidebar  px-4 md:px-2 lg:pl-24 lg:pr-9 pb-4">
                  <p className="font-semibold text-sm py-5 px-2">
                    Car details
                  </p>
                  <div className="car-holder grid grid-cols-6 lg:grid-cols-1 items-center  gap-6 md:gap-3 lg:gap-1  py-2.5">
                    <span className="col-span-3 inline-block overflow-hidden rounded-md">
                      <img
                        className="w-64"
                        src={bidCollection?.images[0]?.image_largeUrl}
                        alt=""
                      />
                    </span>
                    <div className="col-span-3">
                      <p className="text-base lg:mt-3 primary-black font-medium uppercase">
                        {`${bidCollection?.name}` ||
                          `${bidCollection?.year} ${bidCollection?.make} ${bidCollection?.model}`}
                      </p>
                      {bidCollection?.odometer && (
                        <p className="primary-black font-medium py-1 text-sm uppercase">
                            {dollarFormatter.format(bidCollection?.odometer)} mi
                        </p>
                      )}
                      <p className="primary-black font-medium text-sm uppercase">
                        vin: {bidCollection?.vin}
                      </p>
                      <p className="primary-black font-medium text-xs uppercase">
                        ${dollarFormatter.format(bidCollection?.price)}
                      </p>
                    </div>
                  </div>

                  <table className="min-w-full ">
                    <tbody>
                      {bidCollection?.trucking &&
                      bidCollection?.trucking !== '0' ? (
                        <tr className="detail-row mb-2">
                          <td className="sec-black text-sm font-semibold py-1.5">
                            Trucking
                          </td>
                          <td className="text-sm primary-black font-normal py-1.5">
                            ${bidCollection?.trucking || 0}
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}

                      {bidCollection?.shipping &&
                        bidCollection?.shipping !== '0' && (
                          <tr className="detail-row mb-2">
                            <td className="sec-black text-sm font-semibold py-1.5">
                              Shipping
                            </td>
                            <td className="text-sm primary-black font-normal py-1.5">
                              ${bidCollection?.shipping || 0}
                            </td>
                          </tr>
                        )}

                      <tr className="detail-row mb-2">
                        <td className="sec-black text-sm font-semibold py-1.5">
                          Clearing
                        </td>
                        <td className="text-sm primary-black font-normal py-1.5">
                          N/A
                        </td>
                      </tr>

                      <tr className="detail-row mb-2">
                        <td className="sec-black text-sm font-semibold py-1.5">
                          Auction Fee
                        </td>
                        <td className="text-sm primary-black font-normal py-1.5">
                          $450
                        </td>
                      </tr>

                      <tr className="detail-row mb-2">
                        <td className="sec-black text-sm font-semibold py-1.5">
                          Service Fee
                        </td>
                        <td className="text-sm primary-black font-normal py-1.5">
                          $400
                        </td>
                      </tr>

                      <tr className="detail-row mb-2 ">
                        <td className="total-border sec-black text-sm font-semibold py-1.5 ">
                          Total
                        </td>
                        <td className="total-border text-sm primary-black font-normal py-1.5 ">
                          {bidCollection?.bidAmount}
                        </td>
                      </tr>

                      <tr className="detail-row mb-2">
                        <td className="sec-black text-sm font-semibold py-1.5">
                          Deposit
                        </td>
                        <td className="text-sm primary-black font-normal py-1.5">
                          $1,000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </aside>

                <section className="main-section w-2/3  md:ml-5 lg:mx-12  ">
                  <div className="lg:flex lg:justify-between gap-x-12">
                    <div className="Tracker-holder pb-20  ">
                      <p className="font-semibold text-sm py-5 px-2">
                        Bid Tracker
                      </p>
                      <div className="mb-9">
                          <select name="process-select" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" id="process-select" value={processStep} onChange={(e) => setprocessStep(e.target.value)}>
                            <option>Choose process step</option>
                            <option value="You placed a bid for...">You placed a bid for...</option>
                            <option value="Your bid has been won and is awaiting balance payment.">Your bid has been won and is awaiting balance payment.</option>
                            <option value="You paid the balance for the car and is awaiting pick up at the lot.">You paid the balance for the car and is awaiting pick up at the lot.</option>
                            <option value="Your car has been picked up from the lot and is on the way to the port.">Your car has been picked up from the lot and is on the way to the port.</option>
                            <option value="The car has been dropped at the port and is awaiting shippment.">The car has been dropped at the port and is awaiting shippment.</option>
                            <option value="Your car has been shipped to Nigeria and is awaiting clearance at the port.">Your car has been shipped to Nigeria and is awaiting clearance at the port.</option>
                            <option value="Your car has been cleared at the port and is awaiting delivery or pickup.">Your car has been cleared at the port and is awaiting delivery or pickup.</option>
                            <option value="Your car has been delivered.">Your car has been delivered.</option>
                          </select>
                          <button className="bg-red-700 text-white mt-2 rounded-md text-sm px-3 py-1" onClick={handleProcess}>Submit</button>
                      </div>
                      {processDetails ? (
                        <>
                          <table className="tracker-table">
                            {processDetails?.map((process) => (
                              <tbody
                                key={process._id}
                                className="process-body flex items-center border-b pb-4 mb-4"
                              >
                                <tr className="pr-4 mb-3  md:text-right leading-3 md:mb-0">
                                  <td>
                                    <p className="text-xs font-bold" id="date">
                                      {new Date(
                                        process?.created_at,
                                      ).toLocaleDateString('en-NG', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                      })}
                                    </p>
                                    <small className="text-xs " id="time">
                                      {new Date(process?.created_at)
                                        .toLocaleTimeString('en-NG', {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          hour12: true,
                                        })
                                        .toUpperCase()}
                                    </small>
                                  </td>
                                </tr>
                                <tr className="">
                                  <td className="process-circle circle w-px bg-gray-300 h-8"></td>
                                </tr>
                                <tr>
                                  <td className=" pl-4 mb-3 leading-4 w-44 md:w-72">
                                    <small>{process?.body}</small>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                            {/* <tbody className="flex items-center mb-2 mt-8 lg:mt-11">
                                                        <tr className="pr-4 mb-3  md:text-right leading-3 md:mb-0">
                                                            <td>
                                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                                <small className="text-xs " id="time">12:20 PM</small>
                                                            </td>
                                                        </tr>
                                                        <tr className=" mb-3 ">
                                                            <td className="circle"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className=" pl-4 mb-3 leading-4 w-52 md:w-72">
                                                                <small>Your bid has been won and is awaiting balance payment.</small>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                    <tbody className="flex items-center mb-2 mt-8 lg:mt-11">
                                                        <tr className="pr-4 mb-3  md:text-right leading-3 md:mb-0">
                                                            <td>
                                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                                <small className="text-xs " id="time">12:20 PM</small>
                                                            </td>
                                                        </tr>
                                                        <tr className=" mb-3 ">
                                                            <td className="circle"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className=" pl-4 mb-3 leading-4 w-52 md:w-72">
                                                                <small>You paid the balance for the car and is awaiting pick up at the
                                                                    lot.</small>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                    <tbody className="flex items-center mb-2 mt-8 lg:mt-11">
                                                        <tr className="pr-4 mb-3  md:text-right leading-3 md:mb-0">
                                                            <td>
                                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                                <small className="text-xs " id="time">12:20 PM</small>
                                                            </td>
                                                        </tr>
                                                        <tr className=" mb-3 ">
                                                            <td className="circle"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className=" pl-4 mb-3 leading-4 w-52 md:w-72">
                                                                <small>Your car has been picked up from the lot and is on the way to the
                                                                    port.</small>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                    <tbody className="flex items-center mb-2 mt-8 lg:mt-11">
                                                        <tr className="pr-4 mb-3  md:text-right leading-3 md:mb-0">
                                                            <td>
                                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                                <small className="text-xs " id="time">12:20 PM</small>
                                                            </td>
                                                        </tr>
                                                        <tr className=" mb-3 ">
                                                            <td className="circle"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className=" pl-4 mb-3 leading-4 w-52 md:w-72">
                                                                <small>The car has been dropped at the port and is awaiting
                                                                    shippment.</small>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                    <tbody className="flex items-center mb-2 mt-8 lg:mt-11">
                                                        <tr className="pr-4 mb-3  md:text-right leading-3 md:mb-0">
                                                            <td>
                                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                                <small className="text-xs " id="time">12:20 PM</small>
                                                            </td>
                                                        </tr>
                                                        <tr className=" mb-3 ">
                                                            <td className="circle"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className=" pl-4 mb-3 leading-4 w-52 md:w-72">
                                                                <small>Your car has been shipped to Nigeria and is awaiting clearance at
                                                                    the port.</small>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                    <tbody className="flex items-center mb-2 mt-8 lg:mt-11">
                                                        <tr className="pr-4 mb-3  md:text-right leading-3 md:mb-0">
                                                            <td>
                                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                                <small className="text-xs " id="time">12:20 PM</small>
                                                            </td>
                                                        </tr>
                                                        <tr className=" mb-3 ">
                                                            <td className="circle"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className=" pl-4 mb-3 leading-4 w-52 md:w-72">
                                                                <small>Your car has been cleared at the port and is awaiting delivery or
                                                                    pickup.</small>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                    <tbody className="flex items-center mb-2 mt-8 lg:mt-11">
                                                        <tr className="pr-4 mb-3  md:text-right leading-3 md:mb-0">
                                                            <td>
                                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                                <small className="text-xs " id="time">12:20 PM</small>
                                                            </td>
                                                        </tr>
                                                        <tr className=" mb-3 ">
                                                            <td className="circle"></td>
                                                        </tr>
                                                        <tr>
                                                            <td className=" pl-4 mb-3 leading-4 w-52 md:w-72">
                                                                <small>Your car has been delivered.</small>
                                                            </td>
                                                        </tr>

                                                    </tbody> */}
                          </table>
                        </>
                      ) : (
                        <>
                          <p className="text-xs">No feedback available yet</p>
                        </>
                      )}

                      {/* <!-- <div className=" px-3 mb-3  text-right leading-3 md:mb-0">
                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                <small className="text-xs " id="time">12:20 PM</small>
                                            </div>
                                            <div className="circle  px-3 mb-3 md:mb-0">
                                                <input type="radio">
                                            </div>
                                            <div className=" px-3 mb-3 md:mb-0 leading-4 text-sm">
                                                <small>You placed a bid for Mercedes Benz GLK.</small>
                                            </div> --> */}

                      {/* <!-- <div className=" flex items-center md:flex mb-2 mt-9">
                                            <div className=" px-3 mb-3  text-right leading-3 md:mb-0">
                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                <small className="text-xs " id="time">12:20 PM</small>
                                            </div>
                                            <div className="circle  px-3 mb-3 md:mb-0">
                                                <input type="radio">
                                            </div>
                                            <div className=" px-3 mb-3 md:mb-0 leading-4 text-sm">
                                                <small>Your bid has been won and is awaiting balance payment.</small>
                                            </div>
                                        </div> --> */}
                      {/* <!-- <div className=" flex items-center md:flex mb-2 mt-9">
                                            <div className=" px-3 mb-3  text-right leading-3 md:mb-0">
                                                <p className="text-xs font-bold" id="date">Feb 28, 2021</p>
                                                <small className="text-xs " id="time">12:20 PM</small>
                                            </div>
                                            <div className="circle  px-3 mb-3 md:mb-0">
                                                <input type="radio">
                                            </div>
                                            <div className=" px-3 mb-3 md:mb-0 leading-4 text-sm">
                                                <small>Your bid has been won and is awaiting balance payment.</small>
                                            </div>
                                        </div> --> */}
                    </div>
                    {/* <!-- bid Tracker end --> */}
                    {/* <!-- document  file  --> */}
                    <div className="doc-holder">
                      <p className="font-semibold text-sm py-5 px-2">
                        Vehicle Documents
                      </p>
                      <div className="doc-upload">
                          <input type="file" className="border border-gray-400 text-gray-600 rounded-lg w-full p-1 text-sm" name="doc" id="doc" />
                          <button className="bg-red-700 text-white mt-2 rounded-md text-sm px-3 py-1" onClick={handleProcess}>Submit</button>
                      </div>
                      <div className="pb-10 border mt-2">
                        <div className="download-file w-full md:w-72 flex justify-between items-center bg-white px-5 py-4">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <img
                                src="../../../assets/img/vectors/file-icon.svg"
                                alt="file-icon"
                              />
                            </div>
                            <div className="leading-3">
                              <p className="text-xs">Legal Contract</p>
                              <small className="text-xs">105 kb</small>
                            </div>
                          </div>
                          <div className="cursor-pointer">
                            <img
                              src="../../../assets/img/vectors/download-icon.svg"
                              alt="download-icon"
                            />
                          </div>
                        </div>
                        <div className="download-file w-full md:w-72 flex justify-between items-center bg-white px-5 py-4 mt-3">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <img
                                src="../../../assets/img/vectors/file-icon.svg"
                                alt="file-icon"
                              />
                            </div>
                            <div className="leading-3">
                              <p className="text-xs">Legal Contract</p>
                              <small className="text-xs">105 kb</small>
                            </div>
                          </div>
                          <div className="cursor-pointer">
                            <img
                              src="../../../assets/img/vectors/download-icon.svg"
                              alt="download-icon"
                            />
                          </div>
                        </div>
                        <div className="download-file w-full md:w-72 flex justify-between items-center bg-white px-5 py-4 mt-3">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <img
                                src="../../../assets/img/vectors/file-icon.svg"
                                alt="file-icon"
                              />
                            </div>
                            <div className="leading-3">
                              <p className="text-xs">Legal Contract</p>
                              <small className="text-xs">105 kb</small>
                            </div>
                          </div>
                          <div className="cursor-pointer">
                            <img
                              src="../../../assets/img/vectors/download-icon.svg"
                              alt="download-icon"
                            />
                          </div>
                        </div>
                        <div className="download-file w-full md:w-72 flex justify-between items-center bg-white px-5 py-4 mt-3">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <img
                                src="../../../assets/img/vectors/file-icon.svg"
                                alt="file-icon"
                              />
                            </div>
                            <div className="leading-3">
                              <p className="text-xs">Legal Contract</p>
                              <small className="text-xs">105 kb</small>
                            </div>
                          </div>
                          <div className="cursor-pointer">
                            <img
                              src="../../../assets/img/vectors/download-icon.svg"
                              alt="download-icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default BidDetails;
