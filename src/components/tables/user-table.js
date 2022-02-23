import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { enviroment } from '../environment'
import { ClipLoader} from "react-spinners";
import { useRouter } from 'next/router';
import Link from 'next/link'

function UsersTable({users}) {
    const router = useRouter();

    const [confirmModal, setconfirmModal] = useState(false)
    const [confirmBlockModal, setconfirmBlockModal] = useState(false)
    const [makeAdminUserId, setmakeAdminUserId] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    function dateFormatter(val) {
        const formatDate = Date.parse(val)
        const work = new Intl.DateTimeFormat('en-NG').format(formatDate)
    
        return work;
    }

    const confirmFunction = (id) => {
      // console.log(id)
      setmakeAdminUserId(id)
      setconfirmModal(true)
    }

    const confirmBlockFunction = (id) => {
      // console.log(id)
      setmakeAdminUserId(id)
      setconfirmBlockModal(true)
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

      fetch(enviroment.BASE_URL + "auth/user/make/sub/" + makeAdminUserId, requestOptions)
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

      fetch(enviroment.BASE_URL + "auth/user/block/" + makeAdminUserId, requestOptions)
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

    return (
        <div className="block w-full border mb-10 overflow-x-auto">
          <ToastContainer />
          {/* transaction table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light bg-gray-50">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Phone Number
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Address
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Date Joined
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.data.docs.map((user) => (
                <tr key={user?._id} onClick={() => router.push('/admin/users/' + user?._id)}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {user?.profile?.firstName || "N/A"} {user?.profile?.lastName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user?.email || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {user?.profile?.phoneNumber || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user?.profile?.address || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {dateFormatter(user?.createdAt)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <p  className="text-blue-600">
                      <Link href={"/admin/users/" + user?._id}>View Details</Link>
                    </p>
                    {/* <button className="py-1 px-4 text-xs rounded-md bg-blue-500 text-white mr-1">Edit</button>
                    {!user?.isAdmin && (
                      <button onClick={() => confirmFunction(user?._id)} className="py-1 px-4 text-xs rounded-md bg-green-500 text-white mr-1">Make Admin</button>
                    )}
                    {user?.block == true ? (
                      <button className="py-1 px-4 text-xs rounded-md bg-yellow-700 text-white mr-1">Unblock</button>
                    ) : (

                    <button onClick={() => confirmBlockFunction(user?._id)} className="py-1 px-4 text-xs rounded-md bg-yellow-500 text-white mr-1">Block</button>
                    )} */}
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
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
        </div>
    )
}

export default UsersTable
