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

				// Services
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
				'app/screens/home/js/HomeController',
				'app/screens/login/js/LoginController',
				'app/screens/estado/js/EstadoController',
				'app/screens/perfil/js/PerfilController',
				'app/screens/terminado/js/TerminadoController',

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

				// Services
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
				HomeController,
				LoginController,
				EstadoController,
				PerfilController,
				TerminadoController,

				// ConfigServices
				runConfig,
				routesConfig
			) {
				ng.module('yocamello', ['ngMaterial', 'ui.router', 'angular-md5', 'ngLodash', 'jkAngularRatingStars'])
					// Services
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
					.controller(HomeController.registeredName, HomeController)
					.controller(LoginController.registeredName, LoginController)
					.controller(EstadoController.registeredName, EstadoController)
					.controller(PerfilController.registeredName, PerfilController)
					.controller(TerminadoController.registeredName, TerminadoController)

					.run(runConfig)
					.config(routesConfig);

				ng.bootstrap(document, ['yocamello']);
			}
		);
})();
