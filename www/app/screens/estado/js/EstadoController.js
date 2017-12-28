(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', 'GoogleMapsService'];

			var EstadoController = function($scope, GoogleMapsService) {
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
				}
			};

			EstadoController.$inject = ngDependencies;
			EstadoController.registeredName = 'EstadoController';
			return EstadoController;
		}
	);
})();
