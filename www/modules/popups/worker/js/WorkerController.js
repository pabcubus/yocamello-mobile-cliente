(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$mdDialog', '$timeout'];

			var WorkerController = function($mdDialog, $timeout) {
				var vm = this;

				vm.acceptWorker = acceptWorker;
				vm.cancelWorker = cancelWorker;

				function acceptWorker() {
					$mdDialog.cancel();
				}

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
				}
			};

			WorkerController.$inject = ngDependencies;
			WorkerController.registeredName = 'WorkerController';
			return WorkerController;
		}
	);
})();
