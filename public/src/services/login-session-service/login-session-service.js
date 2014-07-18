/**
 * Created by Bohua on 2014-06-14.
 */

angular.module('login-session-service', [])
	.factory('loginSessionService', ['$http', '$q', '$window', '$location', function ($http, $q, $window, $location) {
		var session;

		var Service = {
			init: function () {
				session = {
					hasSignIn: false,
					login_pass: {
//						employee: {
//							name: '李小帅'
//						}
					}
				}
			},

			login: function (username, password) {
				var deferred = $q.defer();
				$http.post('/login', {username: username, password: password})
					.success(function (result) {
						if (result.success) {
							session.login_pass = result.login_pass;
							session.hasSignIn = true;
							deferred.resolve();
						} else {
							deferred.reject();
						}
					}).error(function (failure) {
						throw failure;
					});

				return deferred.promise;
			},

			getLoginStatus: function () {
				return session.hasSignIn;
			},

			getLoginUser: function () {
				return session.login_pass.employee;
			},

			logout: function(){
				session = null;
			},

			getPermitLevel: function(){
				return session.login_pass.level;
			},

			getLoginPass: function(){
				return session.login_pass;
			}
		};

		return Service;
	}]);

