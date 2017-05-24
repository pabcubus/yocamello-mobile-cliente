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
				'../services/GoogleMapsService',

				// Controllers
				'../AppController',
				'../screens/home/js/HomeController',

				// Controllers for modules

				// Directives

				// ConfigServices
				//'../setup/runConfig',
				'../setup/routesConfig'
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

				// Controllers
				AppController,
				HomeController,

				// Controllers for modules

				// Directives

				// ConfigServices
				//runConfig,
				routesConfig
			) {
				ng.module('yocamello', ['ngMaterial', 'ui.router', 'angular-md5', 'ngLodash', 'jkAngularRatingStars'])
					// Services
					.service(GoogleMapsService.registeredName, GoogleMapsService)

					// Controllers
					.controller(AppController.registeredName, AppController)
					.controller(HomeController.registeredName, HomeController)

					// Controllers for modules

					// Directives

					//.run(runConfig)
					.config(routesConfig);

				ng.bootstrap(document, ['yocamello']);
			}
		);
})();
