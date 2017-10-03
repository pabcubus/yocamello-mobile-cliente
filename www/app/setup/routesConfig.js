define([], function() {
		function config($urlRouterProvider, $stateProvider, $compileProvider) {
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

			$urlRouterProvider.otherwise('/login');
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'app/screens/login/html/login.html',
					controller: 'LoginController',
					controllerAs: 'lc'
				})
				.state('home', {
					url: '/home',
					templateUrl: 'app/screens/home/html/home.html',
					controller: 'HomeController',
					controllerAs: 'hc'
				});
		}
		config.$inject = ['$urlRouterProvider', '$stateProvider', '$compileProvider'];

		return config;
	}
);
