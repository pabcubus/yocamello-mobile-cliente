(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['SessionService', '$rootScope', '$state'];

			var LoginController = function(SessionService, $rootScope, $state) {
				let vm = this;

				vm.login	= login;
				vm.user		= {
					username: '',
					password: ''
				};

				function login() {
					SessionService.login(vm.user)
						.then(function(data){

							vm.user	= data;

							$rootScope.$broadcast('LOGIN');
							$state.go('home');
						})
						.catch(function(err){
							alert(err.message);
						});
				}
			};

			LoginController.$inject = ngDependencies;
			LoginController.registeredName = 'LoginController';
			return LoginController;
		}
	);
})();
