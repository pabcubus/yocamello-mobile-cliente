(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['SessionService', '$rootScope', '$state'];

			var RegistroController = function(SessionService, $rootScope, $state) {
				let vm = this;

				vm.password2	= '';
				vm.user 		= {
					"genre": "M",
					"lang": "ES",
					"active": true,
					"creationDate": "2017-08-20T19:15:00",
					"usecurity": {
						"secretQuestion": "¿Cuál es su color favorito?",
						"secretAnswer": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
						"groupRole": "CLIENT"
					}
				};

				vm.registrar	= registrar;

				function registrar() {
					console.log('vm.user: ', vm.user);
				}
			};

			RegistroController.$inject = ngDependencies;
			RegistroController.registeredName = 'RegistroController';
			return RegistroController;
		}
	);
})();
