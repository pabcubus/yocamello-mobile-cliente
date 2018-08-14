(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$state', '$scope', '$timeout', 'MenuService', 'UIService', 'SolicitudService', 'SessionService'];

			var HomeController = function($state, $scope, $timeout, MenuService, UIService, SolicitudService, SessionService) {
				var vm					= this;

				vm.menuOptions			= [];

				vm.openMenu				= openMenu;
				vm.selectOption			= selectOption;
				vm.acceptSolicitud		= acceptSolicitud
				vm.acceptarTest			= acceptarTest;

				vm.currentTrabajador	= {};
				vm.currentSolicitud		= null;

				$scope.$on('$viewContentLoaded', function(event){
					onInit();
				});

				function onInit() {
					let user = SessionService.getUser();

					vm.currentTrabajador	= {
						name: 'Pablo Bassil',
						stars: 4
					};

					SolicitudService.getServicesAvailable(user, ['RQ','PA','AS','OP','EN'])
						.then(servicios => {
							vm.currentSolicitud	= servicios.length > 0 ? servicios[0] : null;
						})
						.catch((err) => {
							console.log(err);
						});

					MenuService.getMenuOptions()
						.then(function(result){
							vm.menuOptions = result;
						})
						.catch(function(error){
							alert(error.message);
						});
				}

				function openMenu($mdMenu, ev) {
					$mdMenu.open(ev);
				};

				function selectOption(servicio, created) {
					UIService.showLoadingScreen('Buscando...');

					let user = SessionService.getUser();

					SolicitudService.requestSolicitud(user, servicio, 10.936224, -74.794044).then((serviceResponse) => {
						vm.currentSolicitud = serviceResponse;

						switch (vm.currentSolicitud.serviceStatus) {
							case 'PA':
								SolicitudService.checkSolicitud(user, vm.currentSolicitud, true).then((checkResponse) => {
									vm.currentSolicitud = checkResponse;

									if (vm.currentSolicitud.serviceStatus == 'AS') {
										UIService.hideLoadingScreen();
										setTimeout(() => {
											_workerSeleccionado(vm.currentSolicitud.workerName, vm.currentSolicitud.workerRating);
										}, 300);
									} else {
										UIService.hideLoadingScreen();
										SolicitudService.notAssignedSolicitud(vm.currentSolicitud).then(() => {
											alert('No se pudo encontrar un trabajador disponible. Intente mas tarde.');
										});
									}
								});
								break;
							case 'RQ':
								SolicitudService.assignSolicitud(user, vm.currentSolicitud).then((checkResponse) => {
									vm.currentSolicitud = checkResponse;

									if (vm.currentSolicitud.serviceStatus == 'AS') {
										UIService.hideLoadingScreen();
										setTimeout(() => {
											_workerSeleccionado(vm.currentSolicitud.workerName, vm.currentSolicitud.workerRating);
										}, 300);
										//_workerSeleccionado(vm.currentSolicitud.workerName, vm.currentSolicitud.workerRating);
									} else {
										UIService.hideLoadingScreen();
										SolicitudService.notAssignedSolicitud(vm.currentSolicitud).then(() => {
											alert('No se pudo encontrar un trabajador disponible. Intente mas tarde.');
										});
									}
								});
								break;
						}
					})
					.catch(function(err){
						alert(err.message || 'Hubo un error. Intenta mas tarde.');
						UIService.hideLoadingScreen();
					})
					.finally();
				};

				function _workerSeleccionado(name, stars){
					vm.currentTrabajador = {
						'name': name,
						'stars': stars
					};

					$timeout(function(){
						SolicitudService.showTrabajadorDialog();
					}, 100);
				}

				function acceptSolicitud() {
					$state.go('estado', {serviceId: vm.currentSolicitud.serviceId});
				};

				function acceptarTest(){
					$state.go('estado', {serviceId: 21});
				}
			};

			HomeController.$inject = ngDependencies;
			HomeController.registeredName = 'HomeController';
			return HomeController;
		}
	);
})();
