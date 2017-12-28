(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', '$mdDialog', 'lodash'];

			var TrabajadorController = function($scope, $mdDialog, lodash) {
				var vm			= this;

				vm.title		= 'Trabajador Asignado';
				vm.trabajador		= {
					name: vm.name,
					stars: vm.stars
				}

				vm.$onChanges = function (changes) {
					if (lodash.has(changes, 'trabajador'))
						vm.trabajador = changes.trabajador.currentValue;
				}

				vm.acceptTrabajador = acceptTrabajador;
				vm.cancelTrabajador = cancelTrabajador;

				function acceptTrabajador() {
					vm.onAccept();
					$mdDialog.cancel();
				}

				function cancelTrabajador() {
					$mdDialog.cancel();
				}
			};

			TrabajadorController.$inject = ngDependencies;
			TrabajadorController.registeredName = 'TrabajadorController';
			return TrabajadorController;
		}
	);
})();
