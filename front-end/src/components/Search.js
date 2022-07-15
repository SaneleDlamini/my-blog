import { useState } from 'react';

const Search = ({placeholder, data, filters}) => {

	const [filteredData, setFilteredData] = useState([]);

		const handleInput = (e) => {
			const searchTerm = e.target.value;

			const findings = data.filter(search => {
				return search.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
			if(searchTerm === ""){
				setFilteredData(data);
			}else{
				setFilteredData(findings);
			}
			filters(filteredData);
		}

	return (
		<div className='search-container'>
           <input type="text" className='search' placeholder={placeholder} onChange={handleInput} />
        </div>
	)
}

export default Search;