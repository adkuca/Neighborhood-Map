import React from 'react';

function Hamburger(props) {
	return (
		<button
			className={props.isOpen ? 'menu open' : 'menu'}
			aria-label="Hamburger"
			aria-haspopup="true"
			aria-expanded={props.isOpen ? 'true' : 'false'}
			aria-controls="list"
			onClick={() => props.toggleList()}
		>
			<div className="menu__icon">
				<div className="menu__line menu__line--1" />
				<div className="menu__line menu__line--2" />
				<div className="menu__line menu__line--3" />
			</div>
		</button>
	);
}

export default Hamburger;
