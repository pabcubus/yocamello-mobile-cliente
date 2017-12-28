(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['lodash'];

			var GoogleMapsService = function(lodash) {
				var vm = this;

				vm.markerType = {
					site: {
						url: 'images/gps_me.png',
						size: new google.maps.Size(35, 35),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(35, 35)
					},
					worker: {
						url: 'images/gps_worker.png',
						size: new google.maps.Size(35, 35),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(35, 35)
					}
				};

				vm.createMap 		= createMap;
				vm.setSite 			= setSite;
				vm.setWorker 		= setWorker;
				vm.centerMap 		= centerMap;
				vm.createStaticMap 	= createStaticMap;

				function createStaticMap(points){
					if (!lodash.isArray(points) || (points.length <= 0)) {
						return '';
					}

					let src = 'https://maps.googleapis.com/maps/api/staticmap?size=500x500&maptype=roadmap&key=' + 'AIzaSyDQ-rRq16rEIUX7-dOk5UBM0eEIwJEGDTk';

					points.forEach(function(point){
						src += '&markers=color:' + point.color + '%7C' + point.coordinates;
					});

					return src;
				}

				function createMap(divId, disableDefaultUI, zoom) {
					var component	= document.getElementById(divId);
					var map			= new google.maps.Map(component, {
						center: {
							lat: 40.7591704,
							lng: -74.0392717
						},
						scrollwheel: true,
						disableDefaultUI: lodash.isBoolean(disableDefaultUI) ? disableDefaultUI : false,
						zoom: zoom ? zoom : 8
					});

					map.addListener('bounds_changed', function() {
						var zoom = map.getZoom();
						if (zoom >= 20) {
							map.setZoom(17);
						}
					});

					return map;
				}

				function setSite(map, lat, lng, string, markerId) {
					if (map && lat && lng) {
						var marker = new google.maps.Marker({
							position: {
								lat: lat,
								lng: lng
							},
							map: map,
							icon: 'images/gps_me.png',
							animation: google.maps.Animation.DROP,
							type: 'site',
							id: markerId ? markerId : null
						});

						if (string) {
							var infowindow = new google.maps.InfoWindow({
								content: '<div id="content">' + string + '</div>'
							});

							marker.addListener('click', function() {
								infowindow.open(map, marker);
							});
						}

						return marker;
					}
				}

				function setWorker(map, lat, lng, string, markerId) {
					if (map && lat && lng) {
						var marker = new google.maps.Marker({
							position: {
								lat: lat,
								lng: lng
							},
							map: map,
							icon: 'images/gps_worker.png',
							animation: google.maps.Animation.DROP,
							type: 'site',
							id: markerId ? markerId : null
						});

						if (string) {
							var infowindow = new google.maps.InfoWindow({
								content: '<div id="content">' + string + '</div>'
							});

							marker.addListener('click', function() {
								infowindow.open(map, marker);
							});
						}

						return marker;
					}
				}

				function centerMap(map, markers) {
					var bounds = new google.maps.LatLngBounds();
					//  Go through each...
					lodash.forEach(markers, function(marker) {
						bounds.extend(marker.position);
					});
					//  Fit these bounds to the map
					map.fitBounds(bounds);
				}
			};

			GoogleMapsService.$inject = ngDependencies;
			GoogleMapsService.registeredName = 'GoogleMapsService';
			return GoogleMapsService;
		}
	);
})();
