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
				'services/GoogleMapsService',
				'services/SessionService',
				'services/MenuService',
				'services/UIService',
				'services/WorkerService',

				// Directives

				// Controllers
				'AppController',
				'screens/home/js/HomeController',
				'screens/login/js/LoginController',

				// Controllers for components
				'components/worker/js/WorkerController',

				// ConfigServices
				//'setup/runConfig',
				'setup/routesConfig'
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

				// Directives

				// Controllers
				AppController,
				HomeController,
				LoginController,

				// Controllers for modules
				WorkerController,

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

					// Directives

					// Controllers
					.controller(AppController.registeredName, AppController)
					.controller(HomeController.registeredName, HomeController)
					.controller(LoginController.registeredName, LoginController)

					// Controllers for modules
					.controller(WorkerController.registeredName, WorkerController)

					//.run(runConfig)
					.config(routesConfig);

				ng.bootstrap(document, ['yocamello']);
			}
		);
})();
