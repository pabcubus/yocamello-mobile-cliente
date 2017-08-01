(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$q', 'lodash'];

			var SessionService = function($q, lodash) {
				var vm = this;

				vm.user		= {
					username: '',
					name: '',
					loged: false
				};

				vm.login	= login;
				vm.logout	= logout;
				vm.getUser	= getUser;

				function login(){
					var deferred = $q.defer();

					vm.user		= {
						username: 'pbassil',
						name: 'Pablo Bassil',
						loged: true
					};

					deferred.resolve();

					return deferred.promise;
				}

				function logout(){
					var deferred = $q.defer();

					vm.user		= {
						username: '',
						name: '',
						loged: false
					};

					deferred.resolve();

					return deferred.promise;
				}

				function getUser(){
					return vm.user;
				}
			};

			SessionService.$inject = ngDependencies;
			SessionService.registeredName = 'SessionService';
			return SessionService;
		}
	);
})();
