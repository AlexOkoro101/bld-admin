import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CustomButton } from '../utils/Button';
import { useEffect, useState } from 'react';
import { getCollections, fetchCollections } from '../../../redux/actions/collection';
import { CollectionCard } from './CollectionCard';
import { CollectionBuyNow } from './CollectionBuyNow';
import ReactPaginate from 'react-paginate'
import { ClipLoader} from "react-spinners";
//
//
export const Collections = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.collection.collections);
  console.log(selectedData)
  const [isLoading, setisLoading] = useState(false)
  const [filteredData, setFilteredData] = useState(null);
  const [buyNow, setBuyNow] = useState(null);
  const [activeCard, setActiveCard] = useState(false);
  const [totalPage, settotalPage] = useState(0)
  const [buyNowTotalPage, setbuyNowTotalPage] = useState(0)
  //
  useEffect(() => {
    let data = selectedData?.data?.filter((item) => item.vehicles.length > 0);
    settotalPage(Math.round(selectedData.total/selectedData.pageSize))
    setFilteredData(data);
  }, [selectedData]);
  useEffect(() => {
    dispatch(getCollections());
    fetch(`https://buylinke.herokuapp.com/bids/buy-now/bid`, {
      method: 'GET',
      headers: {},
      credentials: 'same-origin',
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        const dada = JSON.parse(res);
        if (dada) {
          setBuyNow(dada.data);
          setbuyNowTotalPage(Math.round(dada.total/dada.pageSize))
          console.log(dada.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handlePageChange = (data) => {
    setFilteredData(null)
    console.log(data.selected)

    let currentPage = data.selected

    dispatch(fetchCollections(currentPage));
  }

  const handlePageChangeBN = (data) => {
    console.log(data.selected)

    let currentPage = data.selected

    fetchBN(currentPage);
  }

  const fetchBN = (pageNumber) => {
    setisLoading(true)
    fetch(`https://buylinke.herokuapp.com/bids/buy-now/bid?page=` + pageNumber, {
      method: 'GET',
      headers: {},
      credentials: 'same-origin',
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        setisLoading(false)
        const dada = JSON.parse(res);
        if (dada) {
          setBuyNow(dada.data);
          // setbuyNowTotalPage()
          console.log(dada.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //
  return (
    <div className="md:pt-8 w-full p-8 md:pl-24 bg-customBg pb-24">
      <div className="flex mb-10 w-full items-center justify-start gap-4">
        <CustomButton
          onClick={() => setActiveCard(false)}
          title="BID COLLECTIONS"
          type={activeCard ? 'light' : 'primary'}
        />
        <CustomButton
          onClick={() => setActiveCard(true)}
          title="BUY NOW"
          type={activeCard ? 'primary' : 'light'}
        />
      </div>
      {activeCard === false ? (
        <>
          {!filteredData ? (
            <div className="flex h-56 items-center justify-center">
              <ClipLoader size="50px" color="#999"></ClipLoader>

            </div>
          ) : (
          <CollectionCard filteredData={filteredData ? filteredData : null} />

          )}
          <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={totalPage}
          onPageChange={handlePageChange}
          containerClassName={'pagination justify-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          activeClassName={'active'}
        ></ReactPaginate>
        </>
      ) : (
        <>
          {isLoading ? (
            <div className="flex h-56 items-center justify-center">
              <ClipLoader size="50px" color="#999"></ClipLoader>

            </div>
          ) : (
          <CollectionBuyNow buyNow={buyNow} />

          )}
          <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={buyNowTotalPage}
          onPageChange={handlePageChangeBN}
          containerClassName={'pagination justify-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          activeClassName={'active'}
        ></ReactPaginate>
        </>
      )}
    </div>
  );
};
