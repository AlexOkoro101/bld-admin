import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate'
import { enviroment } from "../../src/components/environment"
import UsersTable from "../../src/components/tables/user-table"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClipLoader} from "react-spinners";


function Users() {
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setisLoading] = useState(false)
  const [loading, setloading] = useState(false)
  const [users, setusers] = useState(null)

  //Paginate
  const [pageCount, setpageCount] = useState(0)
  const [totalPage, settotalPage] = useState(0)

  useEffect(() => {
    getUsers()
    return () => {
      getUsers()
    }
  }, [])

  const getUsers = () => {
    setisLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "auth/user/users/all", requestOptions)
      .then(response => response.text())
      .then(result => {
        setisLoading(false)
        const item = JSON.parse(result)
        console.log(item)

        if(item.error == false) {
          setusers(item)
          // setpageCount(Number(item.data.page.replace(/\n/g, '')))
          settotalPage(item.data.pages)
        }
      })
      .catch(error => console.log('error', error));
  }

  const fetchUsers = (currentPage) => {
    setloading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + `auth/user/users/all?page=${currentPage}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        setloading(false)
        const item = JSON.parse(result)
        console.log(item.data.docs)

        if(item.error == false) {
          setusers(item)
        }
      })
      .catch(error => console.log('error', error));
  }

  const handlePageChange = (data) => {
    console.log(data.selected)

    let currentPage = data.selected

    fetchUsers(currentPage)
  }


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
            <p className="font-semibold">Total Users</p>
            <p className="text-sm">{users?.data.total.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center  mb-2">
          <p className="uppercase text-base font-semibold w-11/12">All Users</p>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="userPicker" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"  showYearDropdown />
        </div>
        {loading ? (
          <div className="flex h-56 items-center justify-center">
            <ClipLoader size="50px" color="#999"></ClipLoader>

          </div>
        ) : (
          <UsersTable users={users}></UsersTable>
        )}

        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={totalPage}
          onPageChange={handlePageChange}
          containerClassName={'pagination justify-end'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          activeClassName={'active'}
        ></ReactPaginate>
        </>
      )}


      </div>
    </div>
  )
}

export default Users

