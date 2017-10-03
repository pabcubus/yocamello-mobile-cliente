(function() {
	'use strict';

	define([],
		function() {
			var ngDependencies = ['$q', 'lodash'];

			var MenuService = function($q, lodash) {
				var vm = this;

				vm.getMenuOptions = getMenuOptions;

				let menuOptions = [
					{
						text: 'Hogar',
						menuIcon: 'home.png',
						description: 'Deseas un trabajador para tu hogar?',
						submenu: [
							{
								text: 'Empleadas'
							},
							{
								text: 'Limpieza'
							},
							{
								text: 'Carpinteros'
							}
						]
					},
					{
						text: 'Automoviles',
						menuIcon: 'auto.png',
						description: 'Tienes algun problema con tu automovil?',
						submenu: [
							{
								text: 'Mecanicos'
							},
							{
								text: 'Cambio de Batería'
							}
						]
					}
				];

				function getMenuOptions(){
					return menuOptions;
				}
			};

			MenuService.$inject = ngDependencies;
			MenuService.registeredName = 'MenuService';
			return MenuService;
		}
	);
})();
