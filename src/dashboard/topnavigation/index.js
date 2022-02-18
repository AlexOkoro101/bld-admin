import { useEffect, useRef, useState } from "react"
import { useToggle } from '../provider/context';
import { BellIcon } from '@heroicons/react/outline';
import { useRouter } from "next/router";
import { ClipLoader} from "react-spinners";
export default function TopNavigation({ authScreen }) {
  const { toggle } = useToggle();
  const [token, settoken] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [searchDropdown, setsearchDropdown] = useState(false)
  const [searchValue, setsearchValue] = useState("")
  const router = useRouter()
  const dropdownRef = useRef(null);


  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('user'))
    const newSearchValue = localStorage.getItem('searchValue')
    setsearchValue(newSearchValue)

    console.log(item);
    settoken(item?.userToken)
  }, [])

  const logout = () => {
    window.localStorage.clear('user')
    setisLoading(true)
    setTimeout(() => {
      router.reload()
      setisLoading(false)
    }, 1000);

  }

  const focusFunction = (e) => {
    // console.log(e.target.value)
    setsearchDropdown(true)
  }


  const fetchUser = () => {
    window.localStorage.setItem('searchValue', searchValue)
    
    if(router.pathname == "/admin/find/users") {
      router.reload()
    } else {
      router.push('/admin/find/users')
    }
    setsearchDropdown(false)
    // setsearchValue("")
  }

  const fetchTransaction = () => {
    window.localStorage.setItem('searchValue', searchValue)
    
    if(router.pathname == "/admin/find/transactions") {
      router.reload()
    } else {
      router.push('/admin/find/transactions')
    }
    setsearchDropdown(false)
    // setsearchValue("")
  }

  const fetchVehicle = () => {
    window.localStorage.setItem('searchValue', searchValue)
    
    if(router.pathname == "/admin/find/vehicles") {
      router.reload()
    } else {
      router.push('/admin/find/vehicles')
    }
    setsearchDropdown(false)
    // setsearchValue("")
  }

  const fetchCollection = () => {
    window.localStorage.setItem('searchValue', searchValue)
    
    if(router.pathname == "/admin/find/collections") {
      router.reload()
    } else {
      router.push('/admin/find/collections')
    }
    setsearchDropdown(false)
    // setsearchValue("")
  }

  function closeDropdown(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          event.target.matches("#data-dropdown-toggle, #data-dropdown-toggle *")
        ) {
          return;
        }
        if (ref.current && !ref.current.contains(event.target)) {
          // alert(navDropdown)
          setsearchDropdown(false);
        } else {
          // setsearchDropdown(true);
        }
      }

      // Bind the event listener
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        window.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  closeDropdown(dropdownRef);

  return (
    <header
      className={
        authScreen === true
          ? 'h-20 w-full bg-white items-center relative z-10 pl-20 '
          : 'h-20 w-full bg-white items-center relative z-10 '
      }
    >
      <div className="flex flex-center shadow-lg flex-col h-full justify-center mx-auto relative px-3 text-white z-10">
        {authScreen === false ? (
          <div className="flex items-center justify-between  pl-1 md:pl-20 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
            <div className="flex group h-full items-center relative w-12">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                onClick={toggle}
                className="text-4xl ml-5 text-black focus:outline-none"
              >
                &#8801;
              </button>
            </div>
            <div className="flex w-5/6 items-center justify-between">
              <div className="container  flex left-0 relative w-3/4">
                <div className="group hidden items-center ml-8 relative w-full md:flex lg:w-72">
                  <div className="absolute  cursor-pointer flex items-center justify-center h-10 p-3 pr-2 text-gray-500 text-sm uppercase w-auto sm:hidden">
                    <svg
                      fill="none"
                      className="h-5 relative w-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <svg
                    className="absolute fill-current h-4 hidden left-0 ml-4 pointer-events-none text-gray-500 w-4 group-hover:text-gray-400 sm:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                  </svg>
                  <input
                    ref={dropdownRef}
                    type="text"
                    className="bg-white block  border-2 border-gray-700 pl-10 py-1.5 pr-4  rounded-2xl text-black w-full  focus:outline-none "
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setsearchValue(e.target.value)}
                    onKeyUp={(e) => focusFunction(e)}
                  
                  />
                  {searchDropdown && (
                  <div className="search-dropdown" id="data-dropdown-toggle">
                    <div className="flex flex-col">
                        <p onClick={() => fetchTransaction()} className="px-2 py-4 border-b text-gray-700 text-base cursor-pointer hover:bg-gray-50">Search for <b>{searchValue}</b> in <b>Transactions</b></p>
                        <p onClick={() => fetchUser()} className="px-2 py-4 border-b text-gray-700 text-base cursor-pointer hover:bg-gray-50">Search for <b>{searchValue}</b> in <b>Users</b></p>
                        <p onClick={() => fetchVehicle()} className="px-2 py-4 border-b text-gray-700 text-base cursor-pointer hover:bg-gray-50">Search for <b>{searchValue}</b> in <b>Vehicles</b></p>
                        <p onClick={() => fetchCollection()} className="px-2 py-4 border-b text-gray-700 text-base cursor-pointer hover:bg-gray-50">Search for <b>{searchValue}</b> in <b>Collections</b></p>
                    </div>
                  </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
                <a href="#" className="block pr-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </a>
                <a href="#" className="block pr-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
                <a href="#" className="block pr-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </a>
                <a href="#" className="block relative">
                  <BellIcon className="h-6 w-6 text-black" />
                </a>
                {token && (
                  <button  onClick={() => logout()} className="bg-red-700 text-white ml-4 rounded-md text-sm px-3 py-1">
                          
                  {isLoading ? (
                    <ClipLoader color="#fff" size="20px"></ClipLoader>
                  ) : (
                    <>Logout</>
                  )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-black"></div>
        )}
      </div>
    </header>
  );
}
