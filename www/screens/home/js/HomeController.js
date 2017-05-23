(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', 'GoogleMapsService'];

			var HomeController = function($scope, GoogleMapsService){
				var vm					= this;

				vm.map = {};
				vm.currentServicio = 1;
				vm.servicios = [
					{
						id: 1,
						nombre: 'Empleada'
					},
					{
						id: 2,
						nombre: 'Cerrajero'
					},
					{
						id: 3,
						nombre: 'Mecanico'
					}
				];

				function init(){
					vm.map = GoogleMapsService.createMap('main-map', true);
				}

				$scope.$on('$viewContentLoaded', function(){
					init();
				});
			};

			HomeController.$inject = ngDependencies;
			HomeController.registeredName = 'HomeController';
			return HomeController;
		}
	);
})();
