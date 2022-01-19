import { useEffect, useState } from "react"
import Cards from "../src/components/dashboard-cards";
import { enviroment } from "../src/components/environment";
import TransactionTable from "../src/components/tables/transaction-table"
import ReactPaginate from 'react-paginate'
import { ClipLoader} from "react-spinners";

function HomePage() {
  const [transactions, settransactions] = useState(null);
  const [users, setusers] = useState(null)
  const [isLoading, setisLoading] = useState(false)


  //Pagination
  const [pageCount, setpageCount] = useState(0)
  const [totalPage, settotalPage] = useState(0)

  useEffect(() => {
    getTransactions()
    return () => {
      getTransactions()
    }
  }, [])


  const getTransactions = () => {
    setisLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "transactions", requestOptions)
    .then(response => response.text())
    .then(result => {
      setisLoading(false)
      const item = JSON.parse(result)
      console.log(item)

      if(item.error == false) {
        settransactions(item)
        setpageCount(item.page)
        settotalPage(item.total)
      }
    })
    .catch(error => console.log('error', error));
  }

  const fetchTransactions = (currentPage) => {
    setisLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "transactions?page="  + currentPage, requestOptions)
    .then(response => response.text())
    .then(result => {
      setisLoading(false)
      const item = JSON.parse(result)
      console.log(item)

      if(item.error == false) {
        settransactions(item)
      }
    })
    .catch(error => console.log('error', error));
  }

  const handlePageChange = (data) => {
    console.log(data.selected)

    let currentPage = data.selected + 1

    fetchTransactions(currentPage)
  }

  


  return (
    <div className="p-8 pl-24 flex flex-col gap-y-12">
      <Cards transactions={transactions} users={users}></Cards>


      {isLoading ? (
        <ClipLoader size="40px" color="#999"></ClipLoader>
      ) : (
      <div className="trasactions">
        <p className="uppercase text-base mb-2 font-semibold">All Transactions</p>
        <TransactionTable transactions={transactions}></TransactionTable>
        <ReactPaginate
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
        ></ReactPaginate>
      </div>

      )}

      


    </div>
  )
}

export default HomePage
