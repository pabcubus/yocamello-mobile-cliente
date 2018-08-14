(function() {
	'use strict';

	define(['jsSHA', 'moment'],
		function(jsSHA, moment) {
			var ngDependencies = ['SessionService', '$rootScope', '$state'];

			var RegistroController = function(SessionService, $rootScope, $state) {
				let vm = this;

				vm.password2	= '';
				vm.user 		= {
					"identification": "72345254",
					"genre": "M",
					"lang": "ES",
					"active": true,
					"creationDate": "2017-08-20T19:15:00",
					"usecurity": {}
				};

				vm.registrar	= registrar;

				function registrar() {
					if (vm.password2 != vm.user.usecurity.password) {
						alert('Las contraseñas no son iguales');
					}

					let shaObj = new jsSHA("SHA-256", "TEXT");
					shaObj.update(vm.user.usecurity.password);
					let newPass = shaObj.getHash("HEX");

					vm.user.birthDate			= moment().format('YYYY-MM-DD');
					vm.user.creationDate		= moment().format('YYYY-MM-DDTHH:mm:ss');
					vm.user.usecurity.password 	= newPass;
					vm.user.usecurity.email 	= vm.user.email;

					SessionService.registerUser(vm.user)
						.then(function(){
							$state.go('login');

							alert('Estas registrado. Logueate!');
						})
						.catch(function(err){
							alert(err.message);
						})
						.finally(function(){
							vm.user.usecurity.password = vm.password2;
						});
				}
			};

			RegistroController.$inject = ngDependencies;
			RegistroController.registeredName = 'RegistroController';
			return RegistroController;
		}
	);
})();
