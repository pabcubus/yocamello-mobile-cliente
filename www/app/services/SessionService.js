(function() {
	'use strict';

	define(['jsSHA'],
		function(jsSHA) {
			var ngDependencies = ['$state', '$q', 'lodash', 'HelperService', 'SchemaService', 'DataService'];

			var SessionService = function($state, $q, lodash, HelperService, SchemaService, DataService) {
				var vm 				= this;

				vm.user				= {
					username: '',
					password: '',
					loged: false
				};

				vm.registerUser		= registerUser;
				vm.login			= login;
				vm.logout			= logout;
				vm.getUser			= getUser;
				vm.retornarPassword	= retornarPassword;
				vm.changeAvatar		= changeAvatar;

				_checkUser();

				function login(user){
					let deferred	= $q.defer();

					let shaObj		= new jsSHA("SHA-256", "TEXT");
					shaObj.update(user.password);
					let newPass		= shaObj.getHash("HEX");

					vm.user			= {
						username: user.username,
						password: newPass
					};

					DataService.performOperation(false, '/rest/auth', 'POST', vm.user)
						.then(function(authResult){
							let auth	= authResult.data;

							if (!lodash.isNumber(auth.userId) || !lodash.isString(auth.token) || auth.token.length == 0) {
								deferred.reject({
									code: '01',
									message: 'Error al loguearte. Intenta mas tarde.'
								});
								return;
							}

							let userId	= auth.userId;
							let token	= auth.token;

							HelperService.storage.set(HelperService.constants.LOCALSTORAGE_TOKEN_TAG, token);

							DataService.performOperation(true, '/rest/users/'+userId)
								.then(function(result){
									vm.user			= result.data;
									vm.user.loged	= true;

									HelperService.storage.set(HelperService.constants.LOCALSTORAGE_USER_TAG, vm.user, true);

									deferred.resolve(vm.user);
								})
								.catch(function(err){
									vm.logout();
									deferred.reject({
										code: '01',
										message: err.data.message || 'Usuario no encontrado'
									});
								});
						})
						.catch(function(err){
							deferred.reject({
								code: '01',
								message: err.data.message || 'Error al loguearte. Intenta mas tarde.'
							});
						});

					return deferred.promise;
				}

				function logout(){
					var deferred	= $q.defer();

					vm.user			= {
						username: '',
						password: '',
						loged: false
					};

					HelperService.storage.remove(HelperService.constants.LOCALSTORAGE_USER_TAG);

					deferred.resolve();

					return deferred.promise;
				}

				function registerUser(user){
					var deferred	= $q.defer();

					DataService.performOperation(false, '/rest/users/client', 'POST', user)
						.then(function(result){
							deferred.resolve(result.data);
						})
						.catch(function(error){
							deferred.reject({
								code: '01',
								message: 'Error al registrarte. Intenta mas tarde.'
							});
						});

					return deferred.promise;
				}

				function retornarPassword(user){
					let deferred	= $q.defer();

					DataService.performOperation(false, '/rest/recoverypass', 'POST', {
							"username": user
						})
						.then(function(result){
							deferred.resolve(result.data);
						})
						.catch(function(err){
							deferred.reject(err.data);
						});

					return deferred.promise;
				}

				function changeAvatar(imgString){
					let deferred	= $q.defer();

					DataService.performOperation(true, '/rest/users/' + vm.user.id + '/avatar', 'PUT', {
							"mimeType": "image/jpeg",
							"contents": imgString
						})
						.then(function(result){
							let d = new Date();
							vm.user.uavatar.url = result.data.location + '?t=' + d.getTime();
							deferred.resolve(result.data);
						})
						.catch(function(err){
							deferred.reject(err.data);
						});

					return deferred.promise;
				}

				function getUser(notCached){
					if (!notCached)
						return vm.user;

					let deferred	= $q.defer();

					DataService.performOperation(true, '/rest/users/'+vm.user.id)
						.then(function(result){
							vm.user			= result.data;
							vm.user.loged	= true;

							HelperService.storage.set(HelperService.constants.LOCALSTORAGE_USER_TAG, vm.user, true);

							deferred.resolve(vm.user);
						})
						.catch(function(err){
							vm.logout();
							deferred.reject({
								code: '01',
								message: err.data.message || 'Usuario no encontrado'
							});
						});

					return deferred.promise;
				}

				function _checkUser(){
					vm.user			= HelperService.storage.get(HelperService.constants.LOCALSTORAGE_USER_TAG, true);

					if (!SchemaService.validateUser(vm.user)){
						HelperService.storage.remove(HelperService.constants.LOCALSTORAGE_USER_TAG);
						HelperService.storage.remove(HelperService.constants.LOCALSTORAGE_TOKEN_TAG);
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
