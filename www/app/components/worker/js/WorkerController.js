(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope','$mdDialog'];

			var WorkerController = function($scope, $mdDialog) {
				var vm			= this;

				vm.title		= 'Trabajador Asignado';
				vm.worker		= {};

				$scope.$watchGroup(
					['name','stars'],
					function(newValue, oldValue) {
						if (newValue !== oldValue) {
							vm.worker		= {
								name: vm.name,
								stars: vm.stars
							}
						}
					}
				)

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
