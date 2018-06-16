(function() {
	'use strict';

	define(['moment'],
		function(moment) {
			var ngDependencies = ['$q', '$timeout', '$mdDialog', 'lodash', 'GoogleMapsService', 'DataService', 'HelperService'];

			var SolicitudService = function($q, $timeout, $mdDialog, lodash, GoogleMapsService, DataService, HelperService) {
				var vm = this;

				vm.currentTrabajador	= {};
				vm.currentSolicitud		= {};

				vm.getTrabajador		= getTrabajador;
				vm.showTrabajadorDialog	= showTrabajadorDialog;
				vm.getServicesAvailable	= getServicesAvailable;
				vm.requestSolicitud		= requestSolicitud;
				vm.checkSolicitud		= checkSolicitud;
				vm.assignSolicitud		= assignSolicitud;
				vm.historySolicitud		= historySolicitud;
				vm.doneSolicitud		= doneSolicitud;
				vm.paySolicitud			= paySolicitud;
				vm.cancelSolicitud		= cancelSolicitud;

				vm.checkCalls			= 0;

				function getCurrentSolicitud(){
					return vm.currentSolicitud;
				}

				function getServicesAvailable() {
					let services = [
						{
							id: 1,
							ultima_act: '2017-08-12 11:20:00',
							estado: {
								id: 4,
								name: 'Finalizado'
							},
							trabajador: {
								name: 'Jorge Perez',
								stars: 4
							},
							servicio: {
								id: 2,
								name: 'Lavandería'
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
								},
								{
									id: 4,
									date: '2017-08-12 11:20:00',
									estado: {
										id: 4,
										nombre: 'Finalizado'
									}
								}
							]
						},
						{
							id: 2,
							ultima_act: '2017-08-12 11:20:00',
							estado: {
								id: 3,
								name: 'En Camino'
							},
							trabajador: {
								name: 'Jorge Perez',
								stars: 4
							},
							servicio: {
								id: 1,
								name: 'Carpintería'
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
						}
					]

					let deferred = $q.defer();

					lodash.forEach(services, function(service){
						service.ultima_act	= moment(service.ultima_act).format('ll');
						service.mapUrl 		= GoogleMapsService.createStaticMap([
							{coordinates: '11.006459,-74.823036'}
						], 500, 200);
					});

					$timeout(function(){
						deferred.resolve(services);
					}, 2000);

					return deferred.promise;
				};

				function getTrabajador(ev){
					let deferred = $q.defer();

					$timeout(function(){
						vm.currentTrabajador = {
							name: 'Jorge Perez',
							stars: 4
						};

						deferred.resolve(vm.currentTrabajador);
					}, 2000);

					return deferred.promise;
				};

				function showTrabajadorDialog(ev){
					$mdDialog.show(
						{
							contentElement: '#trabajadorDlg',
							parent: angular.element(document.body),
							targetEvent: ev,
							clickOutsideToClose: true
						}
					);
				};

				function requestSolicitud(user, service, lat, lng){
					let deferred = $q.defer();

					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					let payload = {
						"user": {
							"id": user.id
						},
						"service": {
							"id": service.id
						},
						"lat": lat,
						"lng": lng,
						"paymentMethod": {
							"id": 1
						},
						"cashPayment": false,
						"observation": "Prueba de request"
					};

					DataService.performOperation(token, '/rest/services', 'POST', payload)
						.then(function(result){
							deferred.resolve(result.data);
						})
						.catch(function(err){
							deferred.reject(err);
						});

					return deferred.promise;
				};

				function checkSolicitud(user, serviceRequested, wait){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/check', 'GET')
						.then((result) => {
							if (wait) {
								if (result.data.serviceStatus == 'PA' && vm.checkCalls < 10) {
									vm.checkCalls++;
									return vm.checkSolicitud(user, serviceRequested, true);
								} else {
									vm.checkCalls		= 0;
									vm.currentSolicitud = result.data;
									return result.data;
								}
							} else {
								return result.data;
							}
						})
						.catch((err) => {
							return {
								message: 'No se pudo encontrar un trabajador disponible. Intente mas tarde.'
							};
						});
				};

				function assignSolicitud(user, serviceRequested){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/assign', 'POST')
						.then((result) => {
							if (result.data.serviceStatus == 'PA' && vm.checkCalls < 10) {
								vm.checkCalls++;
								return vm.checkSolicitud(user, serviceRequested, true);
								vm.checkCalls++;
							} else if (vm.checkCalls < 10){
								return vm.assignSolicitud(user, serviceRequested);
							} else {
								vm.checkCalls = 0;
							}
						})
						.catch((err) => {
							return {
								message: 'No se pudo encontrar un trabajador disponible. Intente mas tarde.'
							};
						});
				};

				function historySolicitud(user, serviceRequested){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/history', 'GET')
						.then((result) => {
							return result.data;
						})
						.catch((err) => {
							return {
								message: 'No se pudo encontrar un trabajador disponible. Intente mas tarde.'
							};
						});
				};

				function doneSolicitud(user, serviceRequested){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/done', 'POST')
						.then((result) => {
							return result.data;
						})
						.catch((err) => {
							return {
								message: 'No se pudo encontrar un trabajador disponible. Intente mas tarde.'
							};
						});
				};

				function paySolicitud(user, serviceRequested){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/pay', 'POST')
						.then((result) => {
							return result.data;
						})
						.catch((err) => {
							return {
								message: 'No se pudo encontrar un trabajador disponible. Intente mas tarde.'
							};
						});
				};

				function cancelSolicitud(user, serviceRequested){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/cancel', 'POST', {
						"cancelDetail": "Cancelacion test."
						})
						.then((result) => {
							return result.data;
						})
						.catch((err) => {
							return {
								message: 'No se pudo encontrar un trabajador disponible. Intente mas tarde.'
							};
						});
				};
			};

			SolicitudService.$inject = ngDependencies;
			SolicitudService.registeredName = 'SolicitudService';
			return SolicitudService;
		}
	);
})();
