import { useEffect, useState } from "react"
import { enviroment } from "../../../src/components/environment"
// import UsersTable from "../../src/components/tables/user-table"
import axios from 'axios';
import Resizer from "react-image-file-resizer";
 
import FileBase64 from 'react-file-base64';

function Vehicies() {
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

  useEffect(() => {
    getUsers()
    console.log("data year ---------->",list )
    return () => {
      getUsers()
    }
  }, [])

  const getUsers = () => {
    var requestOptions = {
      method: 'GET',
      // redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL+"makes", )
      .then(response => response.json())
      .then(result => {
        // const item = JSON.parse(result)
        console.log("makes -------------->",result)
        setMakes(result.data)
     

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

    return(<div class="newproduct-a">   <div  key={i} style={{position:"relative",padding:"4px"}}>  <a onClick={() => this.deletePhoto(i)}><i class="fas fa-trash-alt"  style={{color:"red",float:"right",position:"relative",top:"-5px"}}></i></a><img src={photo} alt="" className="" width="150" key={photo} /></div> </div>
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
  return Math.random().toString(16).substr(2, length);
};

const submitData = (e) =>{

  e.preventDefault()

    console.log("-------input ===------>",make,model,year,vin,name,price,exteriorColor,vehicleType
    ,auctionEndTime,interiorColor,transmission,odometer,driveTrain,door,equipment,EngineType,interiorType,
    bodyStyle,fuelType,passengerCapacity,sellerCity,description,zip,bidAmount,facilitationLocation,vehicleLocation
    ) 

 
    const data ={
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
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':'application/json','Access-Control-Allow-Origin': '*',
        //  'Authorization': Auth.getToken(),  
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
     console.log("response yes", )

);

}








  







  return (
    <div className="p-8 pl-24">
      {
        console.log("adding images to local data-------->",viewPhoto)
      }
      <div className="users">
      <p className="uppercase text-base mb-2 font-semibold " style={{float:"right"}}>                  <button className="py-1 px-4 text-xs rounded-md bg-blue-500 text-white mr-1"><i class="fas fa-plus"></i></button></p>
        <p className="uppercase text-base mb-2 font-semibold">vehicles</p>
 
      </div>
      <div>
          <div className="newproduct-wrapper">                          
          {/* {
            
                viewPhoto.map((url, i) => (
                  <div class="newproduct-a">
                  
                    <a onClick={() => this.deletePhoto(i)}><i class="fas fa-trash-alt"  style={{color:"red",float:"right",position:"relative",top:"30px"}}></i></a>
                    <div  key={i} style={{position:"relative",padding:"4px"}}>
                        <img src={url} className="" width="150"
                        alt="not available"/>
                    
                    </div>
                  </div>
                ))
          } */}
            <div className="result">{renderPhotos(selectedFiles)}</div>
                 
                    <input type="file" 
                        id="file" 
                        onChange={selectImages}
                        multiple hidden/>
                        <label for="file" >
                        <div class="newproduct-a" >
                            <br/>
                            <br/>
                        <i class="fas fa-camera" style={{fontSize:"340%",textAlign:"center",position:"relative",bottom:"13px",color:"#D80739"}} ></i> <br/>
                        </div>   
                     </label>
               
            </div>
         
            <button  onClick={pushImage}>click me</button>

            <div className="vehicle-body">
                <div class="vehicle-sub">
                   <div className="vehicle-input"> 
                   <div class="input-div">
                      <div>
                        <div class="select">
                              <select onChange={handleTerm}  value={make} >
                                  <option selected>Make</option>
                                  {
                                      makes.map(item => (
                                          <option value={item.name}>{item.name}</option>
                                      ))
                                  } 
                              
                                </select>
                          </div>
                      </div>
                  </div>
                   </div>
                   <div className="vehicle-input">
                   <div class="input-div">
                      <div>
                        <div class="select">
                              <select onChange={handleModle}  value={model} >
                                  <option selected>Model</option>
                                  {
                                      models.map(item => (
                                          <option value={item.name}>{item.name}</option>
                                      ))
                                  } 
                              
                                </select>
                          </div>
                      </div>
                  </div>

                   </div>
                   <div className="vehicle-input">
                      <div class="input-div">
                          <div>
                            <div class="select">
                                  <select onChange={handleYear}  value={year} >
                                      <option selected>Years</option>
                                      {
                                          list.map(item => (
                                              <option value={item.year}>{item.year}</option>
                                          ))
                                      } 
                                  
                                    </select>
                              </div>
                          </div>
                      </div>
                   </div>
                </div> 

                <div class="vehicle-sub">
                   <div className="vehicle-input"> 
                      <div class="input-div">
                            <div>
                              <div class="select">
                                    <select onChange={handleExterior}  value={exteriorColor} >
                                        <option selected>Exterior Color</option>
                                        {
                                            ExteriorColors.map(item => (
                                                <option value={item.data}>{item.data}</option>
                                            ))
                                        } 
                                    
                                      </select>
                                </div>
                            </div>
                        </div>
                   </div>
                   <div className="vehicle-input"> 
                     <div class="input-div">
                       <div>
                            <div class="select">
                                  <select onChange={handleVehicle}  value={vehicleType} >
                                      <option selected>Vehicle Type</option>
                                      {
                                          VehicletypeList.map(item => (
                                              <option value={item.data}>{item.data}</option>
                                          ))
                                      } 
                                  
                                    </select>
                              </div>
                          </div>
                      </div>
                   </div>
                   <div className="vehicle-input"> 
                      <div class="input-div">
                        <div>
                          <div class="select">
                                <select onChange={handleInterior}  value={interiorColor} >
                                    <option selected>Interior Color</option>
                                    {
                                      interiorColorList.map(item => (
                                            <option value={item.data}>{item.data}</option>
                                        ))
                                    } 
                                
                                  </select>
                            </div>
                        </div>
                    </div>
                   </div>
                </div>   

                <div class="vehicle-sub">
                   <div className="vehicle-input"> 

                      <div class="input-div">
                          <div>
                            <div class="select">
                                  <select onChange={handleTransmission}  value={transmission} >
                                      <option selected>Transmission</option>
                                      {
                                          setTransmissionList.map(item => (
                                              <option value={item.data}>{item.data}</option>
                                          ))
                                      } 
                                  
                                    </select>
                              </div>
                          </div>
                      </div>


                   </div> 

                    <div className="vehicle-input"> 
                        <div class="input-div">
                            <div>
                              <div class="select">
                                    <select onChange={handleDoors}  value={door} >
                                        <option selected> Doors</option>
                                        {
                                            DoorList.map(item => (
                                                <option value={item.data}>{item.data}</option>
                                            ))
                                        } 
                                    
                                      </select>
                                </div>
                            </div>
                        </div>

                   </div>

                    <div className="vehicle-input"> 


                      <div class="input-div">
                          <div>
                            <div class="select">
                                  <select onChange={handleEngineType}  value={EngineType} >
                                      <option selected> Engine Type</option>
                                      {
                                          EngineTypeList.map(item => (
                                              <option value={item.data}>{item.data}</option>
                                          ))
                                      } 
                                  
                                    </select>
                              </div>
                          </div>
                      </div>

       

                   </div> 
                </div>  

                <div class="vehicle-sub">
                   <div className="vehicle-input"> 


                      <div class="input-div">
                          <div>
                            <div class="select">
                                  <select onChange={handleInteriorType}  value={interiorType} >
                                      <option selected>Interior Type</option>
                                      {
                                        InteriorTypeList.map(item => (
                                              <option value={item.data}>{item.data}</option>
                                          ))
                                      } 
                                  
                                    </select>
                              </div>
                          </div>
                      </div>


                   </div> 

                    <div className="vehicle-input"> 

                    
                      <div class="input-div">
                          <div>
                            <div class="select">
                                  <select onChange={handleFuelTypeList}  value={ fuelType} >
                                      <option selected>Fuel Type</option>
                                      {
                                          FuelTypeList.map(item => (
                                              <option value={item.data}>{item.data}</option>
                                          ))
                                      } 
                                  
                                    </select>
                              </div>
                          </div>
                      </div>


                   </div>

                    <div className="vehicle-input"> 
                        <div class="input-div">
                            <div>
                              <div class="select">
                                    <select onChange={handlePassengerCapacity}  value={ fuelType} >
                                        <option selected>Seating Capacity</option>
                                        {
                                            PassengerCapacityList.map(item => (
                                                <option value={item.data}>{item.data}</option>
                                            ))
                                        } 
                                    
                                      </select>
                                </div>
                            </div>
                        </div>

                     </div> 
                 </div>  



                 <div class="vehicle-sub">
                   <div className="vehicle-input"> 
                    <input type="date" id="start" name="trip-start"
                      value="2018-07-22"
                      min="2018-01-01" max="2018-12-31"/>
                   </div>
                   <div className="vehicle-input"> 
                      <div class="input-div">
                        <input type="text"  placeholder="price" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" value={price} onChange={(e) => setPrice(e.target.value)} />

                      </div>
                   </div>
                   <div className="vehicle-input"> 
                     <div class="input-div">
                        <input type="text"  placeholder="Odometer" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" value={odometer} onChange={(e) => setOdometer(e.target.value)} />
                     </div>

                   </div>
                 </div>


                 <div class="vehicle-sub">
                   <div className="vehicle-input"> 
                    <div class="input-div">
                      <input type="text"  placeholder="Seller City" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" value={sellerCity} onChange={(e) => setSellerCity(e.target.value)} />

                    </div>

                   </div>
                   <div className="vehicle-input">
                      <div class="input-div">
                         <input type="text"  placeholder="Description" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" value={ description} onChange={(e) =>   setDescription(e.target.value)} />

                      </div> 

                   </div>
                   <div className="vehicle-input"> 
                      <div class="input-div">
                      <input type="text"  placeholder="BidAmount" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" value={ bidAmount} onChange={(e) =>   setBidAmount(e.target.value)} />

                    </div>
                   </div>
                 </div>

                 <div class="vehicle-sub">
                   <div className="vehicle-input">
                    <div class="input-div">
                      <input type="text"  placeholder="Zip" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" value={  zip} onChange={(e) => setZip(e.target.value)} />

                     </div>
                   </div>  
                   <div className="vehicle-input">
                      <div class="input-div">
                        <input type="text"  placeholder="Facilitation Location" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" value={ facilitationLocation} onChange={(e) => setFacilitationLocation(e.target.value)} />

                      </div>
                   </div>  
                   <div className="vehicle-input">
                        <div class="input-div">
                          <input type="text"  placeholder="Vehicle Location" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" value={  vehicleLocation} onChange={(e) =>   setVehicleLocation(e.target.value)} />

                        </div>
                   </div>  
                 </div>  
                 <div className="vehicle-buttom"> 
                 <p><button class="bg-red-700 text-white mt-6 rounded-md text-sx px-3 py-1" onClick={submitData}>Submit</button></p> 
                 </div>
                






            </div>
            




            {/* <div className="mb-9">
                          <input type="text" list="process" name="process-select" className="w-full border border-gray-400 rounded-lg p-2 text-sm outline-none text-gray-600" id="process-select"  />
                          <datalist id="process">
                            <option>Choose process step</option>
                            <option value="You placed a bid for...">You placed a bid for...</option>
                            <option value="Your bid has been won and is awaiting balance payment.">Your bid has been won and is awaiting balance payment.</option>
                            <option value="You paid the balance for the car and is awaiting pick up at the lot.">You paid the balance for the car and is awaiting pick up at the lot.</option>
                            <option value="Your car has been picked up from the lot and is on the way to the port.">Your car has been picked up from the lot and is on the way to the port.</option>
                            <option value="The car has been dropped at the port and is awaiting shippment.">The car has been dropped at the port and is awaiting shippment.</option>
                            <option value="Your car has been shipped to Nigeria and is awaiting clearance at the port.">Your car has been shipped to Nigeria and is awaiting clearance at the port.</option>
                            <option value="Your car has been cleared at the port and is awaiting delivery or pickup.">Your car has been cleared at the port and is awaiting delivery or pickup.</option>
                            <option value="Your car has been delivered.">Your car has been delivered.</option>
                          </datalist>
                        
                  </div> */}

            

            



            
    

           
            


            
            



          


         </div>
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


const interiorColorList= [

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

const list = [
        
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
export default Vehicies

