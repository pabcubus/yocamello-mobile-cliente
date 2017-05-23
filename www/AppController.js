(function() {
	'use strict';

	define(['jquery'],
		function($) {
			var ngDependencies = [];

			var AppController = function(){
				var vm					= this;
			};

			AppController.$inject = ngDependencies;
			AppController.registeredName = 'AppController';
			return AppController;
		}
	);
})();
