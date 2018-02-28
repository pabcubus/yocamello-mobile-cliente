(function() {
	'use strict';
	require([
				'angular',
				'jquery',
				'uiRouter',
				'moment',
				'ngLodash',
				'angular-md5',
				'angular-animate',
				'angular-aria',
				'angular-messages',
				'angular-material',
				'jkAngularRatingStars',
				'zSchema',
				'jsSHA',

				// Services
				'app/services/DataService',
				'app/services/HelperService',
				'app/services/GoogleMapsService',
				'app/services/SessionService',
				'app/services/MenuService',
				'app/services/UIService',
				'app/services/SolicitudService',
				'app/services/SchemaService',

				// Controllers for components
				'app/components/loading/js/LoadingController',
				'app/components/trabajador/js/TrabajadorController',

				// Directives and Components
				'app/components/loading/js/LoadingComponent',
				'app/components/trabajador/js/TrabajadorComponent',

				// Controllers
				'app/AppController',
				'app/screens/registro/js/RegistroController',
				'app/screens/home/js/HomeController',
				'app/screens/login/js/LoginController',
				'app/screens/estado/js/EstadoController',
				'app/screens/perfil/js/PerfilController',
				'app/screens/terminado/js/TerminadoController',
				'app/screens/servicios/js/ServiciosController',

				// ConfigServices
				'app/setup/runConfig',
				'app/setup/routesConfig'
			],
			function(
				ng,
				jquery,
				uiRouter,
				moment,
				ngLodash,
				angularMd5,
				angularAnimate,
				angularAria,
				angularMessages,
				angularMaterial,
				jkAngularRatingStars,
				zSchema,
				jsSHA,

				// Services
				DataService,
				HelperService,
				GoogleMapsService,
				SessionService,
				MenuService,
				UIService,
				SolicitudService,
				SchemaService,

				// Controllers for Directives and Components
				LoadingController,
				TrabajadorController,

				// Directives and Components
				LoadingComponent,
				TrabajadorComponent,

				// Controllers
				AppController,
				RegistroController,
				HomeController,
				LoginController,
				EstadoController,
				PerfilController,
				TerminadoController,
				ServiciosController,

				// ConfigServices
				runConfig,
				routesConfig
			) {
				ng.module('yocamello', ['ngMaterial', 'ui.router', 'angular-md5', 'ngLodash', 'jkAngularRatingStars'])
					// Services
					.service(DataService.registeredName, DataService)
					.service(HelperService.registeredName, HelperService)
					.service(GoogleMapsService.registeredName, GoogleMapsService)
					.service(SessionService.registeredName, SessionService)
					.service(MenuService.registeredName, MenuService)
					.service(UIService.registeredName, UIService)
					.service(SolicitudService.registeredName, SolicitudService)
					.service(SchemaService.registeredName, SchemaService)

					// Controllers for modules
					.controller(LoadingController.registeredName, LoadingController)
					.controller(TrabajadorController.registeredName, TrabajadorController)

					// Directives and Components
					.component('loading', LoadingComponent)
					.component('trabajador', TrabajadorComponent)

					// Controllers
					.controller(AppController.registeredName, AppController)
					.controller(RegistroController.registeredName, RegistroController)
					.controller(HomeController.registeredName, HomeController)
					.controller(LoginController.registeredName, LoginController)
					.controller(EstadoController.registeredName, EstadoController)
					.controller(PerfilController.registeredName, PerfilController)
					.controller(TerminadoController.registeredName, TerminadoController)
					.controller(ServiciosController.registeredName, ServiciosController)

					.run(runConfig)
					.config(routesConfig);

				ng.bootstrap(document, ['yocamello']);
			}
		);
})();
