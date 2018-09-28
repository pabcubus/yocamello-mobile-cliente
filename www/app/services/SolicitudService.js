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
				vm.notAssignedSolicitud	= notAssignedSolicitud;

				vm.checkCalls			= 0;
				vm.limitCheckCalls		= 20;

				function getCurrentSolicitud(){
					return vm.currentSolicitud;
				}

				function getServicesAvailable(user, statuses) {
					let deferred		= $q.defer();
					let token			= HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);
					let statusFilter	= '';

					if (
						lodash.isArray(statuses) &&
						statuses.length > 0 &&
						(statuses.filter(status => (!lodash.isString(status) || status.length <= 0))).length == 0){
						statusFilter = ('&status=' + statuses.join('&status='));
					}

					DataService.performOperation(token, `/rest/users/${user.id}/services?skip=0&limit=10${statusFilter}`, 'GET')
						.then(function(result){
							deferred.resolve(result.data);
						})
						.catch(function(err){
							deferred.reject(err);
						});

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
							multiple: true,
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
							deferred.reject(err.data);
						});

					return deferred.promise;
				};

				function checkSolicitud(user, serviceRequested, wait){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return new Promise((resolve, reject) => {
						setTimeout(() => {
							DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/check', 'GET')
								.then((result) => {
									if (wait) {
										if (result.data.serviceStatus == 'PA' && vm.checkCalls < vm.limitCheckCalls) {
											vm.checkCalls++;

											resolve(vm.checkSolicitud(user, serviceRequested, true));
										} else {
											vm.checkCalls		= 0;
											vm.currentSolicitud = result.data;
											resolve(result.data);
										}
									} else {
										return result.data;
									}
								})
								.catch((err) => {
									reject({
										message: HelperService.validation.validateError(err)
									});
								});
						}, 1000)
					});
					//
					// return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/check', 'GET')
					// 	.then((result) => {
					// 		if (wait) {
					// 			if (result.data.serviceStatus == 'PA' && vm.checkCalls < 10) {
					// 				vm.checkCalls++;
					// 				return vm.checkSolicitud(user, serviceRequested, true);
					// 			} else {
					// 				vm.checkCalls		= 0;
					// 				vm.currentSolicitud = result.data;
					// 				return result.data;
					// 			}
					// 		} else {
					// 			return result.data;
					// 		}
					// 	})
					// 	.catch((err) => {
					// 		return {
					// 			message: HelperService.validation.validateError(err)
					// 		};
					// 	});
				};

				function assignSolicitud(user, serviceRequested){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return new Promise((resolve, reject) => {
						setTimeout(() => {
							DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/assign', 'POST')
								.then((result) => {
									if (result.data.serviceStatus == 'PA' && vm.checkCalls < vm.limitCheckCalls) {
										vm.checkCalls++;
										resolve(vm.checkSolicitud(user, serviceRequested, true));
									} else if (vm.checkCalls < 10){
										resolve(vm.assignSolicitud(user, serviceRequested));
									} else {
										vm.checkCalls = 0;
									}
								})
								.catch((err) => {
									reject({
										message: HelperService.validation.validateError(err)
									});
								});
						}, 1000)
					});

					//
					// return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/assign', 'POST')
					// 	.then((result) => {
					// 		if (result.data.serviceStatus == 'PA' && vm.checkCalls < 10) {
					// 			vm.checkCalls++;
					// 			return vm.checkSolicitud(user, serviceRequested, true);
					// 			vm.checkCalls++;
					// 		} else if (vm.checkCalls < 10){
					// 			return vm.assignSolicitud(user, serviceRequested);
					// 		} else {
					// 			vm.checkCalls = 0;
					// 		}
					// 	})
					// 	.catch((err) => {
					// 		return {
					// 			message: HelperService.validation.validateError(err)
					// 		};
					// 	});
				};

				function historySolicitud(user, serviceRequested){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/history', 'GET')
						.then((result) => {
							return result.data;
						})
						.catch((err) => {
							return {
								message: HelperService.validation.validateError(err)
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
								message: HelperService.validation.validateError(err)
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
								message: HelperService.validation.validateError(err)
							};
						});
				};

				function cancelSolicitud(user, serviceRequested, reason){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/cancel', 'POST', {
						"cancelDetail": reason
						})
						.then((result) => {
							return result.data;
						})
						.catch((err) => {
							return {
								message: HelperService.validation.validateError(err)
							};
						});
				};

				function notAssignedSolicitud(serviceRequested){
					let token = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);

					return DataService.performOperation(token, '/rest/services/' + serviceRequested.serviceId + '/notassigned', 'POST')
						.then((result) => {
							return result.data;
						})
						.catch((err) => {
							return {
								message: HelperService.validation.validateError(err)
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
