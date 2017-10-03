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
				'app/components/worker/js/WorkerController',

				// Directives and Components
				'app/components/worker/js/WorkerComponent',

				// Controllers
				'app/AppController',
				'app/screens/home/js/HomeController',
				'app/screens/login/js/LoginController',

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
				WorkerController,

				// Directives and Components
				WorkerComponent,

				// Controllers
				AppController,
				HomeController,
				LoginController,

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
					.controller(WorkerController.registeredName, WorkerController)

					// Directives and Components
					.component('worker', WorkerComponent)

					// Controllers
					.controller(AppController.registeredName, AppController)
					.controller(HomeController.registeredName, HomeController)
					.controller(LoginController.registeredName, LoginController)

					//.run(runConfig)
					.config(routesConfig);

				ng.bootstrap(document, ['yocamello']);
			}
		);
})();
