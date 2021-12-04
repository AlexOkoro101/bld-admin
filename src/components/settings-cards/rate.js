import { useEffect, useState } from "react"
import { enviroment } from "../environment";
import AddRateModal from "../modals/addRateModal";
import EditRateModal from "../modals/editRateModal";
import { on } from "../utils/events";

function Rate() {
    const [rates, setrates] = useState(null);
    const [currentRate, setcurrentRate] = useState(null);
    const [editRateModal, seteditRateModal] = useState(false)
    const [addRateModal, setaddRateModal] = useState(false)

    useEffect(() => {
        getRate()
        return () => {
            getRate()
        }
    }, [addRateModal,editRateModal])

    useEffect(() => {
        on("closeButton:click", () => seteditRateModal(false));
        on("closeButton:click", () => setaddRateModal(false));
    });

    const getRate = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(enviroment.BASE_URL + "rates", requestOptions)
            .then(response => response.text())
            .then(result => {
                const item = JSON.parse(result)
                console.log(item.data)

                if(item.error == false) {
                    setrates(item.data)
                }
            })
            .catch(error => console.log('error', error));
    }

    const adjustRate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            rate: `${rate}`,
            country: "usa",
            name: "USD"
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(enviroment.BASE_URL + "rates/613b98b1e28f970016362ae3", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    const editRate = (rate) => {
        setcurrentRate(rate)
        seteditRateModal(true)
    }



    return (
        // <div className="border p-2 w-3/12">
        //     <p className="border-b p-1 text-base font-semibold text-gray-500 uppercase">Currency Rate</p>
        //     <form className="mt-4">
        //         <input type="number" className="border border-gray-400 px-2 py-1 w-10/12 text-sm outline-none mb-2" value={rate} onChange={(e) => setrate(e.target.value)} /><br />
        //         <button type="button" className="outline-none hover:bg-red-600 bg-red-500 text-white text-xs px-4 py-1 rounded-sm" onClick={adjustRate}>Set rate</button>
        //     </form>
        // </div>
        <div>
            <h1 className="uppercase text-base mb-2 font-semibold">ALL RATES</h1>
            <table className="border-collapse border">
                <thead className="thead-light bg-gray-50">
                    <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Currency</th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Rate</th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                {rates?.map((rate) => (
                    <tr key={rate?.name}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{rate?.name}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{rate?.rate}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button className="py-1 px-4 text-xs rounded-md bg-blue-500 text-white mr-1" onClick={(e) => (editRate(rate))}>Edit</button>
                            <button className="py-1 px-4 text-xs rounded-md bg-red-500 text-white mr-1">Delete</button>
                        </td>
                    </tr>

                ))}
                </tbody>
            </table>
            <div className="mt-5">
                <button className="py-1 px-4 text-xs rounded-md bg-green-500 text-white mr-1" onClick={() => {setaddRateModal(true)}}>Add Rate</button>
            </div>

            {editRateModal && (
                <EditRateModal currentRate={currentRate} editRateModal={editRateModal}></EditRateModal>
            )}

            {addRateModal && (
                <AddRateModal addRateModal={addRateModal}></AddRateModal>
            )}

        </div>
    )
}

export default Rate
