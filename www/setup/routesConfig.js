define([], function() {
		function config($urlRouterProvider, $stateProvider, $compileProvider) {
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

			$urlRouterProvider.otherwise('/login');
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'screens/login/html/login.html'
				})
				.state('home', {
					url: '/home',
					templateUrl: 'screens/home/html/home.html',
					controller: 'HomeController',
					controllerAs: 'hc'
				})
				/*
				.state('overview', {
					url: '/overview',
					templateUrl: 'screens/overview/html/overview.html',
					controller: 'OverviewController',
					controllerAs: 'oc'
				})*/
				;
		}
		config.$inject = ['$urlRouterProvider', '$stateProvider', '$compileProvider'];

		return config;
	}
);
