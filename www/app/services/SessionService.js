(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$q', 'lodash', 'HelperService'];

			var SessionService = function($q, lodash, HelperService) {
				var vm = this;

				vm.user		= {
					username: '',
					password: '',
					loged: false
				};

				vm.login	= login;
				vm.logout	= logout;
				vm.getUser	= getUser;

				_checkUser();

				function login(user){
					var deferred = $q.defer();

					vm.user		= {
						username: user.username,
						password: user.password,
						loged: true
					};

					deferred.resolve(vm.user);

					HelperService.storage.set(HelperService.constants.LOCALSTORAGE_USER_TAG, vm.user, true);

					return deferred.promise;
				}

				function logout(){
					var deferred = $q.defer();

					vm.user		= {
						username: '',
						password: '',
						loged: false
					};

					deferred.resolve();

					return deferred.promise;
				}

				function getUser(){
					return vm.user;
				}

				function _checkUser(){
					vm.user = HelperService.session.getUser();
				}
			};

			SessionService.$inject = ngDependencies;
			SessionService.registeredName = 'SessionService';
			return SessionService;
		}
	);
})();
