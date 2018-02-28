define([], function() {
		function config($rootScope, $location, SessionService, HelperService) {
			$rootScope.$on('$locationChangeSuccess', function(event, next, current) {
				let user = SessionService.getUser();
				let path = $location.path();

				if (user.loged || path == '/registro') {
					var valid = HelperService.string.checkStringRegex(path, /^(\/(\w|\?|\&)+)+$/i);
					var url = valid && (path != '/login') ? path : '/home';

					$location.path(url);
				} else {
					$location.path('/login');
				}
			});
		}
		config.$inject = ['$rootScope', '$location', 'SessionService', 'HelperService'];

		return config;
	}
);
