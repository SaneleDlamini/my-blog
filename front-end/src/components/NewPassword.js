import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewPassword = () => {

  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();

  const handleUpdate = async(e) => {
    e.preventDefault();

  }

	return <div className='register'>
       <div className='container'>
          <h1>CREATE NEW PASSWORD</h1>
          <div className='underline'></div><br />
          <div className='register-form'>
            <form onSubmit={handleUpdate}>
               <div className='form-group'>
                  <input type='password' name='password' placeholder='Create new password' value={password} onChange={(e) => setPassword(e.target.value)} />
               </div>
               <div className='form-group'>
                  <button type='submit' className='post-button'>UPDATE</button>
               </div>
           </form>
          </div>
       </div>
	</div>
}

export default NewPassword;
