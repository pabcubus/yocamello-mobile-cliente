(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$scope', 'SessionService'];

			var PerfilController = function($scope, SessionService) {
				var vm	= this;

				vm.imageFile		= '';
				vm.imageCropped 	= '';
				vm.avatarMode		= false;
				vm.user 			= {};

				vm.uploadImage		= uploadImage;

				function uploadImage(){
					let imgString = vm.imageCropped.split(',')[1];
					SessionService.changeAvatar(imgString)
						.then(result => {
							vm.avatarMode = false;
							alert('imagen cambiada');
						})
						.catch(err => {
							alert('hubo un error...');
						})
				}

				$scope.$on('$viewContentLoaded', function(event){
					let d 				= new Date();

					vm.user 			= SessionService.getUser();
					vm.user.uavatar.url = vm.user.uavatar.url + '?t=' + d.getTime();
				});
			};

			PerfilController.$inject = ngDependencies;
			PerfilController.registeredName = 'PerfilController';
			return PerfilController;
		}
	);
})();
