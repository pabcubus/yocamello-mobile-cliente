(function() {
	'use strict';

	define(['zSchema'],
		function(zSchema) {
			var ngDependencies = [];

			var SchemaService = function() {
				let vm = this;

				vm.schemas = {
					user : {
						'title': 'Usuario Schema',
						'type': 'object',
						'properties': {
							'username' : { 'type': 'string', 'minLength' : 2 },
							'password' : { 'type': 'string', 'minLength' : 2 },
							'loged' : { 'type': 'boolean' }
						},
						'required': ['username', 'password', 'loged']
					}
				};

				vm.validateUser	= validateUser;

				function _getUser(){
					return vm.schemas.user;
				}

				function validateUser(user){
					let validator = new zSchema();

					return validator.validate(user, _getUser());
				}
			};

			SchemaService.$inject = ngDependencies;
			SchemaService.registeredName = 'SchemaService';
			return SchemaService;
		}
	);
})();
