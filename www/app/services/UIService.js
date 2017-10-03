(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$mdDialog'];

			var UIService = function($mdDialog) {
				var vm = this;

				vm.showLoadingScreen = showLoadingScreen;
				vm.hideLoadingScreen = hideLoadingScreen;

				function showLoadingScreen(ev){
					$mdDialog.show(
						{
							contentElement: '#loadingDlg',
							parent: angular.element(document.body),
							targetEvent: ev,
							clickOutsideToClose: false
						}
					);
				};

				function hideLoadingScreen(){
					$mdDialog.hide();
				};
			};

			UIService.$inject = ngDependencies;
			UIService.registeredName = 'UIService';
			return UIService;
		}
	);
})();
