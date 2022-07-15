import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/style.css';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';

const Post = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState([]);

  useEffect(() => {
    const getSinglePost = async() => {
      const fetchedPost = await axios.get(`http://localhost:3001/api/post/${id}`, 
         {headers : {
             Authorization : `Bearer ${localStorage.getItem("token")}`,
         }}
      );
      setPost(fetchedPost.data);
    }
    getSinglePost();
  },[id])

    const handleDelete = async(id) => {
     const user = await axios.delete(`http://localhost:3001/api/post/${id}`, 
       {headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`,
        }}
    );
     if(user){
      navigate('/posts');
     }
  }

  const handleUpdate = async(id) => {
    navigate(`/post/update/${id}`);
  }

	return <div className='individual-post'>
       <div className='container'>
          <button className='back-button' onClick={() => navigate('/posts')}><FaAngleLeft /> BACK</button>
          <div className='post-content'>
             <img className='post-content-img' src={"../images/" + post.image} />
             <span>
                <p className='post-content-text'>
                <h2>{post.title}</h2>
                {post.content} <br /><br />
      	    		<small> <strong></strong> At <strong>{new Date(post.createdAt).toLocaleDateString('en-US')}</strong></small><br /><br />
             </p>
             </span>
          </div>
       </div>
	</div>
}

export default Post;
