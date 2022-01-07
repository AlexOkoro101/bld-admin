import { useEffect } from "react"
import { useState } from "react"
import { enviroment } from "../../src/components/environment"
import UserSearch from "../../src/components/tables/user-search"

function Search() {
    const [searches, setsearches] = useState(null)


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
              setsearches(result.data)
            }
          })
          .catch(error => console.log('error', error));
    }
    return (
        <div className="p-8 pl-24">
            <div className="search">
                <p className="uppercase text-base mb-2 font-semibold">Top Searches</p>
                <UserSearch searches={searches}></UserSearch>
            </div>
        </div>
    )
}

export default Search
