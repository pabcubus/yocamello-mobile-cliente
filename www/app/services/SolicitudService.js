(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$q', '$timeout', '$mdDialog'];

			var SolicitudService = function($q, $timeout, $mdDialog) {
				var vm = this;

				vm.currentTrabajador	= {};

				vm.getTrabajador		= getTrabajador;
				vm.showTrabajadorDialog	= showTrabajadorDialog;
				vm.getServicesAvailable	= getServicesAvailable;

				function getServicesAvailable() {
					let services = [
						{
							id: 1,
							estado: {
								id: 4,
								nombre: 'Finalizado'
							},
							trabajador: {
								name: 'Jorge Perez',
								stars: 4
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
							estado: {
								id: 3,
								nombre: 'En Camino'
							},
							trabajador: {
								name: 'Jorge Perez',
								stars: 4
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
