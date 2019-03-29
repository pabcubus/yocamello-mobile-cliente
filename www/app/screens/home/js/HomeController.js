(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$state', 'lodash', '$scope', '$timeout', 'MenuService', 'UIService', 'SolicitudService', 'SessionService', 'GoogleMapsService'];

			var HomeController = function($state, lodash, $scope, $timeout, MenuService, UIService, SolicitudService, SessionService, GoogleMapsService) {
				var vm						= this;

				vm.menuOptions				= [];

				vm.coordinates				= null;
				vm.gotCoordinates			= true;

				vm.currentTrabajador		= {};
				vm.hasServiciosPendientes	= false;
				vm.currentSolicitud			= null;

				vm.openMenu					= openMenu;
				vm.selectOption				= selectOption;
				vm.acceptSolicitud			= acceptSolicitud;
				vm.acceptarTest				= acceptarTest;
				vm.getCoordinates			= getCoordinates;

				$scope.$on('$viewContentLoaded', function(event){
					vm.getCoordinates();
				});

				function getCoordinates() {
					UIService.showLoadingScreen('Buscando servicios...');

					vm.hasServiciosPendientes	= false;

					let promises = [
						SessionService.getUser(true),
						GoogleMapsService.getCoordinates()
					];

					Promise.all(promises)
						.then((data) => {
							let coords = data[1];
							vm.gotCoordinates = true;
							vm.coordinates = coords;
							_onInit(coords.lat, coords.lng);
						})
						.catch((err) => {
							vm.gotCoordinates = false;
							SolicitudService.getServicesAvailable(user, ['RQ','PA','AS','OP','EN'])
								.then(servicios => {
									vm.currentSolicitud	= servicios.length > 0 ? servicios[0] : null;
								})
								.catch();
							alert.log(err.message);
						})
						.finally(() => {
							UIService.hideLoadingScreen();
						});
				}

				function _onInit(lat, lng) {
					let user = SessionService.getUser();

					SolicitudService.getServicesAvailable(user, ['RQ','PA','AS','OP','EN'])
						.then(servicios => {
							vm.currentSolicitud			= servicios.length > 0 ? servicios[0] : null;
							vm.hasServiciosPendientes	= servicios.length > 0 ? true : false;
						})
						.catch();

					MenuService.getMenuOptions(lat, lng)
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

					if (!vm.coordinates) {
						alert('Hubo un error. Intenta mas tarde.');
						UIService.hideLoadingScreen();
						return;
					}

					SolicitudService.requestSolicitud(user, servicio, vm.coordinates.lat, vm.coordinates.lng).then((serviceResponse) => {
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
