(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$q', 'lodash', 'DataService'];

			var MenuService = function($q, lodash, DataService) {
				var vm = this;

				vm.getMenuOptions = getMenuOptions;

				// let menuOptions = [
				// 	{
				// 		text: 'Hogar',
				// 		menuIcon: 'home.png',
				// 		description: 'Deseas un trabajador para tu hogar?',
				// 		submenu: [
				// 			{
				// 				text: 'Empleadas'
				// 			},
				// 			{
				// 				text: 'Limpieza'
				// 			},
				// 			{
				// 				text: 'Carpinteros'
				// 			}
				// 		]
				// 	},
				// 	{
				// 		text: 'Automoviles',
				// 		menuIcon: 'auto.png',
				// 		description: 'Tienes algun problema con tu automovil?',
				// 		submenu: [
				// 			{
				// 				text: 'Mecanicos'
				// 			},
				// 			{
				// 				text: 'Cambio de Batería'
				// 			}
				// 		]
				// 	}
				// ];

				function getMenuOptions(){
					var deferred	= $q.defer();

					DataService.performOperation(true, '/rest/services/types/nearby?lat=10.93917&lng=-74.79304', 'GET')
						.then(function(result){
							deferred.resolve(result.data);
						})
						.catch(function(error){
							deferred.reject({
								code: '01',
								message: 'Error al obtener las categorias disponibles. Intenta mas tarde.'
							});
						});

					return deferred.promise;
				}
			};

			MenuService.$inject = ngDependencies;
			MenuService.registeredName = 'MenuService';
			return MenuService;
		}
	);
})();
