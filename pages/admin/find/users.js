import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate'
import { enviroment } from "../../../src/components/environment"
import UsersTable from "../../../src/components/tables/user-table"
import { ClipLoader} from "react-spinners";


function Users() {
  const [isLoading, setisLoading] = useState(false)
  const [loading, setloading] = useState(false)
  const [users, setusers] = useState(null)
  const [noValue, setnoValue] = useState(false)

  //Paginate
  const [pageCount, setpageCount] = useState(0)
  const [totalPage, settotalPage] = useState(0)

  useEffect(() => {
    getSearchValue()
    return () => {
      getSearchValue()
    }
  }, [])

  const getSearchValue = () => {
    const searchValue = localStorage.getItem('searchValue')
    if(searchValue) {
      getUsers(searchValue)

    } else {
      setnoValue(true)
    }
  }

  const getUsers = (searchValue) => {
    setisLoading(true)
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "auth/user/search?search=" + searchValue, requestOptions)
      .then(response => response.json())
      .then(result => {
        setisLoading(false)
        // const item = JSON.parse(result)
        console.log(result)

        if(result.status == "true") {
          setusers(result)
          // localStorage.clear('searchValue')
        }
      })
      .catch(error => console.log('error', error));
  }

  // const fetchUsers = (currentPage) => {
  //   setloading(true)
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
    
  //   fetch(enviroment.BASE_URL + `auth/user/users/all?page=${currentPage}`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //       setloading(false)
  //       const item = JSON.parse(result)
  //       console.log(item.data.docs)

  //       if(item.error == false) {
  //         setusers(item)
  //       }
  //     })
  //     .catch(error => console.log('error', error));
  // }

  // const handlePageChange = (data) => {
  //   console.log(data.selected)

  //   let currentPage = data.selected

  //   fetchUsers(currentPage)
  // }


  return (
    <div className="p-8 pl-24 mb-20">
    
      <div className="users">
      {isLoading ? (
          <div className="flex h-56 items-center justify-center">
            <ClipLoader size="50px" color="#999"></ClipLoader>

          </div>
      ) : (
        <>
        <div className="users-card bg-indigo-600 text-white w-52 p-4 mb-8 uppercase">
            <p className="font-semibold">Users Found</p>
            <p className="text-sm">{users?.data.length.toLocaleString()}</p>
        </div>
        <p className="uppercase text-base mb-2 font-semibold">Users</p>
        {loading ? (
          <div className="flex h-56 items-center justify-center">
            <ClipLoader size="50px" color="#999"></ClipLoader>

          </div>
        ) : (
          <div className="block w-full border mb-10 overflow-x-auto">
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
                {users?.data.map((user) => (
                  <tr key={user?._id} className="cursor-pointer">
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {user?.profile?.firstName || "N/A"}
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
                      {/* {dateFormatter(user?.createdAt)} */}N/A
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button className="py-1 px-4 text-xs rounded-md bg-blue-500 text-white mr-1">Edit</button>
                      <button className="py-1 px-4 text-xs rounded-md bg-green-500 text-white mr-1">Make Admin</button>
                      <button className="py-1 px-4 text-xs rounded-md bg-yellow-500 text-white mr-1">Block</button>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={totalPage}
          onPageChange={handlePageChange}
          containerClassName={'pagination justify-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          activeClassName={'active'}
        ></ReactPaginate> */}
        </>
      )}


      </div>
    </div>
  )
}

export default Users

