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
					if (lodash.has(changes, 'name'))
						vm.worker.name	= changes.name.currentValue;
					if (lodash.has(changes, 'stars'))
						vm.worker.stars	= changes.stars.currentValue;
				}

				vm.acceptWorker = acceptWorker;
				//vm.cancelWorker = cancelWorker;

				function acceptWorker() {
					$mdDialog.cancel();
				}
/*
				function cancelWorker(ev) {
					$mdDialog.cancel()
						.then(function(){
							$mdDialog.show(
								$mdDialog.alert({
									title: 'Info',
									textContent: 'Has cancelado al trabajador',
									ok: 'OK'
								})
							);
						});
				}*/
			};

			WorkerController.$inject = ngDependencies;
			WorkerController.registeredName = 'WorkerController';
			return WorkerController;
		}
	);
})();
