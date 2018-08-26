import React, { Component } from 'react';

class GoogleMaps extends Component {
	// creates an async script
	componentDidMount() {
		if (!window.google) {
			const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCFcUWLvBJmlYRSe5VMIpDlpcy6KjguPJM&v=3&`;
			s.onload = () => this.googleSuccess();
			s.onerror = () => this.googleError();
			const script = document.getElementsByTagName('script')[0];
			script.parentNode.insertBefore(s, script);
			s.addEventListener('load', e => this.onScriptLoad());
		} else {
			this.onScriptLoad();
		}
	}
	
	googleSuccess = () => console.log('Google Maps script successfully loaded.');
	googleError = () => alert('Google Maps script failed to load.');

	onScriptLoad = () => {
		const map = new window.google.maps.Map(document.getElementById(this.props.id), this.props.options);
		this.props.onMapLoad(map);
	};

	render() {
		return <div id={this.props.id} role="application" aria-label="location" />;
	}
}

export default GoogleMaps;
