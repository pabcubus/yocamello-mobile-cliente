(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope'];

			var PerfilController = function($scope) {
				var vm	= this;

				vm.perfil = {
					nombre: 'Pablo Bassil',
					email: 'pbassil@gmail.com',
					username: 'pbassil',
					direccion: 'Calle 45 #76-09',
					telefono: '300 895 6598'
				};
			};

			PerfilController.$inject = ngDependencies;
			PerfilController.registeredName = 'PerfilController';
			return PerfilController;
		}
	);
})();
