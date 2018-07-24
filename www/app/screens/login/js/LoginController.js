(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['SessionService', '$rootScope', '$state'];

			var LoginController = function(SessionService, $rootScope, $state) {
				let vm 				= this;

				vm.login			= login;
				vm.retornarPassword	= retornarPassword;
				vm.user				= {
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

				function retornarPassword() {
					var user = prompt("Ingresa tu usuario");
					if (user != null) {
						SessionService.retornarPassword(user)
							.then(function(result){
								alert(result.message || 'Revisa tu correo.');
							})
							.catch(function(err){
								console.log(err);
								alert(err.message || 'Ocurrio un error. Intente mas tarde.');
							})
					}
				}
			};

			LoginController.$inject = ngDependencies;
			LoginController.registeredName = 'LoginController';
			return LoginController;
		}
	);
})();
