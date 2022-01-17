import router, { useRouter } from 'next/router';

function TransactionTable({transactions}) {

    const router = useRouter()
    function dateFormatter(val) {
        const formatDate = Date.parse(val)
        const work = new Intl.DateTimeFormat('en-NG').format(formatDate)
    
        return work;
    }

  
    return (
        <div className="block w-full border mb-10">
          {/* transaction table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light bg-gray-50">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Vehicle/Collection Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Amount
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Balance
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.data?.slice(0).reverse().map((transaction) => (
                <tr key={transaction?._id} className="cursor-pointer hover:bg-gray-100" onClick={() => router.push('/admin/auctions/buy-now/' + transaction?.vehicle?._id)}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {transaction?.vehicle?.name || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    ${transaction?.amount || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   ${transaction?.balance || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {transaction?.statusTrans || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {dateFormatter(transaction?.createdAt)}
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
    )
}

export default TransactionTable
