(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$q', 'lodash', 'DataService'];

			var MenuService = function($q, lodash, DataService) {
				var vm = this;

				vm.getMenuOptions = getMenuOptions;

				function getMenuOptions(){
					var deferred	= $q.defer();

					DataService.performOperation(true, '/rest/services/types/nearby?lat=10.936224&lng=-74.794044', 'GET')
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
