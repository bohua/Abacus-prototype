/**
 * Created by Bli on 14-3-6.
 */
angular.module('popup-dialog', [])
	.directive('popupDialog',[ '$compile', function ($compile) {
		var Dialog = {
			restrict: 'E',
			scope: {
				dialogConfig: "=",
				emitCompare : '&onCompare',
				emitCancel : '&onCancel'
			},
			link: function ($scope, $element, $attributes) {
				var template,
					_onDialogShow;
				switch ($attributes.dialogStyle) {
					case 'comparison':
					{
						template = '/src/platform/popup-dialog/popup-dialog-comparison.tpl.html';

						_onDialogShow = function (_dialog) {
							/*
							$.extend(true, $scope.dialogConfig.calendarOption, {

							});
							*/

							$('#comparison-dialog-calendar').calendar($scope.dialogConfig.calendarOption);
							$('#comparison-dialog-calendar').calendar('setDate', $scope.dialogConfig.calendarOption.date);
							$.Metro.initInputs();
						}

						break;
					}
				}

				if (template) {
					$('<div></div>').load(template, function (response, status, xhr) {
						if (status == "error") {
							return xhr.status + " " + xhr.statusText;
						}

						$($element).on('click', function () {
							$.extend(true, $scope.dialogConfig.dialogOption, {
								content: $compile(response)($scope),
								onShow: _onDialogShow
							});

							$.Dialog($scope.dialogConfig.dialogOption);
						});
					});
				}

				$scope.Compare = function(){
					var compareDate = $('#comparison-dialog-calendar').calendar('getDate');
					$scope.emitCompare({date: compareDate});

					$.Dialog.close();
				};

				$scope.Cancel = function(){
					$.Dialog.close();
					$scope.emitCancel();
				};
			}
		};

		return Dialog;
	}]);