(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', 'SessionService'];

			var PerfilController = function($scope, SessionService) {
				var vm	= this;

				vm.user = {};

				$scope.$on('$viewContentLoaded', function(event){
					vm.user = SessionService.getUser();
				});
			};

			PerfilController.$inject = ngDependencies;
			PerfilController.registeredName = 'PerfilController';
			return PerfilController;
		}
	);
})();
