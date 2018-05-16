import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import DG from '2gis-maps';
import { User } from '../user';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) { }
  error = false;
  map;
  containerMarkers = [];
  markers = [];
  user: User = new User();

	saveMarkers() {
		this.mapService.setMarkers(this.user, this.containerMarkers)
			.subscribe((data) => {
				if(!data){
					this.error = true;
					setTimeout(() => {
						this.error = false;
					}, 2000)
				}
			},
			error => console.log(error)
		)
	}

	showMarkers() {
		this.mapService.getMarkers(this.user)
			.subscribe((data: any) => {
				if(data){
					for(let marker of data.markers){
						DG.marker([marker.lat, marker.lng]).addTo(this.map);
						this.containerMarkers.push({
							lat: marker.lat,
							lng: marker.lng
						});
					}

				} else {
					this.error = true;
					setTimeout(() => {
						this.error = false;
					}, 2000)
				}
			},
			error => console.log(error)
		)		
	}

  ngOnInit() {
  	this.map = DG.map('map', {
		  'center': [46.48, 30.72],
		  'zoom': 13
		});

		this.map.locate({
			'setView': true,
		});

		this.map.on('click', (event) => {
			DG.marker([event.latlng.lat, event.latlng.lng]).addTo(this.map);
			this.containerMarkers.push({
				lat: event.latlng.lat,
				lng: event.latlng.lng
			});
		});

		this.user.name = localStorage.getItem('name')
		this.user.login = localStorage.getItem('login')
		this.user.password = localStorage.getItem('password')

  }

}
