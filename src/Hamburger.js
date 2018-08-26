import React from 'react';

function Hamburger(props) {
	return (
		<div className={props.isOpen ? 'menu open' : 'menu'} onClick={() => props.toggleList()}>
			<div className="menu__icon">
				<div className="menu__line menu__line--1" />
				<div className="menu__line menu__line--2" />
				<div className="menu__line menu__line--3" />
			</div>
		</div>
	);
}

export default Hamburger;
