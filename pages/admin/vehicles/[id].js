import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from "react"
import { enviroment } from "../../../src/components/environment"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { ClipLoader} from "react-spinners";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { route } from "next/dist/next-server/server/router";


function CarDetail() {


    

    //Form values
    const [dateRange, setdateRange] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);

      const [isLoading, setisLoading] = useState(false)
      const [deleteIsLoading, setdeleteIsLoading] = useState(false)
      const [publishIsLoading, setpublishIsLoading] = useState(false)

      const [images, setImages] = useState([])
      const [makes , setMakes] = useState([])
      const [make , setMake] = useState("")
      const [makeIndex, setmakeIndex] = useState(null)
      const [models , setModels] = useState([])
      const [model , setModel] = useState("")
      
      const [year, setYear] = useState("")
      const [vin, setVin] = useState([])
      const [link, setLink] = useState([])
      const [name, setName] = useState("")
      const [site, setSite] = useState("")
      const [price, setPrice] = useState("")
      const [exteriorColor, setExteriorColor] = useState("")
      const [vehicleType, setVehicleType] = useState("")
      const [auctionEndTime, setAuctionEndTime] = useState("")
      const [interiorColor, setInteriorColor] = useState("")
      const [transmission, setTransmission] = useState("")
      const [odometer, setOdometer] = useState("")
      const [door, setDoor] = useState("")
      const [equipment, setEquipment] = useState("")
      const [EngineType, setEngineType] = useState("")
      const [interiorType, setInteriorType] = useState("")
      const [bodyStyle, setBodyStyle] = useState("")
      const [fuelType, setFuelType] = useState("")
      const [passengerCapacity, setPassengerCapacity] = useState("")
      const [sellerCity, setSellerCity] = useState("")
      const [description, setDescription] = useState("")
      const [zip, setZip] = useState("")
      const [bidAmount, setBidAmount] = useState("")
      const [facilitationLocation, setFacilitationLocation] = useState("")
      const [vehicleLocation, setVehicleLocation] = useState("")
      const [trucking, setTrucking] = useState([])
      const [shipping, setShipping] = useState([])
      const [photos, setPhotos] = useState([])
      const [photo, setPhoto] = useState([])
      const [viewPhoto, setViewPhoto] = useState([])
      const [selectedFiles, setSelectedFiles ] = useState([]);
      const [category, setCategory] = useState(null)



    const [editCar, seteditCar] = useState(false)
    const [carDetail, setcarDetail] = useState(null)
    const router = useRouter()
    const carVIN = router.query.id;

    useEffect(() => {
        
        getCarDetails()
        return () => {
            getCarDetails()
        }
    }, [editCar])

    useEffect(() => {
        getMakes()
        return () => {
            getMakes()
        }
    }, [])

    const getMakes = () => {
        setisLoading(true)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch(enviroment.BASE_URL + "makes", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.error == false) {
                setMakes(result.data)
                
                setisLoading(false)
            }
        })
        .catch(error => console.log('error', error));
    }

    const getCarDetails = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch(enviroment.BASE_URL + "vehicles/" + carVIN, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.error == false) {
                setcarDetail(result.data.vehicle)
                setformValues(result.data.vehicle)
            }
        })
        .catch(error => console.log('error', error));
    }

    const setformValues = (data) => {
        setSelectedFiles(data?.images)
        
        setMake(data?.make)

        setModel(data?.model)
        makes.map((make, index) => {
            if(make.name == data?.make) {
                setModels(makes[index].models)
                
            }
            return make;
        })

        setYear(data?.year)

        setExteriorColor(data?.exterior_color)

        setVehicleType(data?.vehicle_type)

        setInteriorColor(data?.interior_color)

        setTransmission(data?.transmission)

        setDoor(data?.doors)

        setEngineType(data?.EngineType)

        setInteriorType(data?.interior_type)

        setFuelType(data?.fuel_type)

        setPassengerCapacity(data?.passengerCapacity)

        setPrice(data?.price)

        setSellerCity(data?.sellerCity)

        setOdometer(data?.odometer)

        setDescription(data?.description)

        setBidAmount(data?.bidAmount)

        setZip(data?.zip)

        setFacilitationLocation(data?.facilitationLocation)

        setVehicleLocation(data?.Vehicle_location)

    }


    const selectImages = (event) => {
        // console.log(event)
    
        // event.preventDefault();
      
        // setIfImage(true)
        
        let photo1  = []
      
        const tempArr = [];
      
      
        if (event.target.files) {
          const filesArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
          setSelectedFiles((prevImages) => prevImages.concat(filesArray));
          Array.from(event.target.files).map(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
          );
        }
        
      
      
      
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
        for (var i = 0; i <  event.target.files.length && i < 5 ; i++) {
          
            photo1[i] = event.target.files.item(i)
          //   photo[i] =  URL.createObjectURL(event.target.files.item(i))
            // console.log("data ===---->first file",event.target.files.item(i))
            if(event.target.files.item(i).size > 20850309874) {
                // toast("Sorry image is too bigger then 130 KB");
            // console.log("datat size yes", event.target.files.item(i).size  )
            }else{
            
              if (event.target.files.item(i).name.match(/\.(jpg|jpeg|png|gif|JPG|jfif)$/)) {
              
                var reader = new FileReader();
            
              reader.readAsDataURL(event.target.files.item(i))
            
                reader.onload = (e) => {
                  let imgDimWarning = false;
                    //Initiate the JavaScript Image object.
                    // console.log("error",e)
                    var image = new Image();
                  
      
                
                    image.src = e.target.result;
                
                      image.onload = ()=>{
      
                              let images4 =  []
                              images4.push(image.src)
                              setPhotos([...images, ...image.src]);
                              setPhotos([...photos, ...photo1]);
      
                                // setImageError(true)   
                                setImages(images4)
                                setPhoto(photo)
                          }   
                      // }
                  }
                }else{
                // toast("Image only jpg | jpeg | png | gif");
                }
            } 
        }
    }

    const uploadImages = () => {

        document.getElementById('carImages').click();  
    
    }

    const RenderPhotos = () => {
        // console.log('source: ', source);
        return selectedFiles.map((photo,i) => {
    
          return(
            <div key={i} className="w-40 h-40 bg-gray-100">   
                <div className="relative p-1 w-full" style={{height: "90%"}} key={i}>
                    <a onClick={() => deletePhoto(i)}>
                        <i className="cursor-pointer fas fa-trash-alt text-red-500 float-right relative -top-1"></i>
                    </a>
                    {typeof(photo) === 'object' ? (
                        <img src={photo?.image_largeUrl} alt="" key={photo?.image_largeUrl} className="h-full w-full" />
                      ) : (
                        <img src={photo} alt="" className="h-full w-full" key={photo} />
                      )}
                </div> 
            </div>
          )
    
        });
    };

    const deletePhoto = (id) => {
        console.log(id)

        selectedFiles.splice(id, 1)

        // console.log(selectedFiles)

        setSelectedFiles(selectedFiles)
    }

    const submitForm = () => {

        setisLoading(true)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const data = {
            make :make,
            model:model,
            year :year,
            vin: carVIN,
            name: `${year} ${make} ${model}`,
            price: price,
            // images: selectedFiles,
            exterior_color : exteriorColor,
            vehicle_type:vehicleType,
            auctionEndTime : auctionEndTime,
            interior_color:interiorColor,
            transmission:transmission ,
            fuel_type:fuelType,
            odometer:odometer,
            doors:door,
            equipment:equipment,
            EngineType:EngineType,
            interior_type:interiorType,
            body_style:bodyStyle,
            passengerCapacity:passengerCapacity,
            sellerCity:sellerCity,
            description:description,
            company:"buylikedealers",
            dealers:true,
            Zip:zip,
            bidAmount:bidAmount,
            facilitationLocation:facilitationLocation,
            Vehicle_location:vehicleLocation,
          }

          console.log(data)
          console.log(photos)

          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
          };
      
          fetch(enviroment.BASE_URL + "vehicles/dealers/list/" + carDetail.Bvin , requestOptions)
          .then(response => response.json())
          .then(result => {
                console.log(result)
                if(result.error === false){
                    if(photos.length !== 0){
                        pushImage(result.data?.vehicle?._id)
                    } else {
                        setisLoading(false)
                        toast.success("Car Updated!");
                        setTimeout(() => {
                            seteditCar(false)
                        }, 1000);
                        
                    }
                }
              
          })
          .catch(error => console.log('error', error));
    }

    const pushImage = (data) => {


        const id = data
        console.log("photos", photos)
        
        photos.map((photo) => {
            var formdata = new FormData();
            formdata.append('file', photo)
            formdata.append('vehicles_images', true);
            formdata.append('vehicle',  id);
    
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                mode: 'no-cors'
                
            };
    
            console.log('done formData---------->', formdata );
            console.log(photo)
              
              fetch(enviroment.BASE_URL + "vehicles/uploads/image", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setisLoading(false)
                    console.log(result)
                    setTimeout(() => {
                            seteditCar(false)
                    }, 1000);
                    toast.success("Image Uploaded!");
                })
                .catch(error => console.log('error', error));

        })

  
    }

    const deleteCar = () => {
        setdeleteIsLoading(true)

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch(enviroment.BASE_URL + "vehicles/" + carDetail?._id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setdeleteIsLoading(false)
                if(result.status) {
                    toast.success("Car Deleted!");
                    setTimeout(() => {
                        router.push('/admin/vehicles')
                    }, 1000);
                }
            })
            .catch(error => console.log('error', error));
    }

    const publishCar = () => {
        setpublishIsLoading(true)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "publish": true
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(enviroment.BASE_URL + "vehicles/publish/" + carVIN, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setpublishIsLoading(false)

            if(result.error == false) {
                toast.success("Vehicle Published")
                setTimeout(() => {
                    router.push('/admin/vehicles')
                }, 1000);
            }
        })
        .catch(error => console.log('error', error));
    }

    return (
        <div className="p-8 pl-24">
        <ToastContainer />
            {!editCar ? (
                <div>
                    <div className="flex justify-end">
                        <button onClick={publishCar} type="button" className="h-10 text-sm px-6 py-2 font-semibold rounded-md bg-green-600 hover:bg-green-500 text-white">
                            {publishIsLoading ? (
                                <ClipLoader></ClipLoader>
                            ) : (
                                <>Publish Car</>
                            )}
                            
                        </button>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 border p-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div>
                                    <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                            {!carDetail?.images.length ? (
                                                <span className="text-3xl text-gray-700">No Image</span>
                                            ) : (
                                                <>
                                                {typeof(carDetail.images[0]) === 'object' ? (
                                                    <img src={carDetail.images[0]?.image_largeUrl} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={carDetail.images[0]} alt="" className="w-full h-full object-cover"/>
                                                )}
                                                </>
                                            )}
                                        </div>

                                    </div>

                                    <div className="flex -mx-2 mb-4">
                                        <template x-for="i in 4">
                                        <div className="flex-1 px-2">
                                            <button className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center">
                                            <span x-text="i" className="text-2xl"></span>
                                            </button>
                                        </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="mb-2 leading-tight tracking-tight font-semibold text-gray-800 text-xl md:text-3xl uppercase">{carDetail?.name || "No name"}</h2>
                                <p className="text-gray-500 text-sm">VIN <a href="#" className="text-indigo-600 hover:underline">{carDetail?.vin}</a></p>
                                <p className="text-gray-500 text-sm">Price <a href="#" className="text-indigo-600 hover:underline">{carDetail?.price ? `$${carDetail?.price}` : "No price yet"}</a></p>


                                <p className="text-gray-500">{carDetail?.description || "No description"}</p>

                                <div className="flex py-4 space-x-4">

                                    <button onClick={() => seteditCar(true)} type="button" className="h-10 text-sm px-6 py-2 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white">
                                        Edit Car
                                    </button>
                                    <button onClick={deleteCar} type="button" className="h-10 text-sm px-6 py-2 font-semibold rounded-md bg-red-600 hover:bg-red-500 text-white">
                                    
                                        {deleteIsLoading ? (
                                            <ClipLoader size="20px" color="#fff"></ClipLoader>
                                        ) : (
                                            <>
                                            Delete Car
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-24 mx-auto">
                            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                                <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                                
                                    <tbody>
                                        {/* <template> */}
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Make
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.make}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Model
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.model}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Year
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.year}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Vehicle Location
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.Vehicle_location}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Auction End Time
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.auctionEndTime}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Body Type
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.body_style}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Facilitation Location
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.facilitationLocation}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Doors
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.doors}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Exterior Color
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.exterior_color}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Interior Color
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.interior_color}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Interior Type
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.interior_type}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Passenger Capacity
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.passengerCapacity}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Transmission
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.transmission}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Engine Type
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.EngineType}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Vehicle Type
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.vehicle_type}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Seller City
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.sellerCity}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Odometer
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.odometer}</span>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Description
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.description}</span>
                                                </td>
                                            
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Bid Amount
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.bidAmount ? `$${carDetail?.bidAmount}` : ""}{carDetail?.bidAmount}</span>
                                                </td>
                                            
                                                <td className="border-dashed border-t border-gray-200 bg-gray-100 px-3">
                                                    <label
                                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                                        {/* <input type="checkbox" className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" /> */}
                                                        Zip
                                                    </label>
                                                </td>
                                                <td className="border-dashed border-t border-gray-200 userId">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{carDetail?.zip}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            
                                            </tr>
                                            <tr>
                                                
                                            
                                            </tr>
                                            

                                        {/* </template> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            ) : (
                <div>
                   <p className="uppercase text-base mb-2 font-semibold">Edit Car</p>
                   <form className="border border-gray-200 p-5 editcar">
                        <div className="flex gap-x-10 mb-10">
                            <div className="cursor-pointer hover:border-gray-300 w-40 h-40 group gap-y-5 border border-gray-200 p-5 flex flex-col justify-center items-center" onClick={uploadImages}>
                                <label className="group-hover:text-blue-600 cursor-pointer">Upload Images</label>
                                <div>
                                    <svg className="w-6 h-6 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                </div>
                                <input type="file" id="carImages" onChange={(e) => selectImages(e)} multiple className="hidden" />
                            </div>
                            <div className="flex-1">
                            {!selectedFiles.length ? (
                                <div className="flex flex-wrap gap-2">
                                    <div className="w-40 h-40 bg-gray-100"></div>
                                    <div className="w-40 h-40 bg-gray-100"></div>
                                    <div className="w-40 h-40 bg-gray-100"></div>
                                    <div className="w-40 h-40 bg-gray-100"></div>
                                    <div className="w-40 h-40 bg-gray-100"></div>
                                </div>

                            ) : (
                                <div className="flex flex-wrap gap-2"><RenderPhotos /></div>

                            )}
                            </div>
                        </div>

                        <hr />

                        <div className="grid grid-cols-4 gap-4 mt-10">
                            <div className="">
                                <label>Make</label>
                                <select name="make" id="make" value={make} onChange={(e) => {
                                    setMake(e.target.value)
                                    const index = makes.findIndex(carMake => carMake.name === e.target.value)
                                    setModels(makes[index]?.models)
                                    
                                }}>
                                    <option value="">Select Make</option>
                                    {makes.map((make, index) => (
                                        <option key={index} value={make.name}>{make.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="">
                                <label>Model</label>
                                <select name="model" id="model" value={model} onChange={(e) => setModel(e.target.value)}>
                                    {isLoading ? (
                                        <option value="">Loading...</option>
                                    ) : (
                                        <>
                                    <option value="">Select Model</option>
                                    {models?.map((model, index) => (
                                        <option key={index} value={model.name}>{model.name}</option>
                                    ))}

                                        </>
                                    )}
                                </select>
                            </div>

                            <div className="">
                                <label>Year</label>
                                <select name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                                <option value="">Select Year</option>
                                    {yearList.map((year, index) => (
                                        <option key={index} value={year.year}>{year.year}</option>

                                    ))}
                                </select>
                            </div>

                            <div className="">
                                <label>Exterior Color</label>
                                <select name="exterior_color" id="exterior_color" value={exteriorColor} onChange={(e) => setExteriorColor(e.target.value)}>
                                    <option value="">Exterior Color</option>
                                    {
                                        ExteriorColors.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    } 
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-10">
                            <div className="">
                                <label>Vehicle Type</label>
                                <select name="vehicle_type" id="vehicle_type" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                                    <option value="">Vehicle Type</option>
                                    {
                                        VehicletypeList.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    } 
                                </select>
                            </div>

                            <div className="">
                                <label>Interior Color</label>
                                <select name="model" id="model" value={interiorColor} onChange={(e) => setInteriorColor(e.target.value)}>
                                    <option value="">Interior Color</option>
                                    {
                                        interiorColorList.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    } 
                                </select>
                            </div>

                            <div className="">
                                <label>Transmission</label>
                                <select name="year" id="year" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                                    <option value="">Transmission</option>
                                    {
                                        setTransmissionList.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    } 
                                </select>
                            </div>

                            <div className="">
                                <label>Doors</label>
                                <select name="exterior_color" id="exterior_color" value={door} onChange={(e) => setDoor(e.target.value)}>
                                    <option value="">Doors</option>
                                    {
                                        DoorList.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-10">
                            <div className="">
                                <label>Engine Type</label>
                                <select name="vehicle_type" id="vehicle_type" value={EngineType} onChange={(e) => setEngineType(e.target.value)}>
                                    <option value="">Engine Type</option>
                                    {
                                        EngineTypeList.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    } 
                                </select>
                            </div>

                            <div className="">
                                <label>Interior Type</label>
                                <select name="model" id="model" value={interiorType} onChange={(e) => setInteriorType(e.target.value)}>
                                    <option value="">Interior Type</option>
                                    {
                                        InteriorTypeList.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="">
                                <label>Fuel Type</label>
                                <select name="year" id="year" value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                                    <option value="">Fuel Type</option>
                                    {
                                        FuelTypeList.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    } 
                                </select>
                            </div>

                            <div className="">
                                <label>Passenger Capacity</label>
                                <select name="exterior_color" id="exterior_color" value={passengerCapacity} onChange={(e) => setPassengerCapacity(e.target.value)}>
                                    <option value="">Passenger Capacity</option>
                                    {
                                        PassengerCapacityList.map((item, index) => (
                                            <option key={index} value={item.data}>{item.data}</option>
                                        ))
                                    } 
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
                            <div>
                                <label>Trip Start</label>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setdateRange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateRange}
                                />
                            </div>

                            <div className="flex flex-col gap-y-10">
                                <div>
                                    <label>Price</label>
                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="">
                                    <label>Odometer</label>
                                    <input type="number" value={odometer} onChange={(e) => setOdometer(e.target.value)} />
                                </div>
                                <div className="">
                                    <label>Bid Amount</label>
                                    <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
                                </div>
                                <div className="">
                                    <label>Facilitation Location</label>
                                    <input type="text" value={facilitationLocation} onChange={(e) => setFacilitationLocation(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-10">
                                <div>
                                    <label>Seller City</label>
                                    <input type="text" value={sellerCity} onChange={(e) => setSellerCity(e.target.value)} />
                                </div>
                                <div className="">
                                    <label>Description</label>
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="">
                                    <label>Zip</label>
                                    <input type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
                                </div>
                                <div className="">
                                    <label>Vehicle Location</label>
                                    <input type="text" value={vehicleLocation} onChange={(e) => setVehicleLocation(e.target.value)} />
                                </div>
                            </div>
                            
                        </div>

                        <hr />

                        <div className="w-full m-auto text-center mt-10"> 
                            <button onClick={submitForm} type="button" className="bg-red-700 outline-none text-white mt-6 rounded-md text-sm px-4 py-2">
                            
                            {isLoading ? (
                                <ClipLoader color="#fff" size="20px"></ClipLoader>
                            ) : (
                                <>Submit</>
                            )}
                            </button>
                        </div>
                   </form>
                </div>
            )}
        </div>
    )
}


const ExteriorColors = [
        
    { data : "Beige"},
    { data : "Black"},
    { data : "Blue"},
    { data : "Brown"},
    { data : "Burgundy"},
    { data : "Gray"}, 
    { data : "Green"},
    { data : "Off-white"},
    { data : "Orange"},
    { data : "Red"},
    { data : "Silver"},
    { data : "White"},
    { data : "Yellow"},
    { data : "Not Specified"},
    
  
]

const VehicletypeList= [
    { data : "Commercial"},
    { data : "Passenger"},
    { data : "Specialty"},
    { data : "Not Specified"}
  
]
  
const   PassengerCapacityList = [
    { data : "1"},
    { data : "2"},
    { data : "3"},
    { data : "4"},
    { data : "5"},
    { data : "6"},
    { data : "7"},
    { data : "8"},
    { data : "9"},
    { data : "10"},
    { data : "11"},
    { data : "12"},
    { data : "13"},
    { data : "14"},
    { data : "15"}
]
  
const DoorList= [
    { data : "1"},
    { data : "2"},
    { data : "3"},
    { data : "4"},
    { data : "5"},
    { data : "6"},
    { data : "7"}
  
]

const InteriorTypeList = [
    { data : "Cloth"},
    { data : "Leather"},
    { data : "Vinyl"},
    { data : "Not Specified"},
]
  
const BodyStyleList = [
     
]
const FuelTypeList = [
    { data : "Alternative/Hybrid"},
    { data : "Diesel"},
    { data : "Electric"},
    { data : "Ethanol"},
    { data : "Flex Fuel Capability"},
    { data : "Gas/Electric Hybrid"},
    { data : "Gasoline"},
    { data : "Hybrid"},
    { data : "Not Specified"},
]
  
  
const interiorColorList = [
  
    { data : "Beige"},
    { data : "Black"},
    { data : "Blue"},
    { data : "Brown"},
    { data : "Burgundy"},
    { data : "Gray"}, 
    { data : "Green"},
    { data : "Off-white"},
    { data : "Orange"},
    { data : "Red"},
    { data : "Silver"},
    { data : "White"},
    { data : "Yellow"},
    { data : "Not Specified"},
]
  
const setTransmissionList = [
    { data : "Automatic"},
    { data : "CVT"},
    { data : "Manual"},
    { data : "Not Specified"}
  
]
  
  
const EngineTypeList = [
    { data : "Automatic"},
    { data : "CVT"},
    { data : "Manual"},
    { data : "Not Specified"}
  
]
  
const yearList = [
          
    { year : "2000"},
    { year : "2001"},
    { year : "2002"},
    { year : "2003"},
    { year : "2004"},
    { year : "2005"},
    { year : "2006"},
    { year : "2007"},
    { year : "2008"},
    { year : "2009"},
    { year : "2010"},
    { year : "2011"},
    { year : "2012"},
    { year : "2013"},
    { year : "2014"},
    { year : "2015"},
    { year : "2016"},
    { year : "2017"},
    { year : "2018"},
    { year : "2019"},
    { year : "2020"},
    { year : "2021"},
    { year : "2022"},
    { year : "2023"},
  
];

export default CarDetail
