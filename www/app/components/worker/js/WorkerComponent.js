define([], function () {
	'use strict';

	return {
		bindings: {
			name: '<',
			stars: '<'
		},
		controller: 'WorkerController',
		controllerAs: 'wc',
		templateUrl: 'app/components/worker/html/worker.html'
	};
});
