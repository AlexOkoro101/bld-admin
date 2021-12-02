import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { enviroment } from "../../../src/components/environment"

function TransactionDetail() {
    const [transDetail, settransDetail] = useState(null)
    const [getTransDetailAgain, setgetTransDetailAgain] = useState(false)
    const router = useRouter()

     

    const transID = router.query.id;
    useEffect(() => {
        setTimeout(() => {
            getTransDetail(transID)
            setgetTransDetailAgain(true)
        }, 1000);
        return () => {
            getTransDetail()
        }
    }, [getTransDetailAgain])


    const getTransDetail = (id) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(enviroment.BASE_URL + "transactions/" + id, requestOptions)
        .then(response => response.text())
        .then(result => {
            const item = JSON.parse(result)
            console.log(item)

            settransDetail(item?.data)
        })
        .catch(error => console.log('error', error));
    }

    return (
        <div className="p-8 pl-24">
            {transDetail && (
                <div className="flex  gap-x-5">
                    
                    <div className="car-detail">
                        <div>
                            <img src={transDetail?.vehicle.images[0].image_largeUrl} alt="" className="w-full" />
                        </div>
                    </div>

                    <div className=" p-4">

                        <div>
                            <p className="text-xl font-semibold uppercase">{transDetail?.vehicle.name || (`${transDetail?.vehicle.year} ${transDetail?.vehicle.make} ${transDetail?.vehicle.model}`)}</p>
                            <p>VIN: {transDetail?.vehicle.vin}</p>
                            <p>${transDetail?.vehicle.price}</p>
                            <p >Status <span className="bg-green-500 text-white text-xs px-4 py-1 rounded-full">{transDetail?.statusTrans}</span></p>
                        </div>
                        <div className="border p-3 flex justify-between text-sm mt-4">
                            <div>
                                <p className="font-semibold">Amount Paid</p>
                                <p className="font-semibold">Price of Car</p><br />
                                <p className="font-semibold">Balance</p>
                            </div>
                            <div>
                                <p>$1,000</p>
                                <p>${transDetail?.amount}</p><br />
                                <p>${transDetail?.amountBalance}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TransactionDetail
