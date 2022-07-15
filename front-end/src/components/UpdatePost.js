import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePost = () => {

	const { id } = useParams();

	const [inputs, setInputs] = useState({});

	const [ file, setFile ] = useState('');

	const [ validate, setValidate ] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
    const getPost = async() => {
      const fetchedPost = await axios.get(`http://localhost:3001/api/post/${id}`);
      setInputs(fetchedPost.data);
    }
    getPost();
  },[id]);

	const onChangeImage = (e) => {
		setFile(e.target.files[0]);
	}

	const handleUpdate = async(e) => {
		e.preventDefault();

		if(!inputs.title || !inputs.content || !file){
			setValidate(true);
			return;
		}

		const formData = new FormData();

		formData.append("title", inputs.title);
		formData.append("image", file);
		formData.append("content", inputs.content);

		navigate('/posts');

		const updated = await axios.put(`http://localhost:3001/api/post/${id}`, formData, 
			{headers : {
		         Authorization : `Bearer ${localStorage.getItem("token")}`,
            }}
		);
		navigate('/posts');
	}

	const handleChange = (e) => {
	    e.preventDefault();
	    setInputs(prevState => ({
	      ...prevState,
	      [e.target.name]: e.target.value,
	    }));
    }

	return <div className='add-post'>
       <div className='container'>
          <h1>UPDATE POST</h1>
          <div className='underline'></div><br />
            <div className='register-form'>
              {validate && <div className='validate'>All fields are required</div>}
               <form onSubmit={handleUpdate} encType="multipart/from-data">
	             <div className='form-group'>
	                <input type='text' name='title' placeholder='Enter post title' value={inputs.title} onChange={handleChange} />
	             </div>
	             <div className='form-group'>
	                <label htmlFor='image'><strong>UPLOAD PICTURE</strong></label><br />
	                <input type="file" name='image' onChange={onChangeImage} />
	             </div><br />
	             <div className='form-group'>
	                <textarea rows='6' name='content' placeholder='Post content' value={inputs.content} onChange={handleChange}></textarea>
	             </div>
	             <div className='form-group'>
	                <button type='submit' className='post-button'>Update Post</button>
	             </div>
             </form>
            </div>
       </div>
	</div>
}

export default UpdatePost;
