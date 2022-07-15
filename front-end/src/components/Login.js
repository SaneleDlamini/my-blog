import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ validate, setValidate ] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!email || !password){
      setValidate(true);
      return;
    }

    const user = {
      email,
      password
    }
    const result = await axios.post('http://localhost:3001/users/login', user);
    console.log(result.data.error);
    if(result){
       dispatch(login());
       localStorage.setItem("token", result.data.token);
       localStorage.setItem("userId", result.data.userId);
       localStorage.setItem("isAdmin", result.data.isAdmin)
       navigate('/posts')
    }
  }

  const handlePasswordReset = () => {
    navigate('/auth/password-reset')
  }

	return <div className='login'>
       <div className='container'>
          <h1>LOG IN</h1>
          <div className='underline'></div><br />
          <div className='login-form'>
             {validate && <div className='validate'>All fields are required</div>}
             {error && <p className='error'>ERROR - Failed to login</p>}
             <form onSubmit={handleSubmit}>
             <div className='form-group'>
                <input type='text' name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
             </div>
             <div className='form-group'>
                <input type='password' name='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
             </div>
             <div className='form-group'>
                <span className='fogort-password'>forgot password? <a href='#' onClick={handlePasswordReset}>Click here</a></span>
             </div><br />
             <div className='form-group'>
                <button type='submit' className='post-button'>LOGIN</button>
             </div>
          </form>
          </div>
       </div>
	</div>
}

export default Login;
