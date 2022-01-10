function UserSearch({searches}) {
    function dateFormatter(val) {
        const formatDate = Date.parse(val)
        const work = new Intl.DateTimeFormat('en-NG').format(formatDate)
    
        return work;
    }

    return (
        <div className="block w-full overflow-x-auto h-96 border">
          {/* transaction table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light bg-gray-50">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  User
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Make
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Model
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {searches?.slice(0).reverse().map((search, index) => (
                <tr key={index} className="cursor-pointer">
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {search.user.email || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {search.make || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {search.model || "N/A"}
                  </td>
                 
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {dateFormatter(search.createdAt)}
                  </td>
                  
                </tr>

              ))}
            </tbody>
          </table>
        </div>
    )
}

export default UserSearch
