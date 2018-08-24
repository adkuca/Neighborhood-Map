import React from 'react';

function Search(props) {
	return <input type="text" placeholder="Search a location..." onChange={e => props.searchLocs(e)} />;
}

export default Search;
