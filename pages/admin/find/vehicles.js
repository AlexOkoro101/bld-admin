import { useEffect, useState } from "react"
import { enviroment } from "../../../src/components/environment"
import { useRouter } from 'next/router'
import { ClipLoader} from "react-spinners";
 

function Vehicies() {
  //ROuter
  const router = useRouter()


  var numberFormatter = new Intl.NumberFormat();

  const [loading, setloading] = useState(false)
  const [noValue, setnoValue] = useState(false)
  const [dealerCars, setdealerCars] = useState(null);

  
  useEffect(() => {
    getSearchValue()
    return () => {
        getSearchValue()
    }
  }, [])

  const getSearchValue = () => {
    const searchValue = localStorage.getItem('searchValue')
    if(searchValue) {
        getDealerCars(searchValue)

    } else {
      setnoValue(true)
    }
  }

  const getDealerCars = (searchValue) => {
    setloading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "vehicles/car/search?search=" + searchValue, requestOptions)
    .then(response => response.json())
    .then(result => {
      setloading(false)
      console.log("cars", result)
      if(result.status == "true") {
        setdealerCars(result.data)
      }
    })
    .catch(error => console.log('error', error));
  }



  return (
    <div className="p-8 pl-24">

      <>
      {loading ? (
        <div className="flex h-56 items-center justify-center">
          <ClipLoader size="50px" color="#999"></ClipLoader>
        </div>
      ) : (
          <>
            <div className="transactions-card bg-pink-600 text-white mb-8 w-52 p-4 uppercase">
                <p className="font-semibold">Vehicles Found</p>
                <p className="text-sm">{dealerCars?.length.toLocaleString()}</p>
            </div>
            <p className="uppercase text-base mb-2 font-semibold">vehicles</p>
        
            
            <div className="flex flex-wrap">
            {dealerCars?.length ? (
                <>
                {dealerCars?.map((car, index) => (
                    <div key={index} className="bg-white inline-block shadow-md relative border border-gray-200 rounded-lg w-3/12 mt-5 mb-5 mr-5 dark:bg-gray-800 dark:border-gray-700">
                    {car.publish && (
                        <div className="absolute right-0 bg-green-600">
                        <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                    )}
                    <a href="#">
                        {!car?.images?.length ? (
                            <div className="focus:outline-none w-full rounded-t-lg h-24 md:h-48 bg-gray-100 flex items-center justify-center">No Image</div>
                        ) : (
                            <div className="focus:outline-none w-full rounded-t-lg h-24 md:h-48 bg-gray-100 flex items-center justify-center">
                            {typeof(car.images[0]) === 'object' ? (
                                <img src={car.images[0]?.image_largeUrl} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <img src={car.images[0]} alt="" className="h-full w-full object-cover" />
                            )}
                            </div>
                        )}
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="text-black font-semibold text-sm tracking-tight dark:text-white uppercase">{car.make && car.model ? (`${car.make} ${car.model}`) : "No name"}</h5>
                        </a>
                        <div className="flex gap-x-2 font-medium text-sm text-gray-500">
                            <p>{car.year || "year"}</p>
                            <p>{car.odometer ? (`${numberFormatter.format(car.odometer)} miles`) : "miles"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-normal text-sm text-gray-500">{car.pickupLocation || "Location"}</p>
                            <p style={{fontSize: "10px"}} className="font-normal text-gray-500">
                            {car.auctionEndTime ? (
                            new Date(car?.auctionEndTime).toLocaleDateString("en-NG",
                                        {
                                            year: "numeric",
                                            day: "numeric",
                                            month: "long",
                                        }
                                    )
                            ) : "auction date"}
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="flex flex-col">
                            <p className="font-normal text-gray-500 dark:text-gray-400 text-xs">BUY NOW {car.buyNowPrice ? `$${numberFormatter.format(car.buyNowPrice)}` : "N/A"}</p>
                            <p className="font-normal text-gray-500 dark:text-gray-400 text-xs">MMR {car.mmrPrice ? `$${numberFormatter.format(car.mmrPrice)}` : "N/A"}</p>
                            </div>
                            <button style={{fontSize: "10px"}} onClick={() => router.push('/admin/vehicles/' + car._id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg px-5 py-1 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                View
                                
                            </button>

                        </div>
                    </div>
                    </div>

                ))}
                </>

            ) : (
                <>
                <p className="mt-10">No cars yet</p>
                </>
            )}

            </div>
        </>
      )}

      </>

     
    </div>
  )
}




export default Vehicies

