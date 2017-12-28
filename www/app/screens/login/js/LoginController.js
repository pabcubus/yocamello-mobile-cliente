(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$rootScope', '$state', 'SessionService'];

			var LoginController = function($rootScope, $state, SessionService) {
				var vm = this;

				vm.login	= login;
				vm.user		= {};

				function login() {
					SessionService.login(vm.user)
						.then(function(){
							$rootScope.$broadcast('LOGIN');
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
