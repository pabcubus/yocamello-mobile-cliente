(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope'];

			var EstadoController = function($scope) {
				var vm	= this;

				vm.solicitud = {
					estado: {
						id: 1,
						nombre: 'En Camino'
					},
					trabajador: {
						name: 'Jorge Perez',
						stars: 4
					},
					estados: [
						{
							date: '2017-08-12 11:15:00',
							descripcion: 'Alistamiento'
						},
						{
							date: '2017-08-12 11:20:00',
							descripcion: 'En camino'
						}
					]
				};
			};

			EstadoController.$inject = ngDependencies;
			EstadoController.registeredName = 'EstadoController';
			return EstadoController;
		}
	);
})();
