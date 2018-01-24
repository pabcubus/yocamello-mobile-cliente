(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['SolicitudService', 'UIService'];

			var ServiciosController = function(SolicitudService, UIService) {
				var vm	= this;

				_init();

				function _init(){
					UIService.showLoadingScreen('Buscando servicios');

					SolicitudService.getServicesAvailable()
						.then(function(servicios){
							vm.servicios = servicios;
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
