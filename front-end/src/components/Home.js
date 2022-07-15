import { useNavigate } from "react-router-dom";
import { FaAngleRight } from 'react-icons/fa';

const Home = () => {

	const navigate = useNavigate();
	
	return <div className='home'>
       <div className='container'>
          <span className='call-to-action'>
             <h2>WE SHARE IDEAS</h2>
             <button className='browse' onClick={() => navigate('/posts')}>EXPLORE POSTS &nbsp;<FaAngleRight /></button>
          </span>
       </div>
	</div>
}

export default Home;
