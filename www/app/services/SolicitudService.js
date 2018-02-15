(function() {
	'use strict';

	define(['moment'],
		function(moment) {
			var ngDependencies = ['$q', '$timeout', '$mdDialog', 'lodash', 'GoogleMapsService'];

			var SolicitudService = function($q, $timeout, $mdDialog, lodash, GoogleMapsService) {
				var vm = this;

				vm.currentTrabajador	= {};

				vm.getTrabajador		= getTrabajador;
				vm.showTrabajadorDialog	= showTrabajadorDialog;
				vm.getServicesAvailable	= getServicesAvailable;

				function getServicesAvailable() {
					let services = [
						{
							id: 1,
							ultima_act: '2017-08-12 11:20:00',
							estado: {
								id: 4,
								name: 'Finalizado'
							},
							trabajador: {
								name: 'Jorge Perez',
								stars: 4
							},
							servicio: {
								id: 2,
								name: 'Lavandería'
							},
							estados: [
								{
									id: 1,
									date: '2017-08-12 11:15:00',
									estado: {
										id: 1,
										nombre: 'Confirmado'
									}
								},
								{
									id: 2,
									date: '2017-08-12 11:20:00',
									estado: {
										id: 2,
										nombre: 'En Alistamiento'
									}
								},
								{
									id: 3,
									date: '2017-08-12 11:20:00',
									estado: {
										id: 3,
										nombre: 'En Camino'
									}
								},
								{
									id: 4,
									date: '2017-08-12 11:20:00',
									estado: {
										id: 4,
										nombre: 'Finalizado'
									}
								}
							]
						},
						{
							id: 2,
							ultima_act: '2017-08-12 11:20:00',
							estado: {
								id: 3,
								name: 'En Camino'
							},
							trabajador: {
								name: 'Jorge Perez',
								stars: 4
							},
							servicio: {
								id: 1,
								name: 'Carpintería'
							},
							estados: [
								{
									id: 1,
									date: '2017-08-12 11:15:00',
									estado: {
										id: 1,
										nombre: 'Confirmado'
									}
								},
								{
									id: 2,
									date: '2017-08-12 11:20:00',
									estado: {
										id: 2,
										nombre: 'En Alistamiento'
									}
								},
								{
									id: 3,
									date: '2017-08-12 11:20:00',
									estado: {
										id: 3,
										nombre: 'En Camino'
									}
								}
							]
						}
					]

					let deferred = $q.defer();

					lodash.forEach(services, function(service){
						service.ultima_act	= moment(service.ultima_act).format('ll');
						service.mapUrl 		= GoogleMapsService.createStaticMap([
							{coordinates: '11.006459,-74.823036'}
						], 500, 200);
					});

					$timeout(function(){
						deferred.resolve(services);
					}, 2000);

					return deferred.promise;
				};

				function getTrabajador(ev){
					let deferred = $q.defer();

					$timeout(function(){
						vm.currentTrabajador = {
							name: 'Jorge Perez',
							stars: 4
						};

						deferred.resolve(vm.currentTrabajador);
					}, 2000);

					return deferred.promise;
				};

				function showTrabajadorDialog(ev){
					$mdDialog.show(
						{
							contentElement: '#trabajadorDlg',
							parent: angular.element(document.body),
							targetEvent: ev,
							clickOutsideToClose: true
						}
					);
				};
			};

			SolicitudService.$inject = ngDependencies;
			SolicitudService.registeredName = 'SolicitudService';
			return SolicitudService;
		}
	);
})();
