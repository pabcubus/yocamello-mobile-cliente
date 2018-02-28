(function() {
	'use strict';

	define(['jsSHA'],
		function(jsSHA) {
			var ngDependencies = ['$state', '$q', 'lodash', 'HelperService', 'SchemaService', 'DataService'];

			var SessionService = function($state, $q, lodash, HelperService, SchemaService, DataService) {
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
					let deferred = $q.defer();

					let shaObj = new jsSHA("SHA-256", "TEXT");
					shaObj.update(user.password);
					let newPass = shaObj.getHash("HEX");

					vm.user		= {
						username: user.username,
						password: newPass
					};

					DataService.performOperation('/rest/auth', 'POST', vm.user)
						.then(function(result){
							vm.user.token	= result;
							vm.user.loged	= true;

							HelperService.storage.set(HelperService.constants.LOCALSTORAGE_USER_TAG, vm.user, true);

							deferred.resolve(vm.user);
						})
						.catch(function(error){
							vm.logout();
							deferred.reject({
								code: '01',
								message: 'Error al loguearte. Intenta mas tarde.'
							});
						});

					return deferred.promise;
				}

				function logout(){
					var deferred = $q.defer();

					vm.user		= {
						username: '',
						password: '',
						loged: false
					};

					HelperService.storage.remove(HelperService.constants.LOCALSTORAGE_USER_TAG);

					deferred.resolve();

					return deferred.promise;
				}

				function registerUser(){
					var deferred = $q.defer();

					vm.user		= {
						username: '',
						password: '',
						loged: false
					};

					HelperService.storage.remove(HelperService.constants.LOCALSTORAGE_USER_TAG);

					deferred.resolve();

					return deferred.promise;
				}

				function getUser(){
					return vm.user;
				}

				function _checkUser(){
					vm.user = HelperService.session.getUser();

					if (!SchemaService.validateUser(vm.user)){
						HelperService.storage.remove(HelperService.constants.LOCALSTORAGE_USER_TAG);
						vm.user		= {
							username: '',
							password: '',
							loged: false
						};
						$state.go('login');
					}
				}
			};

			SessionService.$inject = ngDependencies;
			SessionService.registeredName = 'SessionService';
			return SessionService;
		}
	);
})();
