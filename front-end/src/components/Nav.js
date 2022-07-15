import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../features/authSlice';
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import '../css/style.css';

const Nav = () => {

  const [ toggle, setToggle ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);

  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    dispatch(logout());
    navigate('/home')
  }

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin"))
  },[login, logout])

  const closeMenu = () => {
    setToggle(false);
  }

	return <div className='nav'>
        <span className='toggle-icons' onClick={() => setToggle(!toggle)}>
          {!toggle && <FaBars className='toggle-icon' />}
          {toggle && <FaTimes className='toggle-icon' />}
       </span>
	<div className='container'>
       { toggle &&
       <nav className='mobile-view'>
          <span className='logo' onClick={() => navigate('/home')}>SanzarMedia</span>
            <ul>
            <a>
              <li onClick={closeMenu}>
                 <NavLink activeClassName="active" className='nav-link' to="/home">
                   HOME
                 </NavLink>
              </li>
            </a>
            <a>
              <li onClick={closeMenu}>
                 <NavLink activeClassName="active" className='nav-link' to="/posts">
                   POSTS
                 </NavLink>
              </li>
            </a>
            
            {auth &&
            <>
            <a>
              <li onClick={closeMenu}>
                 <NavLink activeClassName="active" className='nav-link' to="/add-post">
                    ADD POST
                 </NavLink>
              </li>
            </a>
            <a>
              <li onClick={closeMenu}>
                 <NavLink activeClassName="active" className='nav-link' to="/my-post">
                    MY POSTS
                 </NavLink>
              </li>
            </a>
            {isAdmin === 'true' &&
            <a>
              <li onClick={closeMenu}>
                 <NavLink activeClassName="active" className='nav-link' to="/users">
                    USERS
                 </NavLink>
              </li>
            </a>
           }
          </>
          }
          { !auth ? 
            <>
            <a>
              <li onClick={closeMenu}>
                 <NavLink activeClassName="active" className='nav-link' to="/register">
                    REGISTER
                 </NavLink>
              </li>
            </a>
            <a>
              <li onClick={closeMenu}>
                 <NavLink activeClassName="active" className='nav-link' to="/login">
                    LOGIN 
                 </NavLink>
              </li>
            </a>
          </>
            :
            <a>
              <li onClick={closeMenu}>
                 <NavLink activeClassName="active" className='nav-link' to="/home" onClick={logout} className='logout' >
                    LOGOUT
                 </NavLink>
              </li>
            </a>
          }
          </ul>
        </nav>}

        <nav className='desktop-view'>
          <span className='logo' onClick={() => navigate('/home')}>SanzarMedia</span>
            <ul>
            <a>
              <li>
                 <NavLink activeClassName="active" className='nav-link' to="/home">
                   HOME
                 </NavLink>
              </li>
            </a>
            <a>
              <li>
                 <NavLink activeClassName="active" className='nav-link' to="/posts">
                   POSTS
                 </NavLink>
              </li>
            </a>
            
            {auth &&
            <>
            <a>
              <li>
                 <NavLink activeClassName="active" className='nav-link' to="/add-post">
                    ADD POST
                 </NavLink>
              </li>
            </a>
            <a>
              <li>
                 <NavLink activeClassName="active" className='nav-link' to="/my-post">
                    MY POSTS
                 </NavLink>
              </li>
            </a>
            {isAdmin === 'true' &&
            <a>
              <li>
                 <NavLink activeClassName="active" className='nav-link' to="/users">
                    USERS
                 </NavLink>
              </li>
            </a>
           }
          </>
          }
          { !auth ? 
            <>
            <a>
              <li>
                 <NavLink activeClassName="active" className='nav-link' to="/register">
                    REGISTER
                 </NavLink>
              </li>
            </a>
            <a>
              <li>
                 <NavLink activeClassName="active" className='nav-link' to="/login">
                    LOGIN 
                 </NavLink>
              </li>
            </a>
          </>
            :
            <a>
              <li>
                 <NavLink activeClassName="active" className='nav-link' to="/home" onClick={logout} className='logout' >
                    LOGOUT
                 </NavLink>
              </li>
            </a>
          }
          </ul>
        </nav>
       </div>
	</div>
}

export default Nav;
