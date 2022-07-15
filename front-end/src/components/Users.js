import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import LoadingSpinner from './UI/LoadingSpinner';

const Users = () => {

    const navigate = useNavigate();

    const [ users, setUsers ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const getUsers = async() => {
          setIsLoading(true);
            const allUsers = await axios.get('http://localhost:3001/users',
                {headers : {
                  Authorization : `Bearer ${localStorage.getItem("token")}`,
                }}
            )
            setUsers(allUsers.data);
            setIsLoading(false);
        }
        getUsers();
    },[])

    const updateHandler = (id) => {
        navigate(`/user/update/${id}`);
    }

    const deleteHandler = async(id) => {
        const deleted = await axios.delete(`http://localhost:3001/users/${id}`,
            {headers : {
              Authorization : `Bearer ${localStorage.getItem("token")}`,
            }}
        )
        if(deleted){
            navigate("/home");
            navigate("/users")
        }
    }

	return <div className='users'>
       <div className='container'>
          <h1>LIST OF USERS</h1>
          <div className='underline'></div><br />
          <table>
             <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Role</th>
                <th colspan='2'>Actions</th>
             </tr>
             <div className='spinner-container'>
               {isLoading && <LoadingSpinner />}
             </div>
             {users.map(user => (
                 <tr>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                    <td><FaEdit onClick={() => updateHandler(user._id)} className='user-action' /></td>
                    <td><FaTrash onClick={() => deleteHandler(user._id)} className='user-action' /></td>
                 </tr>
             ))}
          </table>
       </div>
	</div>
}

export default Users;
