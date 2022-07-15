import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import LoadingSpinner from './UI/LoadingSpinner';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';


const Posts = () => {

  const [ pageNumber, setPageNumber ] = useState(0);
  const [ numberOfPages, setNumberOfPages ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);

  const [all, setAll] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const [posts, setPosts] = useState([]);
  const [ username, setUsername ] = useState({});

  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

// Fetching without pagination

  useEffect(() => {
    const fetchAll = async() => {
      const allPosts = await axios.get(`http://localhost:3001/api/post/all`);
      setAll(allPosts.data.posts);
    };
    fetchAll();
  },[]);


  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const findings = all.filter(post => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if(searchTerm === ""){
      return posts
    }else{
      setPosts(findings);
    }
  }

  useEffect(() => {
    const fetchPosts = async() => {
      setIsLoading(true);
      const allPosts = await axios.get(`http://localhost:3001/api/posts?page=${pageNumber}`);
      setPosts(allPosts.data.posts);
      console.log(allPosts.data.posts);
      setNumberOfPages(allPosts.data.totalPages);
      setIsLoading(false)
    };
    fetchPosts();
  },[pageNumber]);

  const previous = () => {
    setPageNumber(pageNumber - 1);
  }

  const next = () => {
    setPageNumber(pageNumber + 1);
  }

  const refresh = () => {
    navigate('/home');
    navigate('/my-post');
  }

   const handleDelete = async(id) => {
     const user = await axios.delete(`http://localhost:3001/api/post/${id}`, 
       {headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`,
        }}
    ).then(refresh()).catch(err => console.log(err));
    
  }

  const handleUpdate = async(id) => {
    navigate(`/post/update/${id}`);
  }

	return <div className='post'>
       <div className='container'>
          <h1>LIST OF ALL POSTS</h1>
          <div className='underline'></div><br />

          <div className='search-container'>
            <input type="text" className='search' onChange={handleSearch}  placeholder='Search here...' />
          </div>

          <div className='spinner-container'>
            {isLoading && <LoadingSpinner />}
          </div>

          <div>
          {posts.length > 0 ? <div>
          {posts.map(post => (
             <div key={post._id} className='single-post'>
               <div className='single-post-inner' onClick={()=> navigate(`/post/${post._id}`)}>
               <img src={"../images/" + post.image} className='content-img' />
               <p className='content'>
                  <h3>{post.title}</h3>
                  {post.content} <br /><br />
                  <small>By <strong>{post.creater.name +' '+ post.creater.surname}</strong> at <strong>{new Date(post.createdAt).toLocaleDateString('en-US')}</strong></small>
               </p>
               </div>
               {post.creater._id === localStorage.getItem("userId") &&
                    <span className='actions'>
                      <FaEdit className='single-action' onClick={() => handleUpdate(post._id)} />
                      <FaTrash className='single-action' onClick={() => handleDelete(post._id)} />
                    </span>
                }
            </div>
          ))}
          <button onClick={previous} className='previous'>prev</button>
          {pages.map((pageIndex) => (
             <button className='page-number' onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
          ))}
          <button onClick={next} className='next'>next</button>
         </div>: <h1>There are no posts yet</h1>}
          </div>
       </div>
	</div>
}

export default Posts;
