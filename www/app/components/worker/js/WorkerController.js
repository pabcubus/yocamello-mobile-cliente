(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', '$mdDialog', 'lodash'];

			var WorkerController = function($scope, $mdDialog, lodash) {
				var vm			= this;

				vm.title		= 'Trabajador Asignado';
				vm.worker		= {
					name: vm.name,
					stars: vm.stars
				}

				vm.$onChanges = function (changes) {
					if (lodash.has(changes, 'worker'))
						vm.worker = changes.worker.currentValue;
				}

				vm.acceptWorker = acceptWorker;
				vm.cancelWorker = cancelWorker;

				function acceptWorker() {
					vm.onAccept();
					$mdDialog.hide();
				}

				function cancelWorker() {
					$mdDialog.cancel();
				}
			};

			WorkerController.$inject = ngDependencies;
			WorkerController.registeredName = 'WorkerController';
			return WorkerController;
		}
	);
})();
