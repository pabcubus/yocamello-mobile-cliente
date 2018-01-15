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
				})
				.state('estado', {
					url: '/estado',
					templateUrl: 'app/screens/estado/html/estado.html',
					controller: 'EstadoController',
					controllerAs: 'ec'
				})
				.state('perfil', {
					url: '/perfil',
					templateUrl: 'app/screens/perfil/html/perfil.html',
					controller: 'PerfilController',
					controllerAs: 'pc'
				})
				.state('terminado', {
					url: '/terminado',
					templateUrl: 'app/screens/terminado/html/terminado.html',
					controller: 'TerminadoController',
					controllerAs: 'tc'
				});
		}
		config.$inject = ['$urlRouterProvider', '$stateProvider', '$compileProvider'];

		return config;
	}
);
