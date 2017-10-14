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

				// Services
				'app/services/GoogleMapsService',
				'app/services/SessionService',
				'app/services/MenuService',
				'app/services/UIService',
				'app/services/WorkerService',

				// Controllers for components
				'app/components/loading/js/LoadingController',
				'app/components/worker/js/WorkerController',

				// Directives and Components
				'app/components/loading/js/LoadingComponent',
				'app/components/worker/js/WorkerComponent',

				// Controllers
				'app/AppController',
				'app/screens/home/js/HomeController',
				'app/screens/login/js/LoginController',
				'app/screens/estado/js/EstadoController',

				// ConfigServices
				//'setup/runConfig',
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

				// Services
				GoogleMapsService,
				SessionService,
				MenuService,
				UIService,
				WorkerService,

				// Controllers for Directives and Components
				LoadingController,
				WorkerController,

				// Directives and Components
				LoadingComponent,
				WorkerComponent,

				// Controllers
				AppController,
				HomeController,
				LoginController,
				EstadoController,

				// ConfigServices
				//runConfig,
				routesConfig
			) {
				ng.module('yocamello', ['ngMaterial', 'ui.router', 'angular-md5', 'ngLodash', 'jkAngularRatingStars'])
					// Services
					.service(GoogleMapsService.registeredName, GoogleMapsService)
					.service(SessionService.registeredName, SessionService)
					.service(MenuService.registeredName, MenuService)
					.service(UIService.registeredName, UIService)
					.service(WorkerService.registeredName, WorkerService)

					// Controllers for modules
					.controller(LoadingController.registeredName, LoadingController)
					.controller(WorkerController.registeredName, WorkerController)

					// Directives and Components
					.component('loading', LoadingComponent)
					.component('worker', WorkerComponent)

					// Controllers
					.controller(AppController.registeredName, AppController)
					.controller(HomeController.registeredName, HomeController)
					.controller(LoginController.registeredName, LoginController)
					.controller(EstadoController.registeredName, EstadoController)

					//.run(runConfig)
					.config(routesConfig);

				ng.bootstrap(document, ['yocamello']);
			}
		);
})();
