(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$state', 'SolicitudService'];

			var TerminadoController = function($state, SolicitudService) {
				var vm	= this;

				vm.home = home;
				vm.currentSolicitud = {};

				vm.test	= {};

				_init()

				function _init(){
					vm.currentSolicitud = SolicitudService.getCurrentSolicitud;
				}

				function home(){
					$state.go('home');
				}
			};

			TerminadoController.$inject = ngDependencies;
			TerminadoController.registeredName = 'TerminadoController';
			return TerminadoController;
		}
	);
})();
