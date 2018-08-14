(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['lodash', '$timeout', '$scope', '$state', '$stateParams', 'SessionService', 'SolicitudService', 'UIService'];

			var EstadoController = function(lodash, $timeout, $scope, $state, $stateParams, SessionService, SolicitudService, UIService) {
				var vm	= this;

				vm.solicitud		= {
					serviceId: 0,
					estados: []
				};

				vm.terminarTrabajo	= terminarTrabajo;
				vm.cancelarTrabajo	= cancelarTrabajo;
				vm.checkInterval	= null;
				vm.user				= {};

				_init()

				function _init(){
					vm.user					= SessionService.getUser();
					vm.solicitud.serviceId	= $stateParams.serviceId;

					vm.checkInterval = setInterval(() => {
						SolicitudService.historySolicitud(vm.user, vm.solicitud).then(function(response){
							vm.solicitud.estados = response.serviceHistory;

							if (lodash.isArray(vm.solicitud.estados) &&
								vm.solicitud.estados.length > 0 &&
								vm.solicitud.estados[vm.solicitud.estados.length - 1].status == 'OP'){
									clearInterval(vm.checkInterval);
								}
						});
					}, 3000);
				}

				function terminarTrabajo(){
					let terminado = confirm('Deseas terminar el trabajo?');
					if (terminado) {
						UIService.showLoadingScreen('Terminando el trabajo');

						/*
						let promises = [
							SolicitudService.doneSolicitud(vm.user, vm.solicitud),
							SolicitudService.paySolicitud(vm.user, vm.solicitud)
						];

						Promise.all(promises)
							.then(function(result){
								$state.go('terminado');

								UIService.hideLoadingScreen();
							});
						*/

						SolicitudService.doneSolicitud(vm.user, vm.solicitud).then((result1) => {
							SolicitudService.paySolicitud(vm.user, vm.solicitud).then((result2) => {
								$state.go('terminado');
								UIService.hideLoadingScreen();
							})
							.catch((err) => {
								alert(lodash.has(err.message) ? err.message : 'Hubo un error. Favor contactar con la empresa.');
							});
						})
						.catch((err) => {
							alert(lodash.has(err.message) ? err.message : 'Hubo un error. Favor contactar con la empresa.');
						});

					}
				}

				function cancelarTrabajo(){
					let terminado = confirm('Deseas cancelar el trabajo? (Recuerda que puede generar algun cobro)');
					if (terminado) {
						UIService.showLoadingScreen('Cancelando el trabajo');

						let promises = [
							SolicitudService.cancelSolicitud(vm.user, vm.solicitud)
						];

						Promise.all(promises)
							.then(function(result){
								$state.go('home');

								let cancelacion = result;

								alert('Trabajo cancelado exitosamente!. ' + (cancelacion.cancelPenalty ? `Se te han cobrado $ ${cancelacion.cancelFee}` : ''));

								UIService.hideLoadingScreen();
							});
					}
				}
			};

			EstadoController.$inject = ngDependencies;
			EstadoController.registeredName = 'EstadoController';
			return EstadoController;
		}
	);
})();
