import React, { Component } from 'react';

class InfoWindow extends Component {
	state = {
		wiki: ''
	};

	componentDidMount() {
		this.getWiki(this.props.marker.title);
	}

	getWiki = title => {
		fetch(
			`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${title}&format=json&limit=2`
		)
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error('error with fetch');
				}
			})
			.then(data => {
				this.setWiki(data);
			})
			.catch(error => {
				alert(error);
			});
	};

	setWiki = data => {
		if (typeof data === 'object' && data[2].length !== 0) {
			this.setState({
				wiki: !(data[2][0].length <= 50 && data[2][1] && data[2][1].length !== '')
					? data[2][0]
					: data[2]
			});
		} else {
			this.setState({
				wiki: 'No data from Wikipedia'
			});
		}
	};

	render() {
		return (
			<div>
				<h3 className="info-title">{this.props.marker.title}</h3>
				<p className="info-text">{this.state.wiki}</p>
			</div>
		);
	}
}

export default InfoWindow;
