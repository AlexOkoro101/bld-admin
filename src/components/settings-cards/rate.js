import { useEffect, useState } from "react"
import { enviroment } from "../environment";

function Rate() {
    const [rate, setrate] = useState("");

    useEffect(() => {
        getRate()
        return () => {
            getRate()
        }
    }, [])

    const getRate = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(enviroment.BASE_URL + "rates", requestOptions)
            .then(response => response.text())
            .then(result => {
                const item = JSON.parse(result)
                console.log(item.data[0].rate)

                if(item.error == false) {
                    setrate(Number(item.data[0].rate))
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



    return (
        <div className="border p-2 w-3/12">
            <p className="border-b p-1 text-base font-semibold text-gray-500 uppercase">Currency Rate</p>
            <form className="mt-4">
                <input type="number" className="border border-gray-400 px-2 py-1 w-10/12 text-sm outline-none mb-2" value={rate} onChange={(e) => setrate(e.target.value)} /><br />
                <button type="button" className="outline-none hover:bg-red-600 bg-red-500 text-white text-xs px-4 py-1 rounded-sm" onClick={adjustRate}>Set rate</button>
            </form>
        </div>
    )
}

export default Rate
