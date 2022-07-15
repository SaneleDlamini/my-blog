import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '../css/style.css';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import img from '../images/img2.jpg';
import Search from './Search';
import LoadingSpinner from './UI/LoadingSpinner';

const MyPosts = () => {

    const [ pageNumber, setPageNumber ] = useState(0);
    const [ numberOfPages, setNumberOfPages ] = useState(0);
    const [ searchWord, setSearchWord ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const [all, setAll] = useState([]);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

	const [ myPosts, setMyPosts ] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getMyPost = async() => {
			setIsLoading(true);
			const posts = await axios.get(`http://localhost:3001/api/my-posts?page=${pageNumber}`,
				{headers : {
		         Authorization : `Bearer ${localStorage.getItem("token")}`,
               }}
			)
			setMyPosts(posts.data.myPosts);
			setNumberOfPages(posts.data.totalPages);
			setIsLoading(false);
		}
		getMyPost();
	},[pageNumber]);

	  const previous = () => {
	    setPageNumber(pageNumber - 1);
	  }

	  const next = () => {
	    setPageNumber(pageNumber + 1);
	  }

	  const refresh = () => {
	  	navigate('/home');
	  	navigate('/posts');
	  }

	const handleDelete = async(id) => {
	   const post =	await axios.delete(`http://localhost:3001/api/post/${id}`, 
	   	  {headers : {
		     Authorization : `Bearer ${localStorage.getItem("token")}`,
           }}
	   ).then(refresh()).catch(err => console.log(err));
	}

	const handleUpdate = async(id) => {
		navigate(`/post/update/${id}`);
	}

	useEffect(() => {
	    const fetchAll = async() => {
	      const allPosts = await axios.get(`http://localhost:3001/api/post/all`);
	      setAll(allPosts.data.posts);
	    };
	    fetchAll();
    },[]);

	
	const handleInput = (e) => {
		const searchTerm = e.target.value;
		setSearchWord(searchTerm);

		const findings = all.filter(mypost => {
			return mypost.title.toLowerCase().includes(searchTerm.toLowerCase());
		});
		if(searchTerm === ""){
			return myPosts
		}else{
			setMyPosts(findings);
		}
	}

	return <div className='my-post'>
       <div className='container'>
          <h1>MY POSTS</h1>
          <div className='underline'></div><br />
          <div className='search-container'>
           <input type="text" value={searchWord} className='search' placeholder="Search here..." onChange={handleInput} />
        </div>
           <div className='spinner-container'>
              {isLoading && <LoadingSpinner />}
            </div>
           {myPosts.length > 0 ? <div>
           	   {myPosts.map(myPost => (
            	<div className='single-my-post'>
	             <img src={"../images/" + myPost.image} className='content-img' />
	             <p className='content'>
	               <h3>{myPost.title}</h3>
	               {myPost.content}
	              <br /><br />
		    		<small>By <strong>{myPost.creater.name +' '+ myPost.creater.surname}</strong> at <strong>{new Date(myPost.createdAt).toLocaleDateString('en-US')}</strong></small>
		    		<span className='actions'>
		    		   <FaEdit className='single-action' onClick={() => handleUpdate(myPost._id)} />
	                   <FaTrash className='single-action' onClick={() => handleDelete(myPost._id)} />
		    		</span>
	             </p>
               </div>
            ))}
            <button onClick={previous} className='previous'>prev</button>
               {pages.map((pageIndex) => (
               <button className='page-number' onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
          ))}
          <button onClick={next} className='next'>next</button>
          </div> : <h1>You do not have posts yet, create one <NavLink to='/add-post'>here</NavLink> </h1>}
            
       </div>
	</div>
}

export default MyPosts;
