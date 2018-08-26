import React from 'react';

function Search(props) {
	return (
		<input
			className="search-input"
			type="text"
			placeholder="Search a location..."
			onChange={e => props.searchLocs(e)}
		/>
	);
}

export default Search;
