(function() {
	'use strict';

	define(['jquery'],
		function($) {
			var ngDependencies = ['$scope', '$state', '$mdSidenav', 'SessionService'];

			var AppController = function($scope, $state, $mdSidenav, SessionService) {
				var vm = this;

				vm.user 			= {};
				vm.toggleUserNav 	= buildToggler('user-nav');
				vm.isLogedIn 		= isLogedIn;
				vm.logout			= logout;

				function isLogedIn() {
					var user = SessionService.getUser();
					return user.loged;
				}

				function buildToggler(componentId) {
					return function() {
						$mdSidenav(componentId).toggle();
					};
				}

				function logout(){
					SessionService.logout()
						.then(function(){
							$state.go('login');
						});
				}
			};

			AppController.$inject = ngDependencies;
			AppController.registeredName = 'AppController';
			return AppController;
		}
	);
})();
