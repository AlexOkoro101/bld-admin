import { useEffect, useState } from "react"
import Cards from "../src/components/dashboard-cards";
import { enviroment } from "../src/components/environment";
import TransactionTable from "../src/components/tables/transaction-table"

function HomePage() {
  const [transactions, settransactions] = useState(null);
  const [users, setusers] = useState(null)


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
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "transactions", requestOptions)
    .then(response => response.text())
    .then(result => {
      const item = JSON.parse(result)
      console.log(item)

      if(item.error == false) {
        settransactions(item)
        setpageCount(item.data.current_page)
        settotalPage(item.data.last_page)
      }
    })
    .catch(error => console.log('error', error));
  }

  const fetchTransactions = (currentPage) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "transactions?page="  + currentPage, requestOptions)
    .then(response => response.text())
    .then(result => {
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

      <div className="trasactions">
        <p className="uppercase text-base mb-2 font-semibold">All Transactions</p>
        <TransactionTable transactions={transactions}></TransactionTable>
      </div>

      


    </div>
  )
}

export default HomePage
