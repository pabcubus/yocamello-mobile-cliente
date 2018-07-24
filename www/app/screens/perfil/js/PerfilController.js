(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', 'SessionService'];

			var PerfilController = function($scope, SessionService) {
				var vm	= this;

				vm.imageFile		= '';
				vm.imageCropped 	= '';
				vm.user 			= {};

				vm.uploadImage		= uploadImage;

				function uploadImage(){
					let imgString = vm.imageCropped.split(',')[1];
					SessionService.changeAvatar(imgString)
						.then(result => {
							alert('imagen cambiada');
						})
						.catch(err => {
							alert('hubo un error...');
						})
				}

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
