import React, { useEffect, useState } from 'react'
import "../App.css";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

export const Home = () => {
  // state variable that will contain information from backend api 
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:4000/api/users')
    .then(users => setUsers(users.data))
    .catch(err => console.log(err))
  }, [])
    

    return (
        <>
        <table className ="table">
            <thead>
            <tr>
                <th>
                    Name
                </th>

            </tr>
            </thead>
            <tbody>
                {
                    users.map(user => {
                        return <tr>
                            <td>{user.name}</td>
                        </tr>
                    })
                    
                }
            </tbody>
        </table>
        </>

    );
}