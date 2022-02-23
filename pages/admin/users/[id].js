import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { enviroment } from "../../../src/components/environment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader} from "react-spinners";

function UserDetail() {
    const router = useRouter()
    const userId = router.query.id;

    const [userDetail, setuserDetail] = useState(null)
    const [transactions, settransactions] = useState(null)
    const [confirmModal, setconfirmModal] = useState(false)
    const [removeModal, setremoveModal] = useState(false)
    const [confirmBlockModal, setconfirmBlockModal] = useState(false)
    const [confirmUnblockModal, setconfirmUnblockModal] = useState(false)
    const [makeAdminUserId, setmakeAdminUserId] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
      getUserDetail()
    
      return () => {
        getUserDetail()
      }
    }, [isLoading])

    useEffect(() => {
      getTransaction()
    
      return () => {
        getTransaction()
      }
    }, [])


    

    function dateFormatter(val) {
        const formatDate = Date.parse(val)
        const work = new Intl.DateTimeFormat('en-NG').format(formatDate)
    
        return work;
    }


    const getUserDetail = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(enviroment.BASE_URL + "auth/user/users/admin/" + userId, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.error == false) {
                setuserDetail(result.data)
            }
        })
        .catch(error => console.log('error', error));
    }

    const getTransaction = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch(enviroment.BASE_URL + "transactions/get-owner/" + userId, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.error == false) {
                settransactions(result.data)
            }
        })
        .catch(error => console.log('error', error));
    }

    const confirmFunction = (id) => {
        // console.log(id)
        setmakeAdminUserId(id)
        setconfirmModal(true)
      }

      const confirmRemove = (id) => {
        // console.log(id)
        setmakeAdminUserId(id)
        setremoveModal(true)
      }
  
      const confirmBlockFunction = (id) => {
        // console.log(id)
        setmakeAdminUserId(id)
        setconfirmBlockModal(true)
      }


      const confirmUnblockFunction = (id) => {
        // console.log(id)
        setmakeAdminUserId(id)
        setconfirmUnblockModal(true)
      }
  
      const confirmMakeAdmin = () => {
        setisLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
          "isAdmin": true
        });
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        fetch(enviroment.BASE_URL + "auth/user/make/sub/" + userId, requestOptions)
          .then(response => response.json())
          .then(result => {
            setisLoading(false)
            console.log(result)
            if(result.error == false) {
              toast.success("Successful")
              setconfirmModal(false)
            }
          })
          .catch(error => console.log('error', error));
      }

      const confirmRemoveAdmin = () => {
        setisLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
          "isAdmin": false
        });
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        fetch(enviroment.BASE_URL + "auth/user/make/sub/" + userId, requestOptions)
          .then(response => response.json())
          .then(result => {
            setisLoading(false)
            console.log(result)
            if(result.error == false) {
              toast.success("Successful")
              setremoveModal(false)
            }
          })
          .catch(error => console.log('error', error));
      }
  
      const confirmBlock = () => {
        setisLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
          "block": true
        });
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        fetch(enviroment.BASE_URL + "auth/user/block/" + userId, requestOptions)
          .then(response => response.json())
          .then(result => {
            setisLoading(false)
            console.log(result)
            if(result.error == false) {
              toast.success("User has been blocked")
              setconfirmBlockModal(false)
            }
          })
          .catch(error => console.log('error', error));
      }

      const confirmUnblock = () => {
        setisLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
          "block": false
        });
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        fetch(enviroment.BASE_URL + "auth/user/block/" + userId, requestOptions)
          .then(response => response.json())
          .then(result => {
            setisLoading(false)
            console.log(result)
            if(result.error == false) {
              toast.success("User has been unblocked")
              setconfirmUnblockModal(false)
            }
          })
          .catch(error => console.log('error', error));
      }
    


  return (
    <div className="p-8 pl-24 mb-20">
        <ToastContainer />
        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
                {/* <!-- Left Side --> */}
                <div className="w-full md:w-3/12 md:mx-2">
                    {/* <!-- Profile Card --> */}
                    <div className="bg-white p-3 border-t-4 border-green-400">
                        <div className="image overflow-hidden">
                            {userDetail?.image ? (
                            <img className="h-auto w-full mx-auto"
                                src={userDetail?.image}
                                alt="" />

                            ) : (
                                <div className="h-28 border w-full mx-auto bg-white text-center justify-center items-center flex">
                                    No Image
                                </div>
                            )}
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userDetail?.profile.firstName} {userDetail?.profile.lastName}</h1>
                        {/* <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3> */}
                        {/* <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                            Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p> */}
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto"><span
                                        className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Joined since</span>
                                {userDetail?.createdAt ? (
                                    <span className="ml-auto">{dateFormatter(userDetail?.createdAt)}</span>
                                ) : (
                                    <>N/A</>
                                )}
                            </li>
                        </ul>
                    </div>
                    {/* <!-- End of profile card --> */}
                    <div className="my-4"></div>
                    
                </div>
                {/* <!-- Right Side --> */}
                <div className="w-full md:w-9/12 mx-2 h-64">
                    {/* <!-- Profile tab --> */}
                    {/* <!-- About Section --> */}
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    <div className="px-4 py-2">{userDetail?.profile.firstName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                    <div className="px-4 py-2">{userDetail?.profile.lastName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Gender</div>
                                    <div className="px-4 py-2">N/A</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    <div className="px-4 py-2">+{userDetail?.profile.phoneNumber}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Current Address</div>
                                    <div className="px-4 py-2">{userDetail?.profile.address}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                    <div className="px-4 py-2">{userDetail?.profile.address}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                    <div className="px-4 py-2">
                                        <a className="text-blue-800" href="mailto:jane@example.com">{userDetail?.email}</a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Birthday</div>
                                    <div className="px-4 py-2">N/A</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 p-1 w-auto bg-gray-50">
                            <button
                                className="block text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3">
                                Edit User</button>
                                {userDetail?.isAdmin ? (
                                    <button
                                    onClick={() => confirmRemove(userDetail?._id)}
                                    className="block text-yellow-400 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3">
                                    Remove As Admin</button>

                                ) : (
                                    <button
                                    onClick={() => confirmFunction(userDetail?._id)}
                                    className="block text-yellow-400 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3">
                                    Make User Admin</button>
                                )}
                                {userDetail?.block ? (
                                    <button
                                    onClick={() => confirmUnblockFunction(userDetail?._id)} 
                                    className="block text-red-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3">
                                    Unblock User</button>

                                ) : (
                                    <button
                                    onClick={() => confirmBlockFunction(userDetail?._id)} 
                                    className="block text-red-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3">
                                    Block User</button>
                                )}

                        </div>
                    </div>
                    {/* <!-- End of about section --> */}

                    <div className="my-4"></div>

                  
                </div>
            </div>
            <div className="tables">
                <div className="flex flex-col gap-5">
                    {(transactions && transactions?.length >= 1) && (
                        <div>
                            <p className="uppercase text-base mb-2 font-semibold">Transactions</p>
                            <div className="block w-full border mb-10">
                                {/* transaction table */}
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead className="thead-light bg-gray-50">
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Vehicle/Collection Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Amount
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Balance
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Status
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Date
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions?.map((transaction) => (
                                        <tr key={transaction?._id} className="cursor-pointer hover:bg-gray-100" onClick={() => router.push('/admin/auctions/buy-now/' + transaction?.vehicle?._id)}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                {transaction?.vehicle?.name || "N/A"}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                ${transaction?.amount || "N/A"}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            ${transaction?.balance || "N/A"}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {transaction?.statusTrans || "N/A"}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {dateFormatter(transaction?.createdAt)}
                                            </td>
                                        </tr>

                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {confirmModal && (
              <div id="switchAddressModal" className="modal">
                  {/* <!-- Modal content --> */}
                  <div className="modal-content sheetModal bg-white relative w-10/12 lg:w-1/3 mx-auto mx-8 md:px-0 md:mt-28 md:px-20 md:py-10">
                      <span
                          onClick={() => {
                          setconfirmModal(false);
                          }}
                          className="close absolute cursor-pointer right-5 top-1 text-4xl text-gray-500"
                      >
                          &times;
                      </span>
                          
                      <div
                          className="flex flex-col gap-4"
                              
                              >
                              <h1 className="font-semibold text-lg text-center">Are you sure you want to make this user an admin?</h1>
                          <div className="flex gap-4 items-center justify-center">
                              <button
                              onClick={() => {
                                  confirmMakeAdmin();
                              }}
                                className="py-1 px-4 text-sm rounded-md bg-green-500 text-white mr-1">
                                {isLoading ? (
                                    <ClipLoader color="#fff" size="20px"></ClipLoader>
                                ) : (
                                    <>Yes</>
                                )}
                                
                                </button>

                              <button 
                              onClick={() => {
                                  setconfirmModal(false);
                              }} 
                              className="py-1 px-4 text-sm rounded-md bg-white text-black mr-1 border">
                              Cancel
                              </button>
                          </div>
                      </div> 
                  </div>
              </div>    
          )}

          {removeModal && (
              <div id="switchAddressModal" className="modal">
                  {/* <!-- Modal content --> */}
                  <div className="modal-content sheetModal bg-white relative w-10/12 lg:w-1/3 mx-auto mx-8 md:px-0 md:mt-28 md:px-20 md:py-10">
                      <span
                          onClick={() => {
                          setremoveModal(false);
                          }}
                          className="close absolute cursor-pointer right-5 top-1 text-4xl text-gray-500"
                      >
                          &times;
                      </span>
                          
                      <div
                          className="flex flex-col gap-4"
                              
                              >
                              <h1 className="font-semibold text-lg text-center">Are you sure you want to remove this user as admin?</h1>
                          <div className="flex gap-4 items-center justify-center">
                              <button
                              onClick={() => {
                                  confirmRemoveAdmin();
                              }}
                                className="py-1 px-4 text-sm rounded-md bg-green-500 text-white mr-1">
                                {isLoading ? (
                                    <ClipLoader color="#fff" size="20px"></ClipLoader>
                                ) : (
                                    <>Yes</>
                                )}
                                
                                </button>

                              <button 
                              onClick={() => {
                                  setconfirmModal(false);
                              }} 
                              className="py-1 px-4 text-sm rounded-md bg-white text-black mr-1 border">
                              Cancel
                              </button>
                          </div>
                      </div> 
                  </div>
              </div>    
          )}

          {confirmBlockModal && (
              <div id="switchAddressModal" className="modal">
                  {/* <!-- Modal content --> */}
                  <div className="modal-content sheetModal bg-white relative w-10/12 lg:w-1/3 mx-auto mx-8 md:px-0 md:mt-28 md:px-20 md:py-10">
                      <span
                          onClick={() => {
                          setconfirmBlockModal(false);
                          }}
                          className="close absolute cursor-pointer right-5 top-1 text-4xl text-gray-500"
                      >
                          &times;
                      </span>
                          
                      <div
                          className="flex flex-col gap-4"
                              
                              >
                              <h1 className="font-semibold text-lg text-center">Are you sure you want to block this user?</h1>
                          <div className="flex gap-4 items-center justify-center">
                              <button
                              onClick={() => {
                                  confirmBlock();
                              }}
                                className="py-1 px-4 text-sm rounded-md bg-green-500 text-white mr-1">
                                {isLoading ? (
                                    <ClipLoader color="#fff" size="20px"></ClipLoader>
                                ) : (
                                    <>Yes</>
                                )}
                                
                                </button>

                              <button 
                              onClick={() => {
                                  setconfirmBlockModal(false);
                              }} 
                              className="py-1 px-4 text-sm rounded-md bg-white text-black mr-1 border">
                              Cancel
                              </button>
                          </div>
                      </div> 
                  </div>
              </div>    
          )}

          {confirmUnblockModal && (
              <div id="switchAddressModal" className="modal">
                  {/* <!-- Modal content --> */}
                  <div className="modal-content sheetModal bg-white relative w-10/12 lg:w-1/3 mx-auto mx-8 md:px-0 md:mt-28 md:px-20 md:py-10">
                      <span
                          onClick={() => {
                          setconfirmUnblockModal(false);
                          }}
                          className="close absolute cursor-pointer right-5 top-1 text-4xl text-gray-500"
                      >
                          &times;
                      </span>
                          
                      <div
                          className="flex flex-col gap-4"
                              
                              >
                              <h1 className="font-semibold text-lg text-center">Are you sure you want to unblock this user?</h1>
                          <div className="flex gap-4 items-center justify-center">
                              <button
                              onClick={() => {
                                confirmUnblock();
                              }}
                                className="py-1 px-4 text-sm rounded-md bg-green-500 text-white mr-1">
                                {isLoading ? (
                                    <ClipLoader color="#fff" size="20px"></ClipLoader>
                                ) : (
                                    <>Yes</>
                                )}
                                
                                </button>

                              <button 
                              onClick={() => {
                                  setconfirmBlockModal(false);
                              }} 
                              className="py-1 px-4 text-sm rounded-md bg-white text-black mr-1 border">
                              Cancel
                              </button>
                          </div>
                      </div> 
                  </div>
              </div>    
          )}
        </div>
    </div>
  )
}

export default UserDetail