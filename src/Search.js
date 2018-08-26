import React from 'react';

function Search(props) {
	return (
		<input
			className="search-input"
			type="text"
			role="search"
			placeholder="Search locations..."
			onChange={e => props.searchLocs(e)}
		/>
	);
}

export default Search;
