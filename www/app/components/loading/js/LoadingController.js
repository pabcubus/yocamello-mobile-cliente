(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', '$mdDialog', 'UIService'];

			var LoadingController = function($scope, $mdDialog, UIService) {
				var vm	= this;

				vm.text	= '';

				$scope.$watch(
					function (){
						return UIService.getLoadingState();
					},
					function (newValue, oldValue) {
						if (newValue !== oldValue) {
							if (newValue == true) {
								vm.text = UIService.getLoadingText();

								$mdDialog.show(
									{
										contentElement: '#loadingDlg',
										parent: angular.element(document.body),
										clickOutsideToClose: false
									}
								);
							} else {
								$mdDialog.hide();
							}
						}
					}
				);
			};

			LoadingController.$inject = ngDependencies;
			LoadingController.registeredName = 'LoadingController';
			return LoadingController;
		}
	);
})();
