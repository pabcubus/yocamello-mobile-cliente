(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$state', 'SessionService'];

			var LoginController = function($state, SessionService) {
				var vm = this;

				vm.login = login;

				function login() {
					SessionService.login()
						.then(function(){
							$state.go('home');
						});
				}
			};

			LoginController.$inject = ngDependencies;
			LoginController.registeredName = 'LoginController';
			return LoginController;
		}
	);
})();
