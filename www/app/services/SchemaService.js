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
							'id' : 				{ 'type': 'integer' },
							'creationDate' : 	{ 'type': 'string', 'minLength' : 2 },
							'email' : 			{ 'type': 'string', 'minLength' : 2 },
							'lang' : 			{ 'type': 'string', 'minLength' : 2 },
							'name' : 			{ 'type': 'string', 'minLength' : 2 },
							'lastname' : 		{ 'type': 'string', 'minLength' : 2 },
							'phoneNumber' : 	{ 'type': 'string', 'minLength' : 2 }
						},
						'required': ['id', 'creationDate', 'email', 'lang', 'name', 'lastname', 'phoneNumber']
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
