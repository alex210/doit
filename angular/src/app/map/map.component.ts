import { Component, OnInit } from '@angular/core';
import DG from '2gis-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  map;
  containerMarkers = [];
  markers = [];

	saveMarkers() {
	}

	showMarkers() {
	}

  ngOnInit() {
  	this.map = DG.map('map', {
		  'center': [46.48, 30.72],
		  'zoom': 13
		});

		this.map.locate({
			'setView': true,
		});

		// this.map.on('locationfound', function(event) {
		// 	DG.marker([event.latitude, event.longitude]).addTo(this.map);
		// });

		this.map.on('click', (event) => {
			DG.marker([event.latlng.lat, event.latlng.lng]).addTo(this.map);
			this.containerMarkers.push({
				lat: event.latlng.lat,
				lng: event.latlng.lng
			});
		});

  }

}
