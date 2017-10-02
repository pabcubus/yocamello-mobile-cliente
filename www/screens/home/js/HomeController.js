(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', '$mdDialog', 'GoogleMapsService', 'MenuService'];

			var HomeController = function($scope, $mdDialog, GoogleMapsService, MenuService) {
				var vm = this;

				vm.menuOptions = MenuService.getMenuOptions();

				vm.openMenu = openMenu;

				function openMenu($mdMenu, ev) {
					$mdMenu.open(ev);
				};

				/*
				vm.map = {};
				vm.mapMarkers = [];
				vm.currentServicio = 1;
				vm.servicios = [{
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

				function init() {
					vm.map = GoogleMapsService.createMap('main-map', true);
					vm.mapMarkers.push(GoogleMapsService.setSite(vm.map, 11.019839, -74.803998, 'Tu Posición', 1));
					vm.mapMarkers.push(GoogleMapsService.setWorker(vm.map, 11.020899, -74.803994, 'Empleada', 2));
					vm.mapMarkers.push(GoogleMapsService.setWorker(vm.map, 11.019439, -74.805037, 'Empleada', 3));
					vm.mapMarkers.push(GoogleMapsService.setWorker(vm.map, 11.018214, -74.803316, 'Empleada', 4));
					GoogleMapsService.centerMap(vm.map, vm.mapMarkers);
				}

				function showPrerenderedDialog(ev) {
					$mdDialog.show({
						controller: 'WorkerController',
						controllerAs: 'wc',
						templateUrl: 'modules/popups/worker/html/worker.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: true
					});
				}

				$scope.$on('$viewContentLoaded', function() {
					init();
				});
				*/
			};

			HomeController.$inject = ngDependencies;
			HomeController.registeredName = 'HomeController';
			return HomeController;
		}
	);
})();
