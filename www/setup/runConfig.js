define([], function() {
		function config($rootScope, $location, SessionService, HelperService) {
			$rootScope.$on('$locationChangeSuccess', function(event, next, current) {
				if (SessionService.logedIn) {
					var path = $location.path();
					var valid = HelperService.string.checkStringRegex(path, /^(\/(\w|\?|\&)+)+$/i);
					var url = valid && (path != '/login') ? path : '/overview';

					$location.path(url);
				} else {
					$location.path('/login');
				}

				$rootScope.$broadcast('SET_SESSION_DATA', {
					'user': SessionService.user,
					'logedIn': SessionService.logedIn
				});
			});
		}
		config.$inject = ['$rootScope', '$location', 'SessionService', 'HelperService'];

		return config;
	}
);
