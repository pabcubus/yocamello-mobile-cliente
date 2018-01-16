(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$timeout', '$scope', '$state', 'GoogleMapsService', 'UIService'];

			var EstadoController = function($timeout, $scope, $state, GoogleMapsService, UIService) {
				var vm	= this;

				vm.solicitud = {
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
					if (vm.solicitud.estado.id == 3) {
						let points = [
							{
								color: 'red',
								coordinates: '11.017027,-74.80831'
							},
							{
								color: 'green',
								coordinates: '11.019807,-74.804016'
							}
						]
						vm.mapa = GoogleMapsService.createStaticMap(points);
					}

					$timeout(function(){
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
					}, 3000);
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
			};

			EstadoController.$inject = ngDependencies;
			EstadoController.registeredName = 'EstadoController';
			return EstadoController;
		}
	);
})();
