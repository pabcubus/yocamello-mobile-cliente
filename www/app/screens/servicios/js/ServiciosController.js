(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['SolicitudService', 'SessionService', 'UIService'];

			var ServiciosController = function(SolicitudService, SessionService, UIService) {
				var vm	= this;

				_init();

				function _init(){
					UIService.showLoadingScreen('Buscando servicios');

					let user = SessionService.getUser();

					SolicitudService.getServicesAvailable(user)
						.then(function(servicios){
							vm.servicios = servicios.filter(serv => serv.status == 'OK');
						})
						.catch(function(){
						})
						.finally(function(){
							UIService.hideLoadingScreen('Buscando servicios');
						})
				}
			};

			ServiciosController.$inject = ngDependencies;
			ServiciosController.registeredName = 'ServiciosController';
			return ServiciosController;
		}
	);
})();
