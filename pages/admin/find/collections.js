import { useEffect, useState } from "react"
import { enviroment } from "../../../src/components/environment";
import { CustomButton } from '../../../src/components/utils/Button';
import { ClipLoader} from "react-spinners";
import { useRouter } from 'next/router';
import { getCollectionDetail } from '../../../redux/actions/collection';
import { useDispatch } from 'react-redux';

function Collections() {
    const [filteredData, setfilteredData] = useState(null)
    const [isLoading, setisLoading] = useState(true)


    useEffect(() => getSearchValue(), [])
    
    const getSearchValue = () => {
        const searchValue = localStorage.getItem('searchValue')
        if(searchValue) {
            getCollections(searchValue)
            
        } else {
            setnoValue(true)
        }
    }

    const getCollections = (searchValue) => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        
        fetch(enviroment.BASE_URL + "collections/search-collection?search=" + searchValue, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.error == false) {
                setfilteredData(result.data)
            }
        })
        .finally(() => setisLoading(false))
        .catch(error => console.log('error', error));
        
    }

    //
    const router = useRouter();
    const dispatch = useDispatch();
    //
    // function displaySmall(itemData) {
    //     let data = itemData.vehicles.slice(0, 5);
    //     let length = itemData.vehicles.length;
    //     return (
    //     <div className="mt-4  flex justify-start w-full overflow-hidden gap-4 flex-nowrap">
    //         {data.map((item, id) => (
    //         <div
    //             key={id}
    //             onClick={() =>
    //             router.push(
    //                 { pathname: '/admin/auctions/' + itemData.name },
    //                 dispatch(getCollectionDetail(itemData)),
    //             )
    //             }
    //             className="w-56 cursor-pointer  h-40 bg-black rounded overflow-hidden"
    //         >
    //             <img
    //             className="h-full w-56 object-cover"
    //             src={`https://proxybuylike.herokuapp.com/?url=${
    //                 item.images[0] ? item.images[0].image_largeUrl : ''
    //             }`}
    //             alt=""
    //             />
    //         </div>
    //         ))}
    //         {length > 5 ? (
    //         <div
    //             onClick={() =>
    //             router.push(
    //                 { pathname: '/admin/auctions/' + itemData.name },
    //                 dispatch(getCollectionDetail(itemData)),
    //             )
    //             }
    //             className="w-56 cursor-pointer h-40 flex items-center justify-center text-white  rounded overflow-hidden"
    //             style={{
    //             backgroundImage: `url(https://proxybuylike.herokuapp.com/?url=${itemData.vehicles[5].images[0].image_largeUrl})`,
    //             backgroundSize: 'cover',
    //             }}
    //         >
    //             <div className="flex items-center justify-center bg-black opacity-60 h-full w-full">
    //             {length - 5} more
    //             </div>
    //         </div>
    //         ) : (
    //         ''
    //         )}
    //     </div>
    //     );
    // }

    return (
        <div className="p-8 pl-24 flex flex-col gap-y-12">
        {isLoading ? (
            <div className="flex h-56 items-center justify-center">
                <ClipLoader size="50px" color="#999"></ClipLoader>
            </div>
        ) : (
            <>
            {filteredData !== null &&
                filteredData?.map((ele, id) => (
                <div key={id} className="bg-white border p-4 rounded my-3">
                    <div className="flex justify-between items-center">
                    <CustomButton
                        title={ele.name}
                        onClick={() =>
                        router.push(
                            { pathname: '/admin/auctions/' + ele.name },
                            dispatch(getCollectionDetail(ele)),
                        )
                        }
                    />
                    <h3 className="text-letters uppercase">
                        {`${ele?.owner?.info[0]?.firstName || ''} 
                        ${ele?.owner?.info[0]?.lastName || ''}`}
                    </h3>
                    </div>
                    <div className="flex justify-between mt-1 items-center">
                    <p className="text-letters text-xs">
                        {`${ele?.vehicles?.length} car${
                        ele?.vehicles?.length > 1 ? 's' : ''
                        } selected`}
                    </p>
                    <div>
                        <p className="text-letters text-xs">$1,000 deposit paid</p>
                        <p className=" text-xs mt-2">
                        {new Date(ele?.createdAt).toLocaleDateString("en-NG",
                            {
                                year: "numeric",
                                day: "numeric",
                                month: "long",
                            }
                        )}</p>

                    </div>

                    </div>
                    {/* {displaySmall(ele)} */}
                </div>
                ))}

            </>
        )}
        </div>
    );
};

export default Collections
