(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['lodash'];

			var GoogleMapsService = function(lodash) {
				var vm = this;

				vm.createStaticMap	= createStaticMap;
				vm.createMap 		= createMap;
				vm.setMarker 		= setMarker;
				vm.setFault 		= setFault;
				vm.centerMap 		= centerMap;
				vm.highlightMarker	= highlightMarker;

				vm.markerType = {
					site: {
						url: 'app/images/map-marker.png',
						size: new google.maps.Size(39, 39),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 32)
					},
					site_bad: {
						url: 'app/images/map-marker-red.png',
						size: new google.maps.Size(39, 39),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 32)
					}
				};

				function highlightMarker(marker) {
					google.maps.event.trigger(marker, 'click');
				}

				function createStaticMap(points, width, height){
					if (!lodash.isArray(points) || (points.length <= 0)) {
						return '';
					}

					let src = 'https://maps.googleapis.com/maps/api/staticmap?size=' + (width ? width : '500') + 'x' + (height ? height : '500') + '&maptype=roadmap&key=' + 'AIzaSyDQ-rRq16rEIUX7-dOk5UBM0eEIwJEGDTk';

					points.forEach(function(point){
						src += '&markers=color:' + (point.color ? 'red' : point.color) + '%7C' + point.coordinates;
					});

					return src;
				}

				function createMap(divId, zoom) {
					let DOMObject 	= document.getElementById(divId);
					let map 		= new google.maps.Map(DOMObject, {
						center: {
							lat: 40.7591704,
							lng: -74.0392717
						},
						disableDefaultUI: true,
						disableDoubleClickZoom: true,
						gestureHandling: 'none',
						scrollwheel: true,
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

				function setMarker(map, lat, lng, markerId, string) {
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
					let bounds = new google.maps.LatLngBounds();

					if (lodash.isArray(markers)) {
						// Go through each...
						lodash.forEach(markers, function(marker) {
							bounds.extend(marker.position);
						});

						// Fit these bounds to the map
						map.fitBounds(bounds);
					} else {
						let center = new google.maps.LatLng(54.235840, -4.573973);
						// Using global variable:
						map.setCenter(center);
						map.setZoom(5);
					}
				}
			};

			GoogleMapsService.$inject = ngDependencies;
			GoogleMapsService.registeredName = 'GoogleMapsService';
			return GoogleMapsService;
		}
	);
})();
