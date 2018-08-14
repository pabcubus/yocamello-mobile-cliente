(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['lodash', '$q', '$http', 'HelperService'];

			var DataService = function(lodash, $q, $http, HelperService) {
				var vm = this;

				vm.performOperation = performOperation;

				function performOperation(useToken, url, operation, data) {
					let deferred	= $q.defer();

					let apiurl		= 'http://ec2-13-58-221-170.us-east-2.compute.amazonaws.com:8080/YoCamelloRS/api';

					let token		= useToken ? HelperService.storage.get(HelperService.constants.LOCALSTORAGE_TOKEN_TAG) : null;

					let httpData 	= {
						'method': (operation ? operation : 'GET'),
						'url': apiurl + url,
						'timeout': 20000
					};

					if (lodash.isObject(data)) {
						httpData.data = data;
					}

					if (lodash.isString(token) && useToken && token.length > 0) {
						httpData.headers = {
							'Authorization'	: ('Bearer ' + token)
						};
					}

					var operation = $http(httpData);

					operation
						.then((response, status, headers) => {
							var test = response.headers('location');
							deferred.resolve(response);
						}, function errorCallback(error) {
							deferred.reject(error);
						});

					return deferred.promise;
				}
			};

			DataService.$inject = ngDependencies;
			DataService.registeredName = 'DataService';
			return DataService;
		}
	);
})();

/*

*/
