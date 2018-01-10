(function() {
	'use strict';

	define(['jquery'],
		function($) {
			var ngDependencies = ['$scope', '$state', '$mdSidenav', 'SessionService'];

			var AppController = function($scope, $state, $mdSidenav, SessionService) {
				var vm = this;

				vm.user 			= {};
				vm.sidenavId		= 'user-nav';

				vm.toggleUserNav 	= buildToggler(vm.sidenavId);
				vm.isLogedIn 		= isLogedIn;
				vm.logout			= logout;
				vm.closeSideNav		= closeSideNav;

				$scope.$on('LOGIN', function(){
					if ($mdSidenav(vm.sidenavId).isOpen()) {
						vm.toggleUserNav();
					}
				})

				function isLogedIn() {
					var user = SessionService.getUser();
					return user.loged;
				}

				function buildToggler(componentId) {
					return function() {
						$mdSidenav(componentId).toggle();
					};
				}

				function closeSideNav(){
					$mdSidenav(vm.sidenavId).close();
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
