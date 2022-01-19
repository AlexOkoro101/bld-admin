import { useEffect, useState } from "react"
import { enviroment } from "../../../src/components/environment"
// import UsersTable from "../../src/components/tables/user-table"
import axios from 'axios';
import Resizer from "react-image-file-resizer";
import { useRouter } from 'next/router'
 
import FileBase64 from 'react-file-base64';

function Vehicies() {
  //ROuter
  const router = useRouter()


  var numberFormatter = new Intl.NumberFormat();


  const [users, setusers] = useState(null)
  const [images, setImages] = useState([])
  const [makes , setMakes] = useState([])
  const [make , setMake] = useState(null)
  const [models , setModels] = useState([])
  const [model , setModel] = useState(null)
  
  const [year, setYear] = useState([])
  const [vin, setVin] = useState([])
  const [link, setLink] = useState([])
  const [name, setName] = useState(null)
  const [site, setSite] = useState(null)
  const [price, setPrice] = useState(null)
  // const [exteriorColors, setExteriorColors] = useState([])
  const [exteriorColor, setExteriorColor] = useState(null)
  const [vehicleType, setVehicleType] = useState(null)
  const [auctionEndTime, setAuctionEndTime] = useState(null)
  const [interiorColor, setInteriorColor] = useState(null)
  const [transmission, setTransmission] = useState(null)
  const [odometer, setOdometer] = useState(null)
  const [driveTrain, setDriveTrain] = useState(null)
  const [door, setDoor] = useState(null)
  const [equipment, setEquipment] = useState(null)
  const [EngineType, setEngineType] = useState(null)
  const [interiorType, setInteriorType] = useState(null)
  const [bodyStyle, setBodyStyle] = useState(null)
  const [fuelType, setFuelType] = useState(null)
  const [passengerCapacity, setPassengerCapacity] = useState(null)
  const [sellerCity, setSellerCity] = useState(null)
  const [description, setDescription] = useState(null)
  const [zip, setZip] = useState(null)
  const [bidAmount, setBidAmount] = useState(null)
  const [facilitationLocation, setFacilitationLocation] = useState(null)
  const [vehicleLocation, setVehicleLocation] = useState(null)
  // const [images, setImages] = useState([])
  const [trucking, setTrucking] = useState([])
  const [shipping, setShipping] = useState([])
  const [photos ,setPhotos] = useState([])
  const [photo, setPhoto] = useState([])
  const [viewPhoto, setViewPhoto] = useState([])
  const [ selectedFiles, setSelectedFiles ] = useState([]);
  const [category, setCategory] = useState(null)
  const urlLocal = "http://localhost:4000"

  const [dealerCars, setdealerCars] = useState(null);

  // useEffect(() => {
  //   getUsers()
  //   console.log("data year ---------->",list )
  //   return () => {
  //     getUsers()
  //   }
  // }, [])
  
 

  // const getUsers = () => {
  //   var requestOptions = {
  //     method: 'GET',
  //     // redirect: 'follow'
  //   };
    
  //   fetch(enviroment.BASE_URL+"makes", )
  //     .then(response => response.json())
  //     .then(result => {
  //       // const item = JSON.parse(result)
  //       console.log("makes -------------->",result)
  //       setMakes(result.data)
     

  //     })
  //     .catch(error => console.log('error', error));
  // }
  useEffect(() => {
    getDealerCars()
    return () => {
      getDealerCars()
    }
  }, [])

  const getDealerCars = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "vehicles/dealers/list", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log("cars", result)
      if(result.error == false) {
        setdealerCars(result.data)
      }
    })
    .catch(error => console.log('error', error));
  }



 


 
const selectImages = (event) => {
    
  event.preventDefault();

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

  const renderPhotos = (source) => {
    console.log('source: ', source);
    return source.map((photo,i) => {

      return(<div className="newproduct-a">   <div  key={i} style={{position:"relative",padding:"4px"}}>  <a onClick={() => this.deletePhoto(i)}><i className="fas fa-trash-alt"  style={{color:"red",float:"right",position:"relative",top:"-5px"}}></i></a><img src={photo} alt="" className="" width="150" key={photo} /></div> </div>
      )

    });
  };
     
  const showMyImage=(fileInput)=> {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var imageType = /image.*/;
      if (!file.type.match(imageType)) {
        continue;
      }
      var img = document.getElementById("thumbnail");
      img.file = file;
      var reader = new FileReader();
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result;
        };
      })(img);
      reader.readAsDataURL(file);
    }
  }


  const  handleTerm = (e) => {
    console.log("----=--------->",e.target.value )     
    setMake(e.target.value) 
    // let result = makes.map(a => a.foo);
    // let result  =  makes.map(item => item.name == e.target.value )
    let result =  makes.find(x => x.name ===  e.target.value )
    console.log("--result--=--------->",result.models )  

    setModels(result.models)

  }


  const  handleModle = (e) => {
    console.log("----=--------->",e.target.value )     
    setModel(e.target.value) 
    // let result = makes.map(a => a.foo);
    // let result  =  makes.map(item => item.name == e.target.value )
    // let result =  makes.find(x => x.name ===  e.target.value )
    // console.log("--result--=--------->",result.models )  

    // setModle(result.models)

  }

  const  handleYear = (e) => {
    console.log("----=--------->",e.target.value )     
    setYear(e.target.value) 
    setName(make +"  " + model +" " + year)


  }

  const  handleExterior = (e) => {
    console.log("----=--------->",e.target.value )     
    setExteriorColor(e.target.value) 
    
  }
  const  handleVehicle = (e) => {
    console.log("----=--------->",e.target.value )     
    setVehicleType(e.target.value) 
    
  }

  const handleInterior = (e) => {
    console.log("----=--------->",e.target.value )     
    setInteriorColor(e.target.value) 
    
  }

  const handleTransmission = (e) => {
    console.log("----=--------->",e.target.value )     
    setTransmission(e.target.value) 
    
  }

  const handleDoors = (e) => {
    console.log("----=--------->",e.target.value )     
    setDoor(e.target.value) 
    
  }

  const handleEngineType  = (e) => {
    console.log("----=--------->",e.target.value )     
    setEngineType(e.target.value) 
    
  }

  const handleInteriorType = (e) => {
    console.log("----=--------->",e.target.value )     
    setInteriorType(e.target.value) 
    
  }
  const handleFuelTypeList = (e) => {
    console.log("----=--------->",e.target.value )     
    setFuelType(e.target.value) 
    
  }

  const   handlePassengerCapacity  = (e) => {
    console.log("----=--------->",e.target.value )     
    setPassengerCapacity (e.target.value) 
    
  }

  const uuidv4=()=> {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(3)
    );
  }

  const random = (length = 17) => {
    return Math.random().toString(16).substr(2, length) + Math.random().toString(16).substr(2, length);
  };

  const submitData = (e) =>{

    e.preventDefault()

    console.log("-------input ===------>",make,model,year,vin,name,price,exteriorColor,vehicleType
    ,auctionEndTime,interiorColor,transmission,odometer,driveTrain,door,equipment,EngineType,interiorType,
    bodyStyle,fuelType,passengerCapacity,sellerCity,description,zip,bidAmount,facilitationLocation,vehicleLocation
    ) 

  
    const data = {
      make :make,
      model:model,
      year :year,
      vin: "B" + random()+ random(),
      name: name,
      price: parseInt(price),
      exterior_color : exteriorColor,
      vehicle_type:vehicleType,
      auctionEndTime : auctionEndTime,
      interior_color:interiorColor,
      transmission:transmission ,
      fuel_type:fuelType,
      odometer:odometer,
      // measure:driveTrain
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

    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type':'application/json','Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };

    fetch(urlLocal+"/vehicles/upload/new" , requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result.error === false){
            if(photos.length !== 0){
                pushImage(result.data)
                }
            }
        
    })
    .catch(error => console.log('error', error));
  }
   
 
  const pushImage=(data) => {
      // const id = "count5353905930"
      console.log('done image----===00------->',  photos, "data----=---->" );
      const id = data._id
      const uploaders = photos.map(image => {
        const formData = new FormData();

        console.log('done image- let me see-- ->', image );
        formData.append('file', image );
        formData.append('filename',image.name);
        formData.append('vehicles_images', true);
        formData.append('vehicle',  id);
      
          console.log('done formData---------->', formData );
          // Make an AJAX upload request using Axios
          return  axios.post(urlLocal+"/vehicles/uploads/image", formData,  {
            
              headers: {
              'content-type': 'multipart/form-data',
              
              // 'x-access-token': Auth.getToken()
              }
            }
          )
      .then(response => {
          console.log("response ---------------------->", response)
          if(response.error === true){
            // console.log("response yes", response.data)
            // setBodCut(false)
            // setSaveLoader(false)
          // toast("Save successful ")
          
        }else{
          
          }
            
          })
          });
      axios.all(uploaders).then(() => {

      }).catch(err => 
      console.log("response yes", ));

  }
  const createCar = () => {
    const vin = "B" + random()


    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(enviroment.BASE_URL + "vehicles/check-vin/" + vin, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.error == false) {
          router.push('/admin/vehicles/' + vin)
        }
      })
      .catch(error => console.log('error', error));
  }








  







  return (
    <div className="p-8 pl-24">
      <div className="users overflow-hidden">
        <p className="uppercase text-base mb-2 font-semibold float-left">vehicles</p>
        <p className="uppercase text-base mb-2 font-semibold float-right" onClick={createCar}>                  
          <button className="py-1 px-4 text-xs rounded-md bg-blue-500 text-white mr-1"><i className="fa fa-plus"></i> Add Car</button>
        </p>
 
      </div>

      <div className="flex flex-wrap">
      {dealerCars?.length ? (
        <>
          {dealerCars?.slice(0).reverse().map((car, index) => (
            <div key={index} className="bg-white inline-block shadow-md border border-gray-200 rounded-lg w-3/12 m-5 dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  {!car.images.length ? (
                    <div className="focus:outline-none w-full rounded-t-lg h-24 md:h-48 bg-gray-100 flex items-center justify-center">No Image</div>
                  ) : (
                    <div className="focus:outline-none w-full rounded-t-lg h-24 md:h-48 bg-gray-100 flex items-center justify-center">
                      {typeof(car.images[0]) === 'object' ? (
                        <img src={car.images[0]?.image_largeUrl} alt="" />
                      ) : (
                        <img src={car.images[0]} alt="" />
                      )}
                    </div>
                  )}
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="text-black font-semibold text-sm tracking-tight dark:text-white uppercase">{`${car.make} ${car.model}` || "No name"}</h5>
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
                    <p className="font-normal text-gray-500 mb-3 dark:text-gray-400 text-base">{car.price ? `$${numberFormatter.format(car.price)}` : "Price"}</p>
                    <button style={{fontSize: "10px"}} onClick={() => router.push('/admin/vehicles/' + car.vin)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg px-5 py-1 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

     
    </div>
  )
}




export default Vehicies

