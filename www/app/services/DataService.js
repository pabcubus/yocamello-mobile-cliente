(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['lodash', '$q', '$http'];

			var DataService = function(lodash, $q, $http) {
				var vm = this;

				vm.performOperation = performOperation;

				function performOperation(url, operation, data) {
					let deferred = $q.defer();

					let apiurl	= 'http://ec2-13-58-221-170.us-east-2.compute.amazonaws.com:8080/YoCamelloRS/api';

					let httpData = {
						'method': (operation ? operation : 'GET'),
						'url': apiurl + url,
						'data': (data ? data : {})
					};

					$http(httpData).then(function successCallback(response) {
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
