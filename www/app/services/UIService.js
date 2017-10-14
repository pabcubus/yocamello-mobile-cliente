(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$mdDialog'];

			var UIService = function($mdDialog) {
				var vm = this;

				vm.loading = {
					'shown': false,
					'text': ''
				}

				vm.showLoadingScreen	= showLoadingScreen;
				vm.hideLoadingScreen	= hideLoadingScreen;
				vm.getLoadingState		= getLoadingState;
				vm.getLoadingText		= getLoadingText;

				function showLoadingScreen(text){
					vm.loading = {
						'shown': true,
						'text': text
					};
				};

				function hideLoadingScreen(){
					vm.loading.shown = false;
				};

				function getLoadingState(){
					return vm.loading.shown;
				};

				function getLoadingText(){
					return vm.loading.text;
				};
			};

			UIService.$inject = ngDependencies;
			UIService.registeredName = 'UIService';
			return UIService;
		}
	);
})();
