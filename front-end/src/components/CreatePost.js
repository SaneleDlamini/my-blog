import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {

	const [ title, setTitle ] = useState('');
	const [ content, setContent ] = useState('');
	const [ file, setFile ] = useState('');
	const [ validate, setValidate ] = useState(false);

	const navigate = useNavigate();

	const onChangeImage = (e) => {
		setFile(e.target.files[0]);
	}

	  const refresh = () => {
	  	navigate('/home');
	  	navigate('/posts');
	  }

	const handleSubmit = async(e) => {
		e.preventDefault();

		if(!title || !content || !file){
			setValidate(true);
			return;
		}

		const formData = new FormData();

		formData.append("title", title);
		formData.append("image", file);
		formData.append("content", content);

		const post = await axios.post('http://localhost:3001/api/post', formData, 
			{headers : {
		         Authorization : `Bearer ${localStorage.getItem("token")}`
            }}
		).then(refresh()).catch(err => console.log(err))
	}

	return <div className='add-post'>
       <div className='container'>
          <h1>CREATE POST</h1>
          <div className='underline'></div><br />
            <div className='register-form'>
               {validate && <div className='validate'>All fields are required</div>}
               <form onSubmit={handleSubmit} encType="multipart/from-data" >
	             <div className='form-group'>
	                <input type='text' name='title' placeholder='Enter post title' value={title} onChange={(e) => setTitle(e.target.value)} />
	             </div>
	             <div className='form-group'>
	                <label htmlFor='image'><strong>UPLOAD PICTURE</strong></label><br />
	                <input type="file" name='image' onChange={onChangeImage} />
	             </div><br />
	             <div className='form-group'>
	                <textarea rows='6' name='content' placeholder='Post content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
	             </div>
	             <div className='form-group'>
	                <button type='submit' className='post-button'>Post</button>
	             </div>
             </form>
            </div>
       </div>
	</div>
}

export default CreatePost;
