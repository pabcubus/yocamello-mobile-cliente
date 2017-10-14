define([], function () {
	'use strict';

	return {
		bindings: {
			worker: '<',
			onAccept: '&',
		},
		controller: 'WorkerController',
		controllerAs: 'wc',
		templateUrl: 'app/components/worker/html/worker.html'
	};
});
