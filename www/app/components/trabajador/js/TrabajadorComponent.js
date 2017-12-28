define([], function () {
	'use strict';

	return {
		bindings: {
			trabajador: '<',
			onAccept: '&',
		},
		controller: 'TrabajadorController',
		controllerAs: 'wc',
		templateUrl: 'app/components/trabajador/html/trabajador.html'
	};
});
