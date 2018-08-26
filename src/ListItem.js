import React from 'react';

function ListItem(props) {
	return (
		<li className="list-item" tabIndex="0" onClick={() => props.onItemClick(props.location)}>
			<h2>{props.location.title}</h2>
		</li>
	);
}

export default ListItem;
