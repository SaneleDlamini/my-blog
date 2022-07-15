import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [ name, setName ] = useState('');
  const [ surname, setSurname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ validate, setValidate ] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!name || !surname || !email || !password){
      setValidate(true);
      return;
    }

    const user = {
      name,
      surname,
      email,
      password
    }

    await axios.post('http://localhost:3001/users/register', user);
    navigate('/login');
  }

	return <div className='register'>
       <div className='container'>
          <h1>REGISTER</h1>
          <div className='underline'></div><br />
          <div className='register-form'>
            {validate && <div className='validate'>All fields are required</div>}
            <form onSubmit={handleSubmit}>
               <div className='form-group'>
                  <input type='text' name='name' placeholder='Enter your first name' value={name} onChange={(e) => setName(e.target.value)} />
               </div>
               <div className='form-group'>
                  <input type='text' name='surname' placeholder='Enter your last name' value={surname} onChange={(e) => setSurname(e.target.value)} />
               </div>
               <div className='form-group'>
                  <input type='text' name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className='form-group'>
                  <input type='password' name='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
               </div>
               <div className='form-group'>
                  <button type='submit' className='post-button'>REGISTER</button>
               </div>
           </form>
          </div>
       </div>
	</div>
}

export default Register;
