import React from 'react';

function ListItem(props) {
	return (
		<li className="list-item" tabIndex="0" onClick={() => props.onItemClick(props.locations)}>
			<h2>{props.locations.title}</h2>
		</li>
	);
}

export default ListItem;
