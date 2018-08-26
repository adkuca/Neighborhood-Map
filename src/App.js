import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import GoogleMaps from './GoogleMaps';
import InfoWindow from './InfoWindow';
import Sidebar from './Sidebar';

class App extends Component {
	state = {
		locations: [
			{ title: 'Brijuni', location: { lat: 44.912778, lng: 13.763889 } },
			{ title: 'Kornati', location: { lat: 43.796667, lng: 15.332222 } },
			{ title: 'Krka', location: { lat: 43.801944, lng: 15.972778 } },
			{ title: 'Mljet', location: { lat: 42.766667, lng: 17.45 } },
			{ title: 'Paklenica', location: { lat: 44.366667, lng: 15.433333 } },
			{ title: 'Plitvice Lakes', location: { lat: 44.880556, lng: 15.616111 } },
			{ title: 'Risnjak', location: { lat: 45.428333, lng: 14.745 } },
			{ title: 'Northern Velebit', location: { lat: 44.693056, lng: 15.006944 } }
		],
		map: {},
		markers: [],
		wiki: '',
		query: ''
	};

	onReadyInfoWindow = undefined;
	onCloseInfoWindow = undefined;
	infoWindow = undefined;

	// setup map and its markers
	initMap = map => {
		this.setState({ map: map });
		this.infoWindow = new window.google.maps.InfoWindow();
		const markers = [];
		for (const [index, loc] of this.state.locations.entries()) {
			let marker = new window.google.maps.Marker({
				position: loc.location,
				map: this.state.map,
				title: loc.title,
				animation: window.google.maps.Animation.DROP,
				id: index
			});
			markers.push(marker);
			marker.addListener('click', () => this.createInfoWindow(marker, this.infoWindow, this.state.map));
		}
		this.setBounds(markers);
		this.setState({ markers: markers });
	};

	setBounds(markers) {
		const bounds = new window.google.maps.LatLngBounds();
		for (const marker of markers) {
			bounds.extend(marker.position);
		}
		this.state.map.fitBounds(bounds);
	}

	// creates an Infowindow on a location/marker when DOM is ready
	createInfoWindow(marker, infoWindow, map) {
		if (this.onReadyInfoWindow) window.google.maps.event.removeListener(this.onReadyInfoWindow);
		if (this.onCloseInfoWindow) window.google.maps.event.removeListener(this.onCloseInfoWindow);
		infoWindow.marker = marker;
		infoWindow.setContent('<div id="infoWindow" />');
		this.onReadyInfoWindow = infoWindow.addListener('domready', e => {
			render(<InfoWindow marker={marker} />, document.getElementById('infoWindow'));
		});
		this.onCloseInfoWindow = infoWindow.addListener('closeclick', function() {
			infoWindow.marker = null;
		});
		infoWindow.open(map, marker);
	}

	clearInfoWindow() {
		this.infoWindow.close();
		this.infoWindow.marker = null;
	}

	// searches for locations and renders list and markers accordingly
	searchLocs = e => {
		this.setState(
			{
				query: e.target.value
			},
			() => {
				this.clearInfoWindow();
				const setMarkers = [];
				for (const marker of this.state.markers) {
					if (marker.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1) {
						marker.setVisible(true);
						setMarkers.push(marker);
					} else {
						marker.setVisible(false);
					}
				}
				setMarkers.length > 0 ? this.setBounds(setMarkers) : this.setBounds(this.state.markers);
			}
		);
	};

	// zooms into provided location and creates an Infowindow
	onItemClick = loc => {
		this.clearInfoWindow();
		let sMarker = undefined;
		this.state.map.setCenter(loc.location);
		this.state.map.setZoom(9);
		setTimeout(() => {
			this.state.map.setZoom(11);
		}, 750);
		setTimeout(() => {
			for (const marker of this.state.markers) {
				if (marker.title === loc.title && marker.animation === null) {
					marker.setAnimation(4);
					sMarker = marker;
				}
			}
			this.createInfoWindow(sMarker, this.infoWindow, this.state.map);
		}, 1250);
	};

	render() {
		return (
			<div className="App">
				<Sidebar
					locations={this.state.locations}
					onItemClick={this.onItemClick}
					searchLocs={this.searchLocs}
					query={this.state.query}
				/>
				<GoogleMaps
					id="map"
					options={{
						center: { lat: 45.099998, lng: 15.2 },
						zoom: 8,
						maxZoom: 11
					}}
					onMapLoad={this.initMap}
				/>
			</div>
		);
	}
}

export default App;
