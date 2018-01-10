(function() {
	'use strict';

	define(['jquery'],
		function($) {
			var ngDependencies = ['$q', 'lodash'];

			var HelperService = function($q, lodash) {
				var vm = this;

				vm.constants = {
					LOCALSTORAGE_USER_TAG: 'yo-camello-user'
				};

				vm.converters = {
					imageUrlToBase64: function(url){
						let defer		= $q.defer();

						let img			= new Image();
						img.crossOrigin	= "Anonymous";
						img.onload	= function(){
							let canvas = document.createElement("canvas");
							canvas.width = img.width;
							canvas.height = img.height;

							let ctx = canvas.getContext("2d");
							ctx.drawImage(img, 0, 0);

							let dataURL = canvas
								.toDataURL('image/png')
								.replace('image/png', 'image/octet-stream');

							defer.resolve({'base64' : dataURL});
						};

						img.src		= url;

						return defer.promise;
					},
					svgToBase64: function(svg){
						let defer	= $q.defer();

						let canvas		= document.createElement("canvas");
						canvas.width	= 1200;
						canvas.height	= 1200;
						let ctx			= canvas.getContext('2d');

						let data		= (new XMLSerializer()).serializeToString(svg);
						let DOMURL		= window.URL || window.webkitURL || window;

						let img 		= new Image();
						let svgBlob 	= new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
						let dataURL		= DOMURL.createObjectURL(svgBlob);

						img.onload = function () {
							ctx.drawImage(img, 0, 0);
							DOMURL.revokeObjectURL(dataURL);

							var imgURI = canvas
								.toDataURL('image/png')
								.replace('image/png', 'image/octet-stream');

							defer.resolve({'base64' : imgURI});
						};

						img.src = dataURL;

						return defer.promise;
					},
					json2csv: function(objArray, structure) {
						if (!Array.isArray(objArray) || objArray.length === 0)
							return '';

						var str = '';

						var header = structure.header;
						if (lodash.isArray(header) && header.length > 0) {
							header.forEach(function(field){
								str += field + '\t';
							});
						}

						str = str.substring(0, str.length - 1);

						str += '\r\n';

						var line = '';
						var body = structure.body;
						if (lodash.isArray(body) && body.length > 0) {
							objArray.forEach(function(object){
								line = '';
								body.forEach(function(field){
									line += object[field] + '\t';
								});

								line = line.substring(0, line.length - 1);

								str += line + '\r\n';
							});
						}

						return str;
					}
				};

				vm.validation = {
					getBrowser: function(){
						var result = '';

						// Opera 8.0+
						var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

						// Firefox 1.0+
						var isFirefox = typeof InstallTrigger !== 'undefined';

						// Safari 3.0+ "[object HTMLElementConstructor]"
						var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

						// Internet Explorer 6-11
						var isIE = /*@cc_on!@*/false || !!document.documentMode;

						// Edge 20+
						var isEdge = !isIE && !!window.StyleMedia;

						// Chrome 1+
						var isChrome = !!window.chrome && !!window.chrome.webstore;

						// Blink engine detection
						var isBlink = (isChrome || isOpera) && !!window.CSS;

						if (isOpera) 	return 'opera';
						if (isFirefox) 	return 'firefox';
						if (isSafari) 	return 'safari';
						if (isIE) 		return 'ie';
						if (isEdge) 	return 'edge';
						if (isChrome) 	return 'chrome';
						if (isBlink) 	return 'blink';
					},
					isAdBlocking: function(){
						var obj = document.getElementById("tester");
						return obj == undefined;
					}
				};

				vm.storage = {
					/**
					 * Sets a key/value pair to localStorage
					 * @public
					 * @memberof src.esr-app.shared.services.HelperService
					 * @param {String} key the key to use
					 * @param {String} value the value to set
					 * @return {undefined}
					 */
					set: function(key, value, stringify) {
						localStorage.setItem(key, (stringify ? JSON.stringify(value) : value));
					},

					/**
					 * Gets an object form localstorage
					 * @public
					 * @memberof src.esr-app.shared.services.HelperService
					 * @param {String} key the key to get
					 * @returns {Object} the object retrieved
					 */
					get: function(key, parse) {
						var value = (parse ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key));
						return value;
					},

					/**
					 * Removes an object form localstorage
					 * @public
					 * @memberof src.esr-app.shared.services.HelperService
					 * @param {String} key the key to remove
					 * @returns {Object} the object retrieved
					 */
					remove: function(key) {
						return localStorage.removeItem(key);
					}
				};

				vm.string = {
					checkStringRegex: function(str, regex) {
						return regex.test(str);
					}
				};

				vm.session = {
					getUser: function() {
						var user	= vm.storage.get(vm.constants.LOCALSTORAGE_USER_TAG, true);
						user		= lodash.isObject(user) && lodash.has(user, 'username') && lodash.has(user, 'password') ? user : null;

						if (user != null) {
							user.loged	= true;
						} else {
							user = null;
						}

						return user;
					}
				};
			};

			HelperService.$inject = ngDependencies;
			HelperService.registeredName = 'HelperService';
			return HelperService;
		}
	);
})();
