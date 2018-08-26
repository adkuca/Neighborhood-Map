import React, { Component } from 'react';
import Hamburger from './Hamburger';
import ListItem from './ListItem';
import Search from './Search';

class Sidebar extends Component {
	state = {
		isOpen: true
	};
	componentWillMount() {
		this.updateDimensions();
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}
	updateDimensions = () => {
		this.setState({ isOpen: window.innerWidth <= 1040 ? false : true });
	};

	toggleList = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		const filteredLocs = this.props.locations.filter(
			loc => loc.title.toLowerCase().indexOf(this.props.query.toLowerCase()) !== -1
		);

		return (
			<aside className="sidebar">
				<header className="sidebar-header" role='heading' aria-level='1'>
					<h1 className="sidebar-heading">
						Croatias <br />
						National Parks
					</h1>
					<Hamburger isOpen={this.state.isOpen} toggleList={this.toggleList} />
				</header>
				<nav className={this.state.isOpen ? 'nav' : 'nav hidden'}>
					<Search searchLocs={this.props.searchLocs} />
					<ul id="list" className="list">
						{filteredLocs.map((loc, index) => (
							<ListItem
								key={index}
								location={loc}
								onItemClick={loc => {
									this.toggleList();
									this.props.onItemClick(loc);
								}}
							/>
						))}
					</ul>
				</nav>
			</aside>
		);
	}
}

export default Sidebar;
