(function() {
	'use strict';

	require.config({
		paths: {
			// General dependencies
			'google.maps':				'https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ-rRq16rEIUX7-dOk5UBM0eEIwJEGDTk',
			'moment':					'bower_components/moment/min/moment.min',
			'angular':					'bower_components/angular/angular.min',
			'jquery':					'bower_components/jquery/dist/jquery.min',
			'ngLodash':					'bower_components/ng-lodash/build/ng-lodash.min',
			'uiRouter':					'bower_components/angular-ui-router/release/angular-ui-router.min',
			'angular-md5':				'bower_components/angular-md5/angular-md5.min',
			'angular-animate':			'bower_components/angular-animate/angular-animate.min',
			'angular-aria':				'bower_components/angular-aria/angular-aria.min',
			'angular-messages':			'bower_components/angular-messages/angular-messages.min',
			'angular-material':			'bower_components/angular-material/angular-material.min',
			'jkAngularRatingStars':		'bower_components/angular-jk-rating-stars/dist/jk-rating-stars.min'
		},

		shim: {
			'google.maps':				{ exports: 'google.maps' },
			'moment':					{ exports: 'moment' },
			'angular':					{ exports: 'angular', deps: ['google.maps'] },
			'jquery':					{ exports: 'jquery', deps: ['angular'] },
			'ngLodash':					{ exports: 'ngLodash', deps: ['angular'] },
			'uiRouter':					{ exports: 'uiRouter', deps: ['angular'] },
			'angular-md5':				{ exports: 'angular-md5', deps: ['angular'] },
			'angular-animate':			{ exports: 'angular-animate', deps: ['angular'] },
			'angular-aria':				{ exports: 'angular-aria', deps: ['angular'] },
			'angular-messages':			{ exports: 'angular-messages', deps: ['angular'] },
			'angular-material':			{ exports: 'angular-material', deps: ['angular'] },
			'jkAngularRatingStars':		{ exports: 'jkAngularRatingStars', deps: ['angular'] }
		},

		waitSeconds: 15,

		deps: [
			// kick start application... see bootstrap.js
			'app/setup/app.js'
		]
	});
})();
