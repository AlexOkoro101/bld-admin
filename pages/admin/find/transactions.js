
import { useEffect, useState } from "react"
import { enviroment } from "../../../src/components/environment";
import ReactPaginate from 'react-paginate'
import { ClipLoader} from "react-spinners";

function Transactions() {
  const [transactions, settransactions] = useState(null);
  const [users, setusers] = useState(null)
  const [searches, setsearches] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [noValue, setnoValue] = useState(false)


  useEffect(() => {
    getSearchValue()
    return () => {
        getSearchValue()
    }
  }, [])

  const getSearchValue = () => {
    const searchValue = localStorage.getItem('searchValue')
    if(searchValue) {
        getTransactions(searchValue)
      
    } else {
      setnoValue(true)
    }
  }



  const getTransactions = (searchValue) => {
    setisLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "transactions/fast/search?search=" + searchValue, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        setisLoading(false)

        if(result.status == "true") {
            settransactions(result)
        }
    })
    .catch(error => console.log('error', error));
  }

//   const fetchTransactions = (currentPage) => {
//     setisPaginationLoading(true)
//     var requestOptions = {
//       method: 'GET',
//       redirect: 'follow'
//     };
    
//     fetch(enviroment.BASE_URL + "transactions?page="  + currentPage, requestOptions)
//     .then(response => response.text())
//     .then(result => {
//       setisPaginationLoading(false)
//       const item = JSON.parse(result)
//       console.log(item)

//       if(item.error == false) {
//         settransactions(item)
//       }
//     })
//     .catch(error => console.log('error', error));
//   }

//   const handlePageChange = (data) => {
//     console.log(data.selected)

//     let currentPage = data.selected

//     fetchTransactions(currentPage)
//   }

  


  return (
    <div className="p-8 pl-24 flex flex-col gap-y-12">


      {isLoading ? (
        <div className="flex h-56 items-center justify-center">
          <ClipLoader size="50px" color="#999"></ClipLoader>
        </div>
      ) : (
        <>
        <div className="trasactions">
            <div className="transactions-card bg-pink-600 text-white mb-8 w-52 p-4 uppercase">
                <p className="font-semibold">Transactions Found</p>
                <p className="text-sm">{transactions?.data.length.toLocaleString()}</p>
            </div>
            <p className="uppercase text-base mb-2 font-semibold">All Transactions</p>

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
                    {transactions?.data?.map((transaction) => (
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
                            {/* {dateFormatter(transaction?.createdAt)} */}N/A
                        </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
                </div>

            
        </div>

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
  )
}

export default Transactions
