(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$state', '$scope', '$timeout', 'MenuService', 'UIService', 'SolicitudService'];

			var HomeController = function($state, $scope, $timeout, MenuService, UIService, SolicitudService) {
				var vm					= this;

				vm.menuOptions			= MenuService.getMenuOptions();


				vm.openMenu				= openMenu;
				vm.selectOption			= selectOption;
				vm.acceptTrabajador		= acceptTrabajador

				vm.currentTrabajador	= {};

				onInit();

				function onInit(){
					vm.currentTrabajador	= {
						name: 'Pablo Bassil',
						stars: 4
					};
				}

				function openMenu($mdMenu, ev) {
					$mdMenu.open(ev);
				};

				function selectOption() {
					UIService.showLoadingScreen('Buscando...');

					SolicitudService.getTrabajador()
						.then(function(worker){
							UIService.hideLoadingScreen();

							vm.currentTrabajador = {
								name: worker.name,
								stars: worker.stars
							}

							$timeout(function(){
								SolicitudService.showTrabajadorDialog();
							}, 100);
						});
				};

				function acceptTrabajador() {
					alert('Trabajador Aceptado!');
					$state.go('estado');
				};
			};

			HomeController.$inject = ngDependencies;
			HomeController.registeredName = 'HomeController';
			return HomeController;
		}
	);
})();
