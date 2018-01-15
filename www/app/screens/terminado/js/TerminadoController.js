(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$state'];

			var TerminadoController = function($state) {
				var vm	= this;

				vm.home = home;

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
