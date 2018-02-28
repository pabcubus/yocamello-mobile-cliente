define([], function() {
		function config(
				$stateProvider,
				$compileProvider,
				$locationProvider,
				$mdGestureProvider,
				$urlRouterProvider
			) {

			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

			$mdGestureProvider.skipClickHijack();

			$locationProvider.hashPrefix('');

			$urlRouterProvider.otherwise('/login');
			$stateProvider
				.state('registro', {
					url: '/registro',
					templateUrl: 'app/screens/registro/html/registro.html',
					controller: 'RegistroController',
					controllerAs: 'reg'
				})
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
				.state('servicios', {
					url: '/servicios',
					templateUrl: 'app/screens/servicios/html/servicios.html',
					controller: 'ServiciosController',
					controllerAs: 'sc'
				})
				.state('terminado', {
					url: '/terminado',
					templateUrl: 'app/screens/terminado/html/terminado.html',
					controller: 'TerminadoController',
					controllerAs: 'tc'
				});
		}
		config.$inject = [
			'$stateProvider',
			'$compileProvider',
			'$locationProvider',
			'$mdGestureProvider',
			'$urlRouterProvider'
		];

		return config;
	}
);
