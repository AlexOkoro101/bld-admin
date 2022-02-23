
import { useEffect, useState } from "react"
import Cards from "../src/components/dashboard-cards";
import { enviroment } from "../src/components/environment";
import TransactionTable from "../src/components/tables/transaction-table"
import ReactPaginate from 'react-paginate'
import { ClipLoader} from "react-spinners";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    
    // title: {
    //   display: true,
    //   text: 'Users',
    // },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function HomePage() {
  const [transactions, settransactions] = useState(null);
  const [users, setusers] = useState(null)
  const [searches, setsearches] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [isPaginationLoading, setisPaginationLoading] = useState(false)


  //Pagination
  const [pageCount, setpageCount] = useState(0)
  const [totalPage, settotalPage] = useState(0)

  const [transactionData, settransactionData] = useState({
    labels,
    datasets: [
      {
        label: 'Transactions',
        data: [1,2,3,4,5,6,7],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    getTransactions()
    return () => {
      getTransactions()
    }
  }, [])

  useEffect(() => {
    getUsers()
    return () => {
      getUsers()
    }
  }, [])

  useEffect(() => {
    getSearches()
    return () => {
      getSearches()
    }
}, [])


const getSearches = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "search", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.error == false) {
          setsearches(result)
        }
      })
      .catch(error => console.log('error', error));
}

  const getUsers = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "auth/user/users/all", requestOptions)
      .then(response => response.text())
      .then(result => {
        const item = JSON.parse(result)
        console.log(item)

        if(item.error == false) {
          setusers(item.data)
        }
      })
      .catch(error => console.log('error', error));
  }


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
        // setpageCount(item.page)
        settotalPage(Math.round(item.total/item.pageSize))
      }
    })
    .catch(error => console.log('error', error));
  }

  const fetchTransactions = (currentPage) => {
    setisPaginationLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "transactions?page="  + currentPage, requestOptions)
    .then(response => response.text())
    .then(result => {
      setisPaginationLoading(false)
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

    let currentPage = data.selected

    fetchTransactions(currentPage)
  }

  


  return (
    <div className="p-8 pl-24 flex flex-col gap-y-12">
      <Cards transactions={transactions} users={users} searches={searches}></Cards>


      {isLoading ? (
        <div className="flex h-56 items-center justify-center">
          <ClipLoader size="50px" color="#999"></ClipLoader>
        </div>
      ) : (
        <>
        <div className="trasactions">
          <div className="w-1/2 mb-12 text-black">
            <Line options={options} data={transactionData} />

          </div>
          <p className="uppercase text-base mb-2 font-semibold">All Transactions</p>
          {isPaginationLoading ? (

            <div className="flex h-56 items-center justify-center">
              <ClipLoader size="50px" color="#999"></ClipLoader>
            </div>
            
          ) : (

            <TransactionTable transactions={transactions}></TransactionTable>

          )}
        </div>

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
  )
}

export default HomePage
