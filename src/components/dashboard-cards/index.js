
function Cards({users, transactions, searches}) {
    console.log(users);
    return (
        <div className="flex justify-between">
            <div className="users-card bg-indigo-600 text-white w-52 p-4 uppercase">
                <p className="font-semibold">Total Users</p>
                <p className="text-sm">{users?.total.toLocaleString()}</p>
            </div>

            <div className="transactions-card bg-pink-600 text-white  w-52 p-4 uppercase">
                <p className="font-semibold">Total Transactions</p>
                <p className="text-sm">{transactions?.total.toLocaleString()}</p>
            </div>

            <div className="transactions-card bg-yellow-600 text-white  w-52 p-4 uppercase">
                <p className="font-semibold">Total Searches</p>
                <p className="text-sm">{searches?.total.toLocaleString()}</p>
            </div>

            <div className="transactions-card bg-green-600 text-white w-52 p-4 uppercase">
                <p className="font-semibold">Total Ipsum</p>
                <p className="text-sm">100,000</p>
            </div>
        </div>
    )
}

export default Cards
