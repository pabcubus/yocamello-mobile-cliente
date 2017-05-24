(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', '$mdDialog', 'GoogleMapsService'];

			var HomeController = function($scope, $mdDialog, GoogleMapsService){
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

				vm.showPrerenderedDialog = showPrerenderedDialog;

				function init(){
					vm.map = GoogleMapsService.createMap('main-map', true);
				}

				function showPrerenderedDialog(ev) {
					$mdDialog.show(
						{
							contentElement: '#myDialog',
							parent: angular.element(document.body),
							targetEvent: ev,
							clickOutsideToClose: true
						}
					);
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
