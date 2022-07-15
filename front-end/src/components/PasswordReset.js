import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {

  const [ email, setEmail ] = useState('');

  const navigate = useNavigate();

  const handleUpdate = async(e) => {
    e.preventDefault();

  }

	return <div className='register'>
       <div className='container'>
          <h1>PASSWORD UPDATE</h1>
          <div className='underline'></div><br />
          <div className='register-form'>
            <form onSubmit={handleUpdate}>
               <div className='form-group'>
                  <input type='text' name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className='form-group'>
                  <button type='submit' className='post-button'>UPDATE</button>
               </div>
           </form>
          </div>
       </div>
	</div>
}

export default PasswordReset;
