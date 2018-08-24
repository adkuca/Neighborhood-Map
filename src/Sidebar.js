import React, { Component } from 'react';
import ListItem from './ListItem';
import Search from './Search';

class Sidebar extends Component {
	render() {
		const filteredLocs = this.props.locations.filter(
			loc => loc.title.toLowerCase().indexOf(this.props.query.toLowerCase()) !== -1
		);

		return (
			<aside className="sidebar">
				<div>hamburger</div>
				<h1 className="sidebar-heading">
					Croatias <br />
					National Parks
				</h1>
				<Search searchLocs={this.props.searchLocs} />
				<ul id="list" className="list">
					{filteredLocs.map((loc, index) => (
						<ListItem key={index} locations={loc} onItemClick={this.props.onItemClick} />
					))}
				</ul>
			</aside>
		);
	}
}

export default Sidebar;
