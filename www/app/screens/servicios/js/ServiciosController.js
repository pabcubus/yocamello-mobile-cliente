(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['SolicitudService', 'SessionService', 'UIService'];

			var ServiciosController = function(SolicitudService, SessionService, UIService) {
				var vm	= this;

				_init();

				function _init(){
					UIService.showLoadingScreen('Buscando servicios');

					let user = SessionService.getUser();

					SolicitudService.getServicesAvailable(user, ['OK','AS'])
						.then(function(servicios){
							vm.servicios = servicios;
							
							setTimeout(() => {
								let card = document.getElementsByClassName('servicio-info-lengend')[0];

								vm.servicios.forEach(servicio => {
									servicio.mapUrl = `https://maps.googleapis.com/maps/api/staticmap?&zoom=15&size=${card.offsetWidth}x150&maptype=roadmap&markers=color:red%7Clabel:F%7C${servicio.service.lat},${servicio.service.lng}&key=AIzaSyDQ-rRq16rEIUX7-dOk5UBM0eEIwJEGDTk`;
								});
							}, 200);

						})
						.catch(function(){
						})
						.finally(function(){
							UIService.hideLoadingScreen('Buscando servicios');
						})
				}
			};

			ServiciosController.$inject = ngDependencies;
			ServiciosController.registeredName = 'ServiciosController';
			return ServiciosController;
		}
	);
})();
