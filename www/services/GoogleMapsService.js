(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['lodash'];

			var GoogleMapsService = function(lodash) {
				var vm = this;

				vm.createMap = createMap;
				vm.setSite = setSite;
				vm.setFault = setFault;
				vm.centerMap = centerMap;
				vm.markerType = {
					site: {
						url: 'images/map-marker.png',
						size: new google.maps.Size(39, 39),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 32)
					},
					site_bad: {
						url: 'images/map-marker-red.png',
						size: new google.maps.Size(39, 39),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 32)
					}
				};

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
							icon: vm.markerType.site,
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

				function setFault(map, lat, lng, string, markerId) {
					if (map && lat && lng) {
						var marker = new google.maps.Marker({
							position: {
								lat: lat,
								lng: lng
							},
							map: map,
							icon: vm.markerType.site_bad,
							animation: google.maps.Animation.DROP,
							type: 'fault',
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
