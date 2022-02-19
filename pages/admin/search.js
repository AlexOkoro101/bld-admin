import { useEffect } from "react"
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import { enviroment } from "../../src/components/environment"
import UserSearch from "../../src/components/tables/user-search"
import { ClipLoader} from "react-spinners";

function Search() {
    const [isLoading, setisLoading] = useState(false)
    const [isPaginationLoading, setisPaginationLoading] = useState(false)
    const [searches, setsearches] = useState(null)
    const [totalPage, settotalPage] = useState(0)

    useEffect(() => {
        getSearches()
        return () => {
          getSearches()
        }
    }, [])


    const getSearches = () => {
      setisLoading(true)
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(enviroment.BASE_URL + "search", requestOptions)
          .then(response => response.json())
          .then(result => {
            setisLoading(false)
            console.log(result)
            if(result.error == false) {
              setsearches(result)
              settotalPage(Math.round(result.total/result.pageSize))
            }
          })
          .catch(error => console.log('error', error));
    }

    const fetchSearches = (currentPage) => {
      setisPaginationLoading(true)
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(enviroment.BASE_URL + `search?page=${currentPage}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setisPaginationLoading(false)
            console.log(result)
            if(result.error == false) {
              setsearches(result)
              // settotalPage(Math.round(result.total/result.pageSize))
            }
          })
          .catch(error => console.log('error', error));
    }

    const handlePageChange = (data) => {
      console.log(data.selected)
  
      let currentPage = data.selected
  
      fetchSearches(currentPage)
    }
    return (
        <>
        {isLoading ? (
          <div className="flex h-56 items-center justify-center">
            <ClipLoader size="50px" color="#999"></ClipLoader>

          </div>
        ) : (
          <>
          <div className="p-8 pl-24">
              <div className="users-card bg-indigo-600 text-white w-52 p-4 mb-8 uppercase">
                  <p className="font-semibold">Total Users</p>
                  <p className="text-sm">{searches?.total.toLocaleString()}</p>
              </div>
              <div className="search">
                  <p className="uppercase text-base mb-2 font-semibold">Top Searches</p>
                  {isPaginationLoading ? (
                    <div className="flex h-56 items-center justify-center">
                      <ClipLoader size="50px" color="#999"></ClipLoader>

                    </div>
                  ) : (
                      <UserSearch searches={searches}></UserSearch>
                  )}
              </div>
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

        </>
    )
}

export default Search
