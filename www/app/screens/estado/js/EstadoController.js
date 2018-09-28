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

				$scope.$on('$viewContentLoaded', function(event){
					_init()
				});

				function _init(){
					vm.user					= SessionService.getUser();
					vm.solicitud.serviceId	= $stateParams.serviceId;

					if (!vm.solicitud.serviceId)
						return;

					vm.checkInterval = setInterval(() => {
						SolicitudService.historySolicitud(vm.user, vm.solicitud)
							.then(function(response){
								if (!lodash.isArray(response.serviceHistory) || response.serviceHistory.length <= 0)
									return;

								let lastStatus = response.serviceHistory[response.serviceHistory.length - 1];

								if (lastStatus.status === 'OK'){
									$state.go('home');
									alert('El trabajo ha sido finalizado!');
									clearInterval(vm.checkInterval);
									return;
								}

								vm.solicitud.estados = response.serviceHistory;
								vm.solicitud.isCancelable = (lastStatus.status.indexOf(['EN','CW','CU','OK']) != -1) ? false : true;
								vm.solicitud.isTerminable = (lastStatus.status === 'OP') ? true : false;

								if (lodash.isArray(vm.solicitud.estados) &&
									vm.solicitud.estados.length > 0 &&
									vm.solicitud.estados[vm.solicitud.estados.length - 1].status == 'OP'){
										clearInterval(vm.checkInterval);
									}
							});
					}, 5000);
				}

				function terminarTrabajo(){
					let terminado = confirm('Deseas terminar el trabajo?');
					if (terminado) {
						UIService.showLoadingScreen('Terminando el trabajo');

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

						let descripcion =  prompt("Por favor, ingrese la causa de su cancelación") || 'Sin Descripcion';

						UIService.showLoadingScreen('Cancelando el trabajo');

						let promises = [
							SolicitudService.cancelSolicitud(vm.user, vm.solicitud, descripcion)
						];

						Promise.all(promises)
							.then(function(result){
								$state.go('home');

								let cancelacion = result;

								alert('Trabajo cancelado exitosamente!. ' + (cancelacion.cancelPenalty ? `Se te han cobrado $ ${cancelacion.cancelFee}` : ''));

								clearInterval(vm.checkInterval);

								UIService.hideLoadingScreen();
							})
							.catch(function(err){
								console.log(err);
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
