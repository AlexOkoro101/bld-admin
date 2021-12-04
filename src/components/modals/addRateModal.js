import { useEffect, useState, useMemo } from "react"
import { enviroment } from "../environment";
import { trigger } from "../utils/events";


function AddRateModal({addRateModal}) {
    const [showModal, setshowModal] = useState(false)
    const [rate, setrate] = useState("");
    const [country, setcountry] = useState("")
    const [name, setname] = useState("")

    useEffect(() => {
        setshowModal(addRateModal)
    }, [])

    const addRate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            rate: rate,
            country: country,
            name: name
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(enviroment.BASE_URL + "rates", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            closeModal()
        })
        .catch(error => console.log('error', error));
    }
    

    const closeModal = () => {
        trigger("closeButton:click");
    }
    return (
        //  Main modal
    <div id="default-modal" aria-hidden="true" className={"overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:m-auto z-50 justify-center items-center"}>
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto m-auto">
            {/* Modal content */}
            <div className="bg-blue-50 rounded-lg shadow relative dark:bg-gray-700 w-2/3 m-auto">
                {/* Modal header */}
                <div className="flex items-start justify-between p-5 border-b rounded-t border-gray-200">
                    <h3 className="text-gray-500 uppercase text-xs lg:text-base font-semibold dark:text-white">
                        Add Rate
                    </h3>
                    <button onClick={closeModal}  type="button" id="closeModal" className="text-gray-400 bg-transparent outline-none hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none" data-modal-toggle="default-modal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-xs uppercase mb-1">Country</label>
                        <input type="text" className="border p-2 outline-none text-xs text-black w-2/3" value={country} onChange={(e) => {setcountry(e.target.value)}} />
                    </div>
                    <div>
                        <label className="block text-xs uppercase mb-1">Currency Name</label>
                        <input type="text" className="border p-2 outline-none text-xs text-black w-2/3" value={name} onChange={(e) => {setname(e.target.value)}} />
                    </div>
                    <div>
                        <label className="block text-xs uppercase mb-1">Rate</label>
                        <input type="text" className="border p-2 outline-none text-xs text-black w-2/3" value={rate} onChange={(e) => {setrate(e.target.value)}} />
                    </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-toggle="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addRate}>Add</button>
                    <button data-modal-toggle="default-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AddRateModal
