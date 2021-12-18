import { useEffect, useState } from "react"
import { enviroment } from "../../src/components/environment"
import UsersTable from "../../src/components/tables/user-table"

function Users() {
  const [users, setusers] = useState(null)

  useEffect(() => {
    getUsers()
    return () => {
      getUsers()
    }
  }, [])

  const getUsers = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(enviroment.BASE_URL + "auth/user/users/all", requestOptions)
      .then(response => response.text())
      .then(result => {
        const item = JSON.parse(result)
        console.log(item.data.docs)

        if(item.error == false) {
          setusers(item.data.docs)
        }
      })
      .catch(error => console.log('error', error));
  }


  return (
    <div className="p-8 pl-24">
      <div className="users">
        <p className="uppercase text-base mb-2 font-semibold">All Users</p>
        <UsersTable users={users}></UsersTable>
      </div>
    </div>
  )
}

export default Users

