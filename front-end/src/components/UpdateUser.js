import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const { id } = useParams();

  const [inputs, setInputs] = useState({});
  const [checked, setChecked] = useState(true)

  const navigate = useNavigate();


  useEffect(() => {
      const getUser = async() => {
          const allUsers = await axios.get(`http://localhost:3001/users/${id}`,
              {headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
              }}
          )
          setInputs(allUsers.data);
      }
      getUser();
    },[])

    const isAdmin = () => {
      setChecked(!checked);
      console.log(checked);
    }

  const handleUpdate = async(e) => {
    e.preventDefault();

    const user = {
      name : inputs.name,
      surname : inputs.surname,
      email : inputs.email,
      isAdmin : checked
    }

    const updated = await axios.put(`http://localhost:3001/users/${id}`, user,
       {headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
              }}
    );
    if(updated){
      navigate('/users')
    }
  }

    const handleChange = (e) => {
      e.preventDefault();
      setInputs(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }

  return <div className='register'>
       <div className='container'>
          <h1>UPDATE USER</h1>
          <div className='underline'></div><br />
          <div className='register-form'>
            <form onSubmit={handleUpdate}>
               <div className='form-group'>
                  <input type='text' name='name' disabled placeholder='Enter your first name' value={inputs.name} onChange={handleChange} />
               </div>
               <div className='form-group'>
                  <input type='text' name='surname' disabled placeholder='Enter your last name' value={inputs.surname} onChange={handleChange} />
               </div>
               <div className='form-group'>
                  <input type='text' name='email' disabled placeholder='Enter your email' value={inputs.email} onChange={handleChange} />
               </div>
               <div className='form-group'>
                 <input type='checkbox' name='isAdmin' checked={checked} onChange={isAdmin} /> Is Admin?
               </div><br />
               <div className='form-group'>
                  <button type='submit' className='post-button'>UPDATE</button>
               </div>
           </form>
          </div>
       </div>
  </div>
}

export default Register;
