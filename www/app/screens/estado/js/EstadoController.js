(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['lodash', '$timeout', '$scope', '$state', 'GoogleMapsService', 'UIService'];

			var EstadoController = function(lodash, $timeout, $scope, $state, GoogleMapsService, UIService) {
				var vm	= this;

				vm.map			= {};
				vm.markers		= [];
				vm.solicitud 	= {
					estado: {
						id: 3,
						nombre: 'En Camino'
					},
					trabajador: {
						name: 'Jorge Perez',
						stars: 4
					},
					estados: [
						{
							id: 1,
							date: '2017-08-12 11:15:00',
							estado: {
								id: 1,
								nombre: 'Confirmado'
							}
						},
						{
							id: 2,
							date: '2017-08-12 11:20:00',
							estado: {
								id: 2,
								nombre: 'En Alistamiento'
							}
						},
						{
							id: 3,
							date: '2017-08-12 11:20:00',
							estado: {
								id: 3,
								nombre: 'En Camino'
							}
						}
					]
				};

				vm.terminarTrabajo = terminarTrabajo;

				_init()

				function _init(){
					let points;
					if (vm.solicitud.estado.id == 3) {
						points = [
							{
								latitude: 11.017027,
								longitude: -74.80831
							},
							{
								latitude: 11.019807,
								longitude: -74.804016
							}
						];
					}

					$timeout(function(){
						vm.map = GoogleMapsService.createMap('estado-card-map-wrapper');

						vm.solicitud.estados.push(
							{
								id: 4,
								date: '2017-08-12 12:00:00',
								estado: {
									id: 4,
									nombre: 'Terminado'
								}
							}
						);

						_locateSites(points);

					}, 1000);
				}

				function terminarTrabajo(){
					let terminado = confirm('Deseas terminar el trabajo?');
					if (terminado) {
						UIService.showLoadingScreen('Terminando el trabajo');

						$timeout(function(){
							$state.go('terminado');
							UIService.hideLoadingScreen();
						}, 3000);
					}
				}

				function _locateSites(points){
					if (!points || !lodash.isArray(points) || !vm.map) {
						return;
					}

					// first we clear all the points on the map
					lodash.forEach(vm.markers, function(site) {
						site.setMap( null );
					});
					vm.markers = [];

					// then paint the new points on the map
					var newMarkers = angular.copy(points);
					if (lodash.isArray( newMarkers ) && newMarkers.length > 0) {
						newMarkers.forEach(function(point, index){
							vm.markers.push(
								GoogleMapsService.setMarker(
									vm.map,
									parseFloat(point.latitude),
									parseFloat(point.longitude),
									index
								)
							);
						});

						GoogleMapsService.centerMap(vm.map, vm.markers);
					} else {
						GoogleMapsService.centerMap(vm.map);
					}
				}
			};

			EstadoController.$inject = ngDependencies;
			EstadoController.registeredName = 'EstadoController';
			return EstadoController;
		}
	);
})();
