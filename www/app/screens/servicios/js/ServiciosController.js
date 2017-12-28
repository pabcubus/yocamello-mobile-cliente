(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['SolicitudService'];

			var ServiciosController = function(SolicitudService) {
				var vm	= this;

				vm.servicios = SolicitudService.getServicesAvailable();
			};

			ServiciosController.$inject = ngDependencies;
			ServiciosController.registeredName = 'ServiciosController';
			return ServiciosController;
		}
	);
})();
