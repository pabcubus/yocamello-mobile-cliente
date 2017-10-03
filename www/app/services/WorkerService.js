(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$q', '$timeout', '$mdDialog'];

			var WorkerService = function($q, $timeout, $mdDialog) {
				var vm = this;

				vm.currentWorker	= {};

				vm.getWorker		= getWorker;
				vm.showWorkerDialog	= showWorkerDialog;

				function getWorker(ev){
					let deferred = $q.defer();

					$timeout(function(){
						vm.currentWorker = {
							name: 'Jorge Perez',
							stars: 4
						};

						deferred.resolve(vm.currentWorker);
					}, 2000);

					return deferred.promise;
				};

				function showWorkerDialog(ev){
					$mdDialog.show(
						{
							contentElement: '#workerDlg',
							parent: angular.element(document.body),
							targetEvent: ev,
							clickOutsideToClose: true
						}
					);
				}
			};

			WorkerService.$inject = ngDependencies;
			WorkerService.registeredName = 'WorkerService';
			return WorkerService;
		}
	);
})();
